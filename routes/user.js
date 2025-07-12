import express from "express";
const router = express.Router();
import { createUser } from "../controller/createUser.js";
import { getUser } from "../controller/getUsers.js";
router.post("/createUser", createUser);
router.get("/getallUsers", getUser);

export { router as userRoutes };
