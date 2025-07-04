import MetaManual from '../models/MetaManual.js'

const nuevaMeta = async (req, res) => {
    const meta = new MetaManual(req.body);
    
    try {
        const metaAlmacenada = await meta.save();
        res.json(metaAlmacenada);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

const obtenerMetas = async (req, res) => {
    const registros = await MetaManual.findAll();
    res.json({ registros });
}

const obtenerMeta = async (req, res) => {
    const { id } = req.params

    const meta = await MetaManual.findByPk(id);

    res.json(meta);
}

const editarMeta = async (req, res) => {
    const { id } = req.params;
    try {
        // Buscar la meta manual por su id
        const meta = await MetaManual.findByPk(id);
        if (!meta) {
            return res.status(404).json({ msg: 'No existe la meta' });
        }
        // Extraer los nuevos valores de las metas de cada turno del cuerpo de la petición
        const { meta_matutino, meta_vespertino, meta_novt } = req.body;
        // Actualizar cada campo únicamente si se proporciona un nuevo valor, manteniendo el existente en caso contrario
        meta.meta_matutino = meta_matutino ?? meta.meta_matutino;
        meta.meta_vespertino = meta_vespertino ?? meta.meta_vespertino;
        meta.meta_novt = meta_novt ?? meta.meta_novt;
        // Guardar y devolver la meta actualizada
        const metaAlmacenada = await meta.save();
        res.json(metaAlmacenada);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};



const eliminarMeta = async (req, res) => {
    
}

export {
    nuevaMeta,
    obtenerMetas,
    obtenerMeta,
    editarMeta,
    eliminarMeta
}