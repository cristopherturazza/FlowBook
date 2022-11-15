import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuthContext } from "./useAuthContext";

import { HintCity } from "../types/HintCity";

interface userProfile {
  id: String;
  fullname?: String;
  birthdate?: String;
  gender?: String;
  city?: HintCity;
}

export const useUpdate = () => {
  const { userData } = useAuthContext();

  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateProfile = async (update: userProfile) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/users/${userData?.id}`,
        { ...update },
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
      setStatus(error.response.data.error);
    }
  };
  return { updateProfile, isLoading, isError, isDone, error };
};
