export const PATHS = {
  LANDING: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  RESET: "/reset",
  SHOP_PROFILE: "/shop-profile/:shopId",
  REQUEST_QUOTE: "/request-quote",
  QUOTES: "/quotes",
  USER: "/user/:userId",
  MANAGEMENT: "/management",
  REQUEST: "/create-request"
};

export const ROLES = {
  ADMIN: 1,
  VEHICLE_OWNER: 2,
  SHOP_OWNER:3
};

export const NEW_USED = [
  "",
  "New",
  "Used",
  "No Preference"
];

export const OEM_AFTER = [
  "",
  "OEM",
  "Aftermarket",
  "No Preference"
];

export const PROFILE_TABS = {
  PROFILE: "Profile",
  QUOTES: "Quotes",
  SHOP_MANAGEMENT: "Shop Management"
};

export const UI_WIDTH = 1300;

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
