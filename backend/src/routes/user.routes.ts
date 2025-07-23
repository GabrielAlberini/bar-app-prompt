import { Router } from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser } from "../controllers/user.controller";

const router = Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router; 