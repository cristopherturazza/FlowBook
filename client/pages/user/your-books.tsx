import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useBooks } from "../../hooks/useBooks";
import UserBook from "../../components/UserBook";

import type { Book } from "../../types/Book";

const UserBooks: React.FC = () => {
  const router = useRouter();

  const { getUserBooks, removeBook, isLoading, isChanged } = useBooks();

  const [userBooks, setUserBooks] = useState<Book[]>([]);

  useEffect(() => {
    const books = async () => {
      const fetch = await getUserBooks();
      setUserBooks(fetch?.data);
    };
    books();
  }, [isChanged]);

  return (
    <div className="flex flex-col items-center ">
      <h3 className="text-7xl font-black mt-12 text-darkblue tracking-tighter">
        {" "}
        I tuoi libri{" "}
      </h3>
      {isLoading ? (
        <div>
          <svg
            className="animate-spin mt-20 h-16 w-16 text-darkblue"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : null}
      {userBooks.length > 0 && !isLoading ? (
        <div className="grid grid-cols-3 place-items-center gap-16 mt-20">
          {userBooks.map((book) => (
            <UserBook
              title={book.title}
              cover={book.cover}
              key={book._id}
              id={book._id}
              removeBook={removeBook}
            ></UserBook>
          ))}
        </div>
      ) : null}
      {userBooks.length === 0 && !isLoading ? (
        <>
          <p className="text-center mt-12 text-2xl font-semibold font-serif">
            Attualmente il tuo scaffale è vuoto.
          </p>
          <p className="text-center text-lg font-light mt-2">
            Aggiungi i libri che sei disposto a scambiare.
          </p>
        </>
      ) : null}
      <button
        className="my-16 btn btn-sm sm:btn-sm md:btn-md lg:btn-lg bg-darkblue hover:bg-lightblue text-slate-50"
        onClick={() => router.push("/user/add-books")}
      >
        Aggiungi un libro
      </button>
    </div>
  );
};

export default UserBooks;
