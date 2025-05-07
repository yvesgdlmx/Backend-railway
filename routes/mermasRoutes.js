import express from 'express';
import { obtenerRegistrosMermas, obtenerRegistrosMermasHoyYAyer, obtenerRegistrosConteoMermasHoyYAyer, obtenerRegistrosManualHoyYAyer, obtenerRegistrosRazonesMermasHoyYAyer } from '../controllers/mermasController.js';

const router = express.Router();
// Por ejemplo, para obtener registros filtrando por año y semana:
router.get("/semanal/:anio/:semana", obtenerRegistrosMermas);
router.get("/por_hora", obtenerRegistrosMermasHoyYAyer);
router.get("/conteo_de_mermas", obtenerRegistrosConteoMermasHoyYAyer);
router.get("/produccion", obtenerRegistrosManualHoyYAyer);
router.get("/razones_de_merma", obtenerRegistrosRazonesMermasHoyYAyer)
export default router;