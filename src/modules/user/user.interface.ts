import type { UserRoles } from "../../generated/prisma/enums.js";
interface IShopAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface IUserProfileData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoles;
  shopData?: {
    shopName: string;
    shopEmail: string;
    shopPhone: string;
    shopAddress: IShopAddress;
  };
}
