import express from 'express';
import multer from 'multer';
import path from 'path';

import {
  getAllTurnosEspeciales,
  getTurnoEspecial,
  createTurnoEspecial,
  updateTurnoEspecial,
  deleteTurnoEspecial,
  getQueryTurnoEspecial
} from '../controller/turnoEspecialController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

router
  .route('/')
  .get( checkAuth, getAllTurnosEspeciales )
  .post( upload.single( 'Img_Asistencia' ), createTurnoEspecial );

router
  .route( '/:Id_TurnoEspecial' )
  .get( checkAuth, getTurnoEspecial )
  .put( upload.single('Img_Asistencia' ), updateTurnoEspecial )
  .delete( checkAuth, deleteTurnoEspecial );

router
  .route('/query/:Id_TurnoEspecial')
  .get(checkAuth, getQueryTurnoEspecial);

export default router;