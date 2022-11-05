import { useState } from "react";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (
    email: String,
    password: String,
    fullname: String,
    gender: String,
    birthdate: String,
    city: String
  ) => {
    setIsLoading(true);
    setError(false);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        { email, password, fullname, gender, birthdate, city },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };
  return { signup, isLoading, error };
};
