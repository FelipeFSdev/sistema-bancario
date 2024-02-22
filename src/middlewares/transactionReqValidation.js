const bodyTransactionValidate = (req, res, next) => {
    const { description, value, category_id, type } = req.body;
    if (!description || !value || !category_id || !type) {
        return res.status(400).json({
            message: "Make sure all data is being passed correctly."
        });
    };
    if (type === "deposit" || type === "withdraw") {
    } else {
        return res.status(400).json({
            message: "Invalid type of transaction."
        });
    };
    next();
};
module.exports = bodyTransactionValidate;