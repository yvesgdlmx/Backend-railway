import { Op } from "sequelize";
import moment from 'moment-timezone';
import ConteoMermas from "../models/mermas/ConteoMermas.js";
import Manual from "../models/Manual.js";
import RazonesDeMerma from "../models/mermas/RazonesDeMerma.js";

const obtenerRegistrosConteoMermasHoyYAyer = async (req, res) => {
  try {
    // Obtener fechas en la zona horaria de México con moment-timezone
    const fechaHoy = moment.tz('America/Mexico_City').format('YYYY-MM-DD');
    const fechaAyer = moment.tz('America/Mexico_City').subtract(1, 'days').format('YYYY-MM-DD');
    const registros = await ConteoMermas.findAll({
      where: {
        [Op.or]: [
          // Registros del día actual (todo el día)
          {
            fecha: {
              [Op.gte]: new Date(`${fechaHoy}T00:00:00`),
              [Op.lt]: new Date(`${fechaHoy}T23:59:59.999`)
            }
          },
          // Registros del día anterior solo desde las 22:00 en adelante
          {
            fecha: fechaAyer, // Se asume que la columna fecha (string o date) coincide
            hora: {
              [Op.gte]: "22:00:00"
            }
          }
        ]
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
    const fechaHoy = moment.tz('America/Mexico_City').format('YYYY-MM-DD');
    const fechaAyer = moment.tz('America/Mexico_City').subtract(1, 'days').format('YYYY-MM-DD');
    const registros = await Manual.findAll({
      where: {
        [Op.or]: [
          // Registros del día de hoy (todo el día)
          {
            fecha: {
              [Op.gte]: new Date(`${fechaHoy}T00:00:00`),
              [Op.lt]: new Date(`${fechaHoy}T23:59:59.999`)
            }
          },
          // Registros del día anterior a partir de las 22:00
          {
            fecha: fechaAyer,
            hour: {  // En este modelo la columna de hora es "hour"
              [Op.gte]: "22:00:00"
            }
          }
        ],
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
    const fechaHoy = moment.tz('America/Mexico_City').format('YYYY-MM-DD');
    const fechaAyer = moment.tz('America/Mexico_City').subtract(1, 'days').format('YYYY-MM-DD');
    const registros = await RazonesDeMerma.findAll({
      where: {
        [Op.or]: [
          // Registros del día de hoy (todo el día)
          {
            fecha: {
              [Op.gte]: new Date(`${fechaHoy}T00:00:00`),
              [Op.lt]: new Date(`${fechaHoy}T23:59:59.999`)
            }
          },
          // Registros del día anterior solo desde las 22:00 en adelante
          {
            fecha: fechaAyer,
            hora: {
              [Op.gte]: "22:00:00"
            }
          }
        ]
      }
    });
    res.json({ registros });
  } catch (error) {
    console.error("Error al obtener registros de Razones de Merma:", error);
    res.status(500).json({ error: "Error al obtener los registros de razones de merma" });
  }
};

export { 
  obtenerRegistrosConteoMermasHoyYAyer, 
  obtenerRegistrosManualHoyYAyer, 
  obtenerRegistrosRazonesMermasHoyYAyer 
};