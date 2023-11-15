import express from "express";
import ChatController from "../controllers/chats.js";

const router = express.Router();

router.get("/user/:id", ChatController.getChatsbyUserID);
router.post("/", ChatController.putChat);
router.get("/:id", ChatController.getChatsbyID);

export default router;
