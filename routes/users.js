import express from "express";

import UsersController from "../controllers/users.js";

const router = express.Router();

router.get("/search/:email", UsersController.getUsersByEmail);
router.get("/:id", UsersController.getUserById);
router.get("/", UsersController.getUsers);
router.post("/", UsersController.createUser);
router.patch("/:id", UsersController.updateUserbyId);
router.delete("/:id", UsersController.deleteUserById);

export default router;
