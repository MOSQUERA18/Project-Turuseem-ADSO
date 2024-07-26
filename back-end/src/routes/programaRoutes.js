import express from "express";
import {
  createPrograma,
  deletePrograma,
  getAllPrograma,
  getPrograma,
  getQueryPrograma,
  updatePrograma,
} from "../controller/programaController.js";
import checkAuth from "../middleware/authMiddleware.js";
const router = express.Router();

// router.get('/', getAllPrograma)
// router.post('/', createPrograma)
// router.get('/:Id_Programa', getPrograma)
// router.put('/:Id_Programa', updatePrograma)
// router.delete('/:Id_Programa', deletePrograma)

router
  .route("/")
  .get(checkAuth, getAllPrograma)
  .post(checkAuth, createPrograma);
router
  .route("/:Id_Programa")
  .get(checkAuth, getPrograma)
  .put(checkAuth, updatePrograma)
  .delete(checkAuth, deletePrograma);
router.get("/programa/:Nom_Programa", getQueryPrograma);

export default router;
