import express from "express";

const router = express.Router();

router.get("/", () => {
    return res.status(200).send("Login is working");
})