import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState<Boolean | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean | null>(null);

  const signup = async (
    email: String,
    password: String,
    name: String,
    lastname: String
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        { email, password, name, lastname },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(response));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };
  return { signup, isLoading, error };
};
