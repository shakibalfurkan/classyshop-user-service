import { Router } from "express";
import { UserController } from "./user.controller.js";

const router: Router = Router();

router.post("/create-profile", UserController.createUserProfile);

export const UserRoutes = router;
