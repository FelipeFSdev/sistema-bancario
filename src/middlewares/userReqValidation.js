const knex = require("../services/database");

const bodyUserValidate = (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Make sure all data is being passed correctly"
            });
        };
        const verifyEmail = email.split("@");
        if (verifyEmail.length < 2) {
            return res.status(400).json({ message: "Insert a valid email." });
        };
        next();
    } catch (error) {
        return res.status(400).json(error.message);
    };
};

const existingEmail = async (req, res, next) => {
    const { email } = req.body;
    try {
        if (email !== req.user.email) {
            const matchEmail = await knex("users")
                .where({ email })
            if (matchEmail) {
                return res.status(400).json({
                    message: "This email is already been used."
                });
            };
        };
        next();
    } catch (error) {
        return res.status(400).json(error.message);
    };
};

module.exports = {
    bodyUserValidate,
    existingEmail,
}