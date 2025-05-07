import { Op, fn, col, where } from "sequelize";
import ConteoMermas from "../models/mermas/ConteoMermas.js";
import Manual from "../models/Manual.js";
import RazonesDeMerma from "../models/mermas/RazonesDeMerma.js";

const formatearFechaLocal = (fecha) => {
  const anio = fecha.getFullYear();
  // Los meses en JavaScript comienzan en 0, por lo que se suma 1. Se agrega el 0 delante si es menor que 10.
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const dia = fecha.getDate().toString().padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
};


const obtenerRegistrosConteoMermasHoyYAyer = async (req, res) => {
  try {
    // Crear objetos Date para hoy y calcular la fecha de ayer (según la hora local)
    const hoy = new Date();
    const ayer = new Date();
    ayer.setDate(hoy.getDate() - 1);
    // Formatear las fechas a 'YYYY-MM-DD' respetando la zona horaria local
    const fechaHoy = formatearFechaLocal(hoy);
    const fechaAyer = formatearFechaLocal(ayer);
    // Consultar registros cuyo campo 'fecha' sea igual a hoy o ayer
    const registros = await ConteoMermas.findAll({
      where: {
        fecha: {
          [Op.or]: [fechaHoy, fechaAyer]
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
    // Crear objetos Date para hoy y ayer usando la hora local
    const hoy = new Date();
    const ayer = new Date();
    ayer.setDate(hoy.getDate() - 1);
    // Convertir las fechas a formato 'YYYY-MM-DD' usando la función que respeta la zona horaria local
    const fechaHoy = formatearFechaLocal(hoy);
    const fechaAyer = formatearFechaLocal(ayer);
    
    // Consulta registros cuyo campo 'fecha' sea igual a hoy o ayer y cuyo campo 'name'
    // contenga la cadena '32 JOB COMPLETE'. Como el campo viene con información adicional,
    // usamos el operador LIKE para filtrar aquellos registros que empiecen con '32 JOB COMPLETE'.
    const registros = await Manual.findAll({
      where: {
        fecha: {
          [Op.or]: [fechaHoy, fechaAyer]
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
    // Crear objetos Date para hoy y calcular la fecha de ayer (según la hora local)
    const hoy = new Date();
    const ayer = new Date();
    ayer.setDate(hoy.getDate() - 1);
    // Formatear las fechas a 'YYYY-MM-DD' respetando la zona horaria local
    const fechaHoy = formatearFechaLocal(hoy);
    const fechaAyer = formatearFechaLocal(ayer);
    // Consultar registros cuyo campo 'fecha' sea igual a hoy o ayer
    const registros = await RazonesDeMerma.findAll({
      where: {
        fecha: {
          [Op.or]: [fechaHoy, fechaAyer]
        }
      }
    });
    
    res.json({ registros });
  } catch (error) {
    console.error("Error al obtener registros de ConteoMermas:", error);
    res.status(500).json({ error: "Error al obtener los registros de conteo mermas" });
  }
};

export { obtenerRegistrosConteoMermasHoyYAyer, obtenerRegistrosManualHoyYAyer, obtenerRegistrosRazonesMermasHoyYAyer };