const knex = require("../services/database");

const getExtract = async (req, res) => {
    const { id } = req.user;
    try {
        const deposits = await knex("transactions")
            .where({ users_id: id, type: "deposit" })
            .sum("value")
            .first();

        const withdraw = await knex("transactions")
            .where({ users_id: id, type: "withdraw" })
            .sum("value")
            .first();

        return res.status(200).json({
            deposits: (deposits.sum),
            withdraw: (withdraw.sum),
            remaining_value: deposits.sum - withdraw.sum,
        });

    } catch (error) {
        return res.status(500).json(error.message);
    };
};

module.exports = getExtract;