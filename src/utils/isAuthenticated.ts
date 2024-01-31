import { getCookie } from "./cookies";

export const isAuthenticated = () => {
  return getCookie("token") !== "";
};
