import express from 'express';
import { cretaeCharge, getAllCharges, getCharges, updateCharge } from '../controller/chargesController.js';
// import checkAuth from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getAllCharges).post(cretaeCharge)
router.route('/:Id_Cargo').get(getCharges).put(updateCharge)


export default router
