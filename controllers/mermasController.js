import { Op } from "sequelize";
import moment from "moment-timezone";
import ConteoMermas from "../models/mermas/ConteoMermas.js";
import Manual from "../models/Manual.js";
import RazonesDeMerma from "../models/mermas/RazonesDeMerma.js";
const obtenerRegistrosConteoMermasHoyYAyer = async (req, res) => {
  try {
    // Obtenemos la fecha de hoy y de ayer en el formato YYYY-MM-DD
    const fechaHoy = moment.tz('America/Mexico_City').format('YYYY-MM-DD');
    const fechaAyer = moment.tz('America/Mexico_City').subtract(1, 'days').format('YYYY-MM-DD');
    // Creamos los objetos Date para el inicio y fin del día de hoy, utilizando la zona horaria de México
    const inicioHoy = moment.tz(fechaHoy, "YYYY-MM-DD", "America/Mexico_City").startOf('day').toDate();
    const finHoy = moment.tz(fechaHoy, "YYYY-MM-DD", "America/Mexico_City").endOf('day').toDate();
    // Consulta: registros del día de hoy (todo el día) o del día de ayer a partir de las 22:00
    const registros = await ConteoMermas.findAll({
      where: {
        [Op.or]: [
          {
            fecha: {
              [Op.gte]: inicioHoy,
              [Op.lt]: finHoy
            }
          },
          {
            // Asumimos que en la BD el campo fecha se guarda como 'YYYY-MM-DD'
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
    console.error("Error al obtener registros de ConteoMermas:", error);
    res.status(500).json({ error: "Error al obtener los registros de conteo mermas" });
  }
};
const obtenerRegistrosManualHoyYAyer = async (req, res) => {
  try {
    const fechaHoy = moment.tz('America/Mexico_City').format('YYYY-MM-DD');
    const fechaAyer = moment.tz('America/Mexico_City').subtract(1, 'days').format('YYYY-MM-DD');
    const inicioHoy = moment.tz(fechaHoy, "YYYY-MM-DD", "America/Mexico_City").startOf('day').toDate();
    const finHoy = moment.tz(fechaHoy, "YYYY-MM-DD", "America/Mexico_City").endOf('day').toDate();
    const registros = await Manual.findAll({
      where: {
        [Op.or]: [
          {
            fecha: {
              [Op.gte]: inicioHoy,
              [Op.lt]: finHoy
            }
          },
          {
            fecha: fechaAyer,
            hour: {
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
    const inicioHoy = moment.tz(fechaHoy, "YYYY-MM-DD", "America/Mexico_City").startOf('day').toDate();
    const finHoy = moment.tz(fechaHoy, "YYYY-MM-DD", "America/Mexico_City").endOf('day').toDate();
    const registros = await RazonesDeMerma.findAll({
      where: {
        [Op.or]: [
          {
            fecha: {
              [Op.gte]: inicioHoy,
              [Op.lt]: finHoy
            }
          },
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