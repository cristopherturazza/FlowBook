import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useRouter } from "next/router";

export const useLogin = () => {
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const router = useRouter();

  const login = async (email: String, password: String) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data));

      setTimeout(() => setIsLoading(false), 1200);
      setTimeout(
        () => dispatch({ type: "LOGIN", payload: response.data }),
        1201
      );
      setTimeout(() => router.push("/"), 1202);
    } catch (error: any) {
      setTimeout(() => setIsLoading(false), 1200);
      setTimeout(() => setIsError(true), 1201);
      setError(error.response.data.error);
    }
  };
  return { login, isLoading, isError, error };
};
