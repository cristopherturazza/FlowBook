import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { HintCity } from "../types/HintCity";

export const useSignup = () => {
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const signup = async (
    email: String,
    password: String,
    fullname: String,
    birthdate?: String,
    gender?: String,
    selectedCity?: HintCity
  ) => {
    setIsLoading(true);
    setIsError(false);

    const city = selectedCity;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_PATH}/api/users/signup`,
        { email, password, fullname, gender, birthdate, city },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setIsLoading(false), 1500);
      setTimeout(() => setIsDone(true), 1501);
      setTimeout(() => router.push("/login"), 3000);
    } catch (error: any) {
      setTimeout(() => setIsLoading(false), 1500);
      setTimeout(() => setIsError(true), 1501);
      setError(error.response.data.error);
    }
  };
  return { signup, isLoading, isError, isDone, error };
};
