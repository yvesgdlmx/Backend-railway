import { Op } from "sequelize"; 
import WipTotal from "../models/WipTotal.js"; 
import moment from 'moment-timezone'; 

const obtenerWipTotal = async (req, res) => { 
    const { anio, mes, dia } = req.params; // Obtener año, mes y día de los parámetros de la URL 
    try { 
        // Crear la fecha en formato 'YYYY-MM-DD' sin la hora
        const fechaConsulta = moment(`${anio}-${mes}-${dia}`).format('YYYY-MM-DD'); 

        console.log("Fecha a consultar:", fechaConsulta); // Debugging

        // Obtener registros de la tabla WipTotal que coincidan con la fecha exacta 
        const registrosModelo = await WipTotal.findAll({ 
            where: { 
                fecha: { 
                    [Op.eq]: fechaConsulta // Comparar con la fecha exacta
                } 
            } 
        }); 
        
        // Verificar si se encontraron registros 
        if (registrosModelo.length === 0) { 
            return res.status(404).json({ message: "No se encontraron registros para la fecha proporcionada." }); 
        } 

        // Formatear la fecha de cada registro 
        const registrosFormateados = registrosModelo.map((registro) => { 
            return { 
                ...registro.toJSON(), 
                fecha: moment(registro.fecha).format('YYYY-MM-DD') // Solo la fecha sin hora
            }; 
        }); 

        res.json({ registros: registrosFormateados }); 
    } catch (error) { 
        console.error("Error al obtener los registros por fecha:", error); 
        res.status(500).json({ error: "Error al obtener los registros por fecha" }); 
    } 
} 

export { 
    obtenerWipTotal 
}