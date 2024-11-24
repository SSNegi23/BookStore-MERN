import express from "express";
import { loginController, registerController } from "../controllers/userController.js";

const router = express.Router();

router.get("/", (req, res) => {
    return res.status(200).send("Signup Router");
})

router.post("/login", loginController);
router.post("/register", registerController);

export default router;