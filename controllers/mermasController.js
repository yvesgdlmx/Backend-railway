import { Op } from "sequelize";
import moment from "moment-timezone";
import ConteoMermas from "../models/mermas/ConteoMermas.js";
import Manual from "../models/Manual.js";
import RazonesDeMerma from "../models/mermas/RazonesDeMerma.js";
// Nota: Aquí asumimos que la base de datos trabaja en UTC 
// y que el campo "fecha" es de tipo DATE o DATETIME.
const obtenerRegistrosConteoMermasHoyYAyer = async (req, res) => {
  try {
    // Definimos la zona horaria destino
    const zone = "America/Mexico_City";
    // Formateamos las fechas (se usan solo para comparar el campo string en la BD en el caso de ayer)
    const fechaHoy = moment.tz(zone).format("YYYY-MM-DD");
    const fechaAyer = moment.tz(zone).subtract(1, "days").format("YYYY-MM-DD");
    // Creamos los rangos del día de hoy en la zona horaria de México…
    const inicioHoyLocal = moment.tz(fechaHoy, "YYYY-MM-DD", zone).startOf("day");
    const finHoyLocal = moment.tz(fechaHoy, "YYYY-MM-DD", zone).endOf("day");
    // …y luego los convertimos a UTC, que es lo que usa tu base de datos en producción
    const inicioHoyUTC = inicioHoyLocal.clone().utc().toDate();
    const finHoyUTC = finHoyLocal.clone().utc().toDate();
    // Consulta: registros del día de hoy (todo el día) o del día anterior a partir de las 22:00
    const registros = await ConteoMermas.findAll({
      where: {
        [Op.or]: [
          {
            // Filtra los registros del día de hoy usando los límites convertidos a UTC
            fecha: {
              [Op.gte]: inicioHoyUTC,
              [Op.lt]: finHoyUTC
            }
          },
          {
            // Si en la BD el campo "fecha" se almacena como string ("YYYY-MM-DD")
            // Comparamos el valor exactamente y filtramos la hora a partir de las 22:00
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
    const zone = "America/Mexico_City";
    const fechaHoy = moment.tz(zone).format("YYYY-MM-DD");
    const fechaAyer = moment.tz(zone).subtract(1, "days").format("YYYY-MM-DD");
    const inicioHoyLocal = moment.tz(fechaHoy, "YYYY-MM-DD", zone).startOf("day");
    const finHoyLocal = moment.tz(fechaHoy, "YYYY-MM-DD", zone).endOf("day");
    const inicioHoyUTC = inicioHoyLocal.clone().utc().toDate();
    const finHoyUTC = finHoyLocal.clone().utc().toDate();
    const registros = await Manual.findAll({
      where: {
        [Op.or]: [
          {
            fecha: {
              [Op.gte]: inicioHoyUTC,
              [Op.lt]: finHoyUTC
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
    const zone = "America/Mexico_City";
    const fechaHoy = moment.tz(zone).format("YYYY-MM-DD");
    const fechaAyer = moment.tz(zone).subtract(1, "days").format("YYYY-MM-DD");
    const inicioHoyLocal = moment.tz(fechaHoy, "YYYY-MM-DD", zone).startOf("day");
    const finHoyLocal = moment.tz(fechaHoy, "YYYY-MM-DD", zone).endOf("day");
    const inicioHoyUTC = inicioHoyLocal.clone().utc().toDate();
    const finHoyUTC = finHoyLocal.clone().utc().toDate();
    const registros = await RazonesDeMerma.findAll({
      where: {
        [Op.or]: [
          {
            fecha: {
              [Op.gte]: inicioHoyUTC,
              [Op.lt]: finHoyUTC
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