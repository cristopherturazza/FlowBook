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
  const [isChanged, setIsChanged] = useState(false);

  const getUserBooks = async () => {
    setError("");
    setIsLoading(true);
    setIsDone(false);
    setIsError(false);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/api/books/user/${userData?.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );
      setTimeout(() => setIsLoading(false), 1000);
      setTimeout(() => setIsDone(true), 1001);
      return response;
    } catch (error: any) {
      console.log(error);
      setTimeout(() => setIsLoading(false), 1500);
      setTimeout(() => setIsError(true), 1501);
      setError(error.response?.data.error);
    }
  };

  const addBook = async (book: Book) => {
    setError("");
    setIsLoading(true);
    setIsDone(false);
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

  const removeBook = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_PATH}/api/books/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );
      setIsChanged(!isChanged);
    } catch (error: any) {
      console.log(error);
      setIsError(true);
      setError(error.response.data.error);
    }
  };
  return {
    addBook,
    getUserBooks,
    removeBook,
    isLoading,
    isChanged,
    isError,
    isDone,
    error,
  };
};
