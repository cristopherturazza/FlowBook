import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const router = useRouter();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    router.push("/login");
  };

  return { logout };
};
