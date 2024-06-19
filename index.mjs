import express from "express";
import usersRouter from "./users.mjs";
import toursRouter from "./paslaugos.mjs";


const router = express.Router();

router.use("/users", usersRouter);

router.use("/paslaugos", paslaugosRouter);

export default router;