import express from 'express';

import {
  obtenerWipPorFechaInsercion
} from '../controllers/WipOperacionResumenController.js';

const router = express.Router();

router.get('/wip_operacion_resumen/resumen/:anio/:mes/:dia', obtenerWipPorFechaInsercion);

export default router;
