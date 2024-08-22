import express from 'express';
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

router
  .route('/')
  .get(checkAuth, getAllTurnosEspeciales)
  .post(checkAuth, createTurnoEspecial);

router
  .route('/:Id_TurnoEspecial')
  .get(checkAuth, getTurnoEspecial)
  .put(checkAuth, updateTurnoEspecial)
  .delete(checkAuth, deleteTurnoEspecial);

router
  .route('/query/:Id_TurnoEspecial')
  .get(checkAuth, getQueryTurnoEspecial);

export default router;