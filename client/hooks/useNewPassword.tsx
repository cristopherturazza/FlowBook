import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuthContext } from "./useAuthContext";

export const useNewPassword = () => {
  const { userData, dispatch } = useAuthContext();

  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updatePassword = async (password: String) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/users/${userData?.id}/password`,
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
    } catch (error: any) {
      setTimeout(() => setIsLoading(false), 1500);
      setTimeout(() => setIsError(true), 1501);
      setError(error.response.data.error);
    }
  };
  return { updatePassword, isLoading, isError, isDone, error };
};
