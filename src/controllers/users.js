const knex = require("../services/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashPass = await bcrypt.hash(password, 10);

        const user = await knex("users").insert({ name, email, password: hashPass });

        return res.status(201).json({ message: `A new user has been resgistered.` });

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ message: "Internal server error." });
    };

};

const logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const account = await knex("users").where({ email }).first();
        if (!account) {
            return res.status(404).json({ message: "Account not found." });
        };
        const loggedInUser = await bcrypt.compare(password, account.password);
        if (!loggedInUser) {
            return res.status(400).json({ message: "Invalid credentials." });
        };
        const token = jwt.sign(
            { id: account.id, email: account.email },
            process.env.JWT_PASS,
            { expiresIn: "8h" });
        return res.status(200).json({ user: account.name, token });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error." });
    };
};

const detailUser = (req, res) => {
    try {

        return res.status(200).json(req.user);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error." });
    };
};

const updateUser = async (req, res) => {
    const { id } = req.user;
    const { name, email, password } = req.body;

    try {
        const cryptPass = await bcrypt.hash(password, 10);
        await knex("users")
            .where({ id })
            .update({ name, email, password: cryptPass })
            .returning("*");

        return res.status(204).json();

    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    };
};

module.exports = {
    register,
    logIn,
    detailUser,
    updateUser,
};