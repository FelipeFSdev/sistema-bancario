const express = require("express");
const { register, logIn, detailUser, updateUser } = require("./controllers/users");
const authorization = require("./middlewares/authorization");

const routes = express();

routes.post("/user", register);
routes.post("/login", logIn);

routes.use(authorization);

routes.get("/user", detailUser);
routes.put("/user", updateUser);

module.exports = routes;
