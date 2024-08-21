import express from 'express';
import {
  getAllTurnosEspeciales,
  getTurnoEspecial,
  createTurnoEspecial,
  updateTurnoEspecial,
  deleteTurnoEspecial,
  getQueryTurnoEspecial
} from '../controller/turnoEspecialController.js';
import verifyAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(verifyAuth, getAllTurnosEspeciales)
  .post(verifyAuth, createTurnoEspecial);

router
  .route('/:Id_TurnoEspecial')
  .get(verifyAuth, getTurnoEspecial)
  .put(verifyAuth, updateTurnoEspecial)
  .delete(verifyAuth, deleteTurnoEspecial);

router
  .route('/query/:Id_TurnoEspecial')
  .get(verifyAuth, getQueryTurnoEspecial);

export default router;