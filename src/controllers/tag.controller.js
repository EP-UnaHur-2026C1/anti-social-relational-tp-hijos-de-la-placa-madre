const { Tag } = require('../db/models');
const { Op } = require('sequelize');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

// TODO: validar - Validaciones y sanitización de este caso de uso en middleware con Zod
const getAllTags = async (req, res) => {
    try {
        const nombreQuery = req.query.nombre ?? req.query.name;

        let page = parseInt(req.query.page, 10);
        let limit = parseInt(req.query.limit, 10);

        if (!Number.isFinite(page) || page < 1) page = DEFAULT_PAGE;
        if (!Number.isFinite(limit) || limit < 1) limit = DEFAULT_LIMIT;
        limit = Math.min(limit, MAX_LIMIT);

        const offset = (page - 1) * limit;

        const where = {};
        if (
            nombreQuery !== undefined &&
            nombreQuery !== null &&
            String(nombreQuery).trim() !== ''
        ) {
            const trimmed = String(nombreQuery).trim();
            where.nombre = { [Op.like]: `%${trimmed}%` };
        }

        const { rows: data, count: total } = await Tag.findAndCountAll({
            where,
            limit,
            offset,
            order: [['nombre', 'ASC']],
        });

        const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

        res.status(200).json({
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

module.exports = {
    getAllTags,
} 