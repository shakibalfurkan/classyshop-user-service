import { Router } from "express";
import { UserController } from "./user.controller.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { UserValidation } from "./user.validation.js";
import verifyInternalCall from "../../middlewares/verifyInternalCall.js";

const router: Router = Router();

router.post(
  "/create-profile",
  verifyInternalCall,
  validateRequest(UserValidation.createUserProfileValidation),
  UserController.createUserProfile,
);

export const UserRoutes = router;
