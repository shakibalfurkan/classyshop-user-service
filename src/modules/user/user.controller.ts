import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { UserService } from "./user.service.js";
import sendResponse from "../../utils/sendResponse.js";

const createUserProfile = catchAsync(async (req: Request, res: Response) => {
  const profileData = req.body;
  const result = await UserService.createUserProfile(profileData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User profile created successfully",
    data: result,
  });
});

export const UserController = {
  createUserProfile,
};
