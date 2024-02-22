const knex = require("../services/database");

const findCategoryById = async (req, res, next) => {
    const { category_id } = req.body;
    try {
        const category = await knex("categories")
            .where({ id: category_id })
            .first();
        if (!category) {
            return res.status(400).json({
                message: "Invalid category."
            });
        };
        next()
    } catch (error) {
        return res.status(500).json(error.message);
    };

};

module.exports = findCategoryById;