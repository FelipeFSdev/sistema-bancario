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

const routes = express();

routes.post("/user", registUser);
routes.post("/login", logIn);

routes.use(authorization);

routes.get("/user", detailUser);
routes.put("/user", updateUser);

routes.get("/category", listCategories);

routes.get("/transaction/extract", getExtract);

routes.get("/transaction", listUserTransactions);
routes.get("/transaction/:id", detailTransaction);
routes.post("/transaction", registTransaction);
routes.put("/transaction/:id", updateTransaction);
routes.delete("/transaction/:id", deleteTransaction);



module.exports = routes;
