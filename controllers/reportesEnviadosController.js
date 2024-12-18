import ReportesEnviados from '../models/ReportesEnviados.js';
import { Op } from "sequelize";

const obtenerDatosReportesEnviados = async (req, res) => {
    try {
        // Encuentra la fecha más reciente en la base de datos
        const fechaMasReciente = await ReportesEnviados.max('fecha');
        console.log("Fecha más reciente encontrada en bruto:", fechaMasReciente);
        
        if (!fechaMasReciente) {
            return res.status(404).json({
                msg: "No se encontraron registros de reportes enviados",
                debug: {
                    totalRegistros: await ReportesEnviados.count()
                }
            });
        }

        // Asegúrate de que la fecha más reciente esté en el formato correcto
        const fechaFormateada = new Date(fechaMasReciente).toISOString().split('T')[0]; // Esto te dará 'YYYY-MM-DD'
        console.log("Fecha formateada para la consulta:", fechaFormateada);
        
        // Obtén todos los registros con la fecha más reciente
        const registros = await ReportesEnviados.findAll({
            where: {
                fecha: {
                    [Op.eq]: fechaFormateada // Usa la fecha formateada
                }
            },
            order: [['id', 'ASC']], // Cambia el orden según necesites
            raw: true
        });
        
        res.json({
            total: registros.length,
            registros: registros
        });
    } catch (error) {
        console.error("Error al obtener datos de reportes enviados:", error);
        res.status(500).json({
            msg: "Error al obtener los datos de reportes enviados",
            error: error.message
        });
    }
};

export {
    obtenerDatosReportesEnviados
};