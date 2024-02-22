const express = require("express");
const { registUser, logIn, detailUser, updateUser } = require("./controllers/users");
const authorization = require("./middlewares/authorization");
const { listCategories } = require("./controllers/categories");
const {
    listUserTransactions, detailTransaction,
    registTransaction, updateTransaction,
    deleteTransaction
} = require("./controllers/transactions");
const getExtract = require("./controllers/extract");
const { bodyUserValidate, existingEmail } = require("./middlewares/userReqValidation");
const bodyTransactionValidate = require("./middlewares/transactionReqValidation");
const findCategoryById = require("./middlewares/findCategoryById");

const routes = express();

routes.post("/user", bodyUserValidate, registUser);
routes.post("/login", logIn);

routes.use(authorization);

routes.get("/user", detailUser);
routes.put("/user", bodyUserValidate, existingEmail, updateUser);

routes.get("/category", listCategories);

routes.get("/transaction/extract", getExtract);

routes.get("/transaction", listUserTransactions);
routes.get("/transaction/:id", detailTransaction);
routes.post("/transaction", bodyTransactionValidate, findCategoryById, registTransaction);
routes.put("/transaction/:id", bodyTransactionValidate, findCategoryById, updateTransaction);
routes.delete("/transaction/:id", deleteTransaction);



module.exports = routes;
