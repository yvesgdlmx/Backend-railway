import moment from 'moment-timezone';
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
                debug: { totalRegistros: await ReportesEnviados.count() }
            });
        }

        // Ajusta la fecha a la zona horaria de México y suma un día
        const fechaInicio = moment.tz(fechaMasReciente, 'UTC').add(1, 'day').startOf('day').toDate();
        const fechaFin = moment.tz(fechaMasReciente, 'UTC').add(1, 'day').endOf('day').toDate();

        console.log("Fecha ajustada para la consulta:", fechaInicio, fechaFin);

        // Obtén todos los registros con la fecha ajustada
        const registros = await ReportesEnviados.findAll({
            where: {
                fecha: {
                    [Op.gte]: fechaInicio,
                    [Op.lt]: fechaFin
                }
            },
            order: [['id', 'ASC']],
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

export { obtenerDatosReportesEnviados };
