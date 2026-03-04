import { BadRequestError } from "../../errors/AppError.js";
import { UserRoles } from "../../generated/prisma/enums.js";
import { prisma } from "../../lib/prisma.js";
import type { IUserProfileData } from "./user.interface.js";

const createUserProfile = async (payload: IUserProfileData) => {
  const { id, firstName, lastName, email, role, shopData } = payload;

  const isUserExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExists) {
    throw new BadRequestError("User with this email already exists", "email");
  }

  const user = await prisma.user.create({
    data: {
      id,
      email,
      role,
    },
  });

  switch (role) {
    case UserRoles.CUSTOMER:
      await prisma.customerProfile.create({
        data: {
          userId: user.id,
          firstName,
          lastName,
        },
      });

      break;

    case UserRoles.VENDOR:
      if (!shopData) {
        throw new BadRequestError(
          "Shop data is required for vendor registration",
          "shopData",
        );
      }

      await prisma.vendorProfile.create({
        data: {
          userId: user.id,
          firstName,
          lastName,
          shopName: shopData.shopName,
          shopEmail: shopData.shopEmail,
          shopPhone: shopData.shopPhone,
          shopAddress: {
            create: {
              street: shopData.shopAddress.street,
              city: shopData.shopAddress.city,
              state: shopData.shopAddress.state,
              postalCode: shopData.shopAddress.postalCode,
              country: shopData.shopAddress.country,
              lat: shopData.shopAddress.coordinates?.lat,
              lng: shopData.shopAddress.coordinates?.lng,
            },
          },
        },
      });
      break;

    case UserRoles.ADMIN:
    case UserRoles.SUPER_ADMIN:
    case UserRoles.MODERATOR:
      await prisma.adminProfile.create({
        data: {
          userId: user.id,
          firstName,
          lastName,
        },
      });
      break;

    default:
      break;
  }
};

export const UserService = {
  createUserProfile,
};
