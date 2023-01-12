import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

interface ERequest {
  sender: String;
  receiver: String;
  book: String;
}

export const useExchange = () => {
  const { userData } = useAuthContext();

  const [exError, setExError] = useState("");
  const [isExError, setIsExError] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isWorking, setIsWorking] = useState(false);

  // Create a new exchange

  const addExchangeRequest = async (request: ERequest) => {
    setExError("");
    setIsWorking(true);
    setIsDone(false);
    setIsExError(false);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_PATH}/api/exchanges/new`,
        { ...request },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );
      setTimeout(() => setIsWorking(false), 1500);
      setTimeout(() => setIsDone(true), 1501);
    } catch (error: any) {
      setTimeout(() => setIsWorking(false), 1500);
      setTimeout(() => setIsExError(true), 1501);
      setExError(error?.response.data.error);
    }
  };

  // Change exchange status

  const updateExchange = async (
    id: string,
    status: string,
    replyMessage?: string
  ) => {
    setExError("");
    setIsWorking(true);
    setIsDone(false);
    setIsExError(false);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_PATH}/api/exchanges/${id}`,
        { status: status, replyMessage: replyMessage },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );
      setTimeout(() => setIsWorking(false), 1500);
      setTimeout(() => setIsDone(true), 1501);
    } catch (error: any) {
      setTimeout(() => setIsWorking(false), 1500);
      setTimeout(() => setIsExError(true), 1501);
      setExError(error?.response.data.error);
    }
  };

  return {
    isWorking,
    isExError,
    isDone,
    exError,
    addExchangeRequest,
    updateExchange,
  };
};
