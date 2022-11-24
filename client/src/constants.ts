export const PATHS = {
  LANDING: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  RESET: "/reset",
  SHOP_PROFILE: "/shop-profile/:shopId",
  REQUEST_QUOTE: "/request-quote",
  QUOTES: "/quotes",
  USER: "/user/:userId",
  MANAGEMENT: "/management"
};

export const ROLES = {
  ADMIN: 1,
  VEHICLE_OWNER: 2,
  SHOP_OWNER:3
};

export const PROFILE_TABS = {
  PROFILE: "Profile",
  QUOTES: "Quotes/Chats",
  SHOP_MANAGEMENT: "Shop Management"
};

export const STATE = {
  ALL: 0,
  AWAITING: 1,
  ACCEPTED: 2,
  CANCELLED: 3,
  EXPIRED: 4
};

export const REWORK = {
  ALL: 0,
  REWORK: 1,
  NON_REWORK: 2
};