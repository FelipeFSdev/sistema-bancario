const knex = require("../services/database");
const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: "Invalid credentials." })
    }
    const token = authorization.replace("Bearer ", "").trim();

    try {
        const { id } = jwt.verify(token, process.env.JWT_PASS);
        const user = await knex("users").where({ id }).first();
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const { password: _, ...safeUser } = user;
        req.user = safeUser;

        next();
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({ message: "Invalid credentials." });
    }
}

module.exports = authorization;