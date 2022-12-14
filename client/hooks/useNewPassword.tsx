import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuthContext } from "./useAuthContext";

export const useNewPassword = () => {
  const { userData, dispatch } = useAuthContext();

  const router = useRouter();

  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Change the user password

  const updatePassword = async (password: String) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_PATH}/api/users/${userData?.id}/password`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );
      setTimeout(() => setIsLoading(false), 1500);
      setTimeout(() => setIsDone(true), 1501);
      setTimeout(() => dispatch({ type: "LOGOUT" }), 4000);
      setTimeout(() => router.push("/login"), 4001);
    } catch (error: any) {
      setTimeout(() => setIsLoading(false), 1500);
      setTimeout(() => setIsError(true), 1501);
      setError(error.response.data.error);
    }
  };
  return { updatePassword, isLoading, isError, isDone, error };
};
