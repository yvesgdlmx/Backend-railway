import { Op, fn, col, where } from "sequelize";
import moment from 'moment-timezone';
import ConteoMermas from "../models/mermas/ConteoMermas.js";
import Manual from "../models/Manual.js";
import RazonesDeMerma from "../models/mermas/RazonesDeMerma.js";
// Configurar zona horaria por defecto
moment.tz.setDefault("America/Mexico_City");

const obtenerRegistrosConteoMermasHoyYAyer = async (req, res) => {
  try {
    // Obtener fechas usando moment-timezone
    const hoy = moment().format('YYYY-MM-DD');
    const ayer = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const registros = await ConteoMermas.findAll({
      where: {
        fecha: {
          [Op.or]: [hoy, ayer]
        }
      }
    });
    res.json({ registros });
  } catch (error) {
    console.error("Error al obtener registros de ConteoMermas:", error);
    res.status(500).json({ error: "Error al obtener los registros de conteo mermas" });
  }
};
const obtenerRegistrosManualHoyYAyer = async (req, res) => {
  try {
    // Obtener fechas usando moment-timezone
    const hoy = moment().format('YYYY-MM-DD');
    const ayer = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const registros = await Manual.findAll({
      where: {
        fecha: {
          [Op.or]: [hoy, ayer]
        },
        name: {
          [Op.like]: '32 JOB COMPLETE%'
        }
      }
    });
    res.json({ registros });
  } catch (error) {
    console.error("Error al obtener registros de Manual:", error);
    res.status(500).json({ error: "Error al obtener los registros del modelo Manual" });
  }
};
const obtenerRegistrosRazonesMermasHoyYAyer = async (req, res) => {
  try {
    // Obtener fechas usando moment-timezone
    const hoy = moment().format('YYYY-MM-DD');
    const ayer = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const registros = await RazonesDeMerma.findAll({
      where: {
        fecha: {
          [Op.or]: [hoy, ayer]
        }
      }
    });
    res.json({ registros });
  } catch (error) {
    console.error("Error al obtener registros de ConteoMermas:", error);
    res.status(500).json({ error: "Error al obtener los registros de conteo mermas" });
  }
};
export { 
  obtenerRegistrosConteoMermasHoyYAyer, 
  obtenerRegistrosManualHoyYAyer, 
  obtenerRegistrosRazonesMermasHoyYAyer 
};