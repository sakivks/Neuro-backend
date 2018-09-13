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

router.get("/top", userController.listTopUsers);

router.get("/stats", userController.stats);

router.get("/top/:count", userController.listTopUsers);

router.post("/user", userController.createUser);

router.put("/user/:userId", userController.updateUser);

router.get("/user/:flatId", userController.getUser);

router.post("/authenticate", userController.authenticate);

module.exports = { router, publicRouter };
