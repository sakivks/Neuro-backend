"use strict";

const Router = require("koa-router");
const router = new Router({
  prefix: "/api/users"
});

const publicRouter = new Router({
  prefix: "/public/api/users"
});

const userController = require("./userController");

router.get("/", userController.listUsers);

router.post("/user/new", userController.createUser);

router.post("/authenticate", userController.authenticate);

module.exports = { router, publicRouter };
