import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export const useSignup = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const signup = async (
    email: String,
    password: String,
    fullname: String,
    birthdate: String,
    gender: String,
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
      router.push("/login");
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };
  return { signup, isLoading, error };
};
