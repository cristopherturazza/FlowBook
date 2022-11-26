import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

interface Book {
  isbn?: string;
  title: string;
  author: string;
  status: string;
  year: string;
  category: string;
  cover?: string;
}

export const useBooks = () => {
  const { userData } = useAuthContext();

  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addBook = async (book: Book) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_PATH}/api/books/`,
        { owner: userData?.id, ...book },
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
      console.log(error);
      setTimeout(() => setIsLoading(false), 1500);
      setTimeout(() => setIsError(true), 1501);
      setError(error.response.data.error);
    }
  };
  return { addBook, isLoading, isError, isDone, error };
};
