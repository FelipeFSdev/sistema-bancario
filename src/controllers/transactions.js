const knex = require("../services/database");

const listUserTransactions = async (req, res) => {
    const { id } = req.user;
    try {
        const transactions = await knex("transactions")
            .where({ users_id: id });
        if (transactions.length < 1) {
            return res.status(200).json({ message: "This account has no transactions." });
        };

        return res.status(200).json(transactions);

    } catch (error) {
        console.log("Erro no list")
        return res.status(500).json(error.message);
    };
};

const detailTransaction = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const transaction = await knex("transactions")
            .where({ users_id: userId, id });
        if (transaction.length < 1) {
            return res.status(404).json({ message: "Transaction not found." });
        };

        return res.status(200).json(transaction);

    } catch (error) {
        console.log("Erro no detail")
        return res.status(500).json(error.message);
    };
};

const registTransaction = async (req, res) => {
    const { id } = req.user;
    const { description, value, category_id, type } = req.body;
    const dateTimeStamp = new Date();
    try {
        const newTransaction = await knex("transactions")
            .insert({
                description,
                value,
                date: dateTimeStamp.toUTCString(),
                category_id,
                type,
                users_id: id
            })
            .returning("*");

        return res.status(201).json(newTransaction);

    } catch (error) {
        console.log("Erro no regist")
        return res.status(500).json(error.message);
    };
};

const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { description, value, category_id, type } = req.body;
    const dateTimeStamp = new Date();
    try {
        await knex("transactions")
            .where({ users_id: userId, id })
            .update({
                description,
                value,
                date: dateTimeStamp.toUTCString(),
                category_id,
                type,
                users_id: userId
            })
            .returning("*");

        return res.status(204).json();

    } catch (error) {
        console.log("Erro no update")
        return res.status(500).json(error.message);
    };
};

const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        await knex("transactions")
            .where({ users_id: userId, id })
            .delete()
            .returning("*");

        return res.status(204).json();

    } catch (error) {
        console.log("Erro no delete")
        return res.status(500).json(error.message);
    };
};

module.exports = {
    listUserTransactions,
    detailTransaction,
    registTransaction,
    updateTransaction,
    deleteTransaction,
};