import paslaugosController from "../controller/paslaugosController.mjs";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const router = express.Router();

router.post('/create', toursController.createPaslauga);
router.patch('/update/:id', toursController.updatePaslauga);
router.delete('/:id', toursController.deletePaslauga);
router.get('/', toursController.getAllTPaslaugos);
router.get('/:id', toursController.getTPaslaugosById);

export default router;