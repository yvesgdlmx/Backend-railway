import { Op } from "sequelize";
import moment from "moment-timezone";
import ConteoMermas from "../models/mermas/ConteoMermas.js";
import Manual from "../models/Manual.js";
import RazonesDeMerma from "../models/mermas/RazonesDeMerma.js";
// Definimos la zona horaria que usaremos
const zone = "America/Mexico_City";
const obtenerRegistrosConteoMermasHoyYAyer = async (req, res) => {
  try {
    // Obtenemos la fecha de hoy y la de ayer en formato "YYYY-MM-DD"
    const fechaHoy = moment.tz(zone).format("YYYY-MM-DD");
    const fechaAyer = moment.tz(zone).subtract(1, "days").format("YYYY-MM-DD");
    // Se filtran:
    // • Registros del día actual (fecha === fechaHoy)
    // • Registros del día anterior (fecha === fechaAyer) con hora >= "22:00:00"
    const registros = await ConteoMermas.findAll({
      where: {
        [Op.or]: [
          { fecha: fechaHoy },
          {
            [Op.and]: [
              { fecha: fechaAyer },
              { hora: { [Op.gte]: "22:00:00" } }
            ]
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
    const fechaHoy = moment.tz(zone).format("YYYY-MM-DD");
    const fechaAyer = moment.tz(zone).subtract(1, "days").format("YYYY-MM-DD");
    const registros = await Manual.findAll({
      where: {
        [Op.or]: [
          { fecha: fechaHoy },
          {
            [Op.and]: [
              { fecha: fechaAyer },
              { hour: { [Op.gte]: "22:00:00" } }
            ]
          }
        ],
        name: {
          [Op.like]: "32 JOB COMPLETE%"
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
    const fechaHoy = moment.tz(zone).format("YYYY-MM-DD");
    const fechaAyer = moment.tz(zone).subtract(1, "days").format("YYYY-MM-DD");
    const registros = await RazonesDeMerma.findAll({
      where: {
        [Op.or]: [
          { fecha: fechaHoy },
          {
            [Op.and]: [
              { fecha: fechaAyer },
              { hora: { [Op.gte]: "22:00:00" } }
            ]
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