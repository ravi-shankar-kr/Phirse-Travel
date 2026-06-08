import { Router } from "express";
import { loginController, registerController } from "../controllers/auth.controller.js";
import { loginValidationRules, registerValodationRules } from "../validator/auth.validator.js";

const authRouter = Router();

authRouter.post("/register", registerValodationRules,  registerController)
authRouter.post("/login", loginValidationRules,  loginController)

export default authRouter;