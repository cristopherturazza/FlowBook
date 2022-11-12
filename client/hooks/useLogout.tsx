import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    router.push("/login");
  };

  return { logout };
};
