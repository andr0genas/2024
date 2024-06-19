import dotenv from "dotenv";
import express from "express";
import userController from "../controller/usersController.mjs";
import passport from "../strategies/auth.mjs";
import { isUser, isAdmin } from "../middleware/roleCheck.mjs";
import jwt from "jsonwebtoken";
import { userValidationSchema, loginValidationSchema } from "../validators/userValidator.mjs";
import { validationResult } from "express-validator";

dotenv.config();

const router = express.Router();

router.post('/register',
  userValidationSchema,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  userController.createUser);

router.post(
  '/login',
  loginValidationSchema,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
  passport.authenticate("local", { session: false }),
  isUser,
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, name: req.user.username, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Logged", token });
  },
  userController.login
);

export default router;