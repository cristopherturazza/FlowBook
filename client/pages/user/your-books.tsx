import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useBooks } from "../../hooks/useBooks";
import UserBook from "../../components/UserBook";
import Loading from "../../components/Loading";

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
      <h3 className="text-5xl xl:text-7xl font-black mt-12 text-darkblue tracking-tighter">
        {" "}
        I tuoi libri{" "}
      </h3>
      {isLoading ? <Loading /> : null}
      {userBooks.length > 0 && !isLoading ? (
        <div className="xl:grid xl:grid-cols-3 place-items-center xl:gap-16 mt-20">
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
          <p className="text-center mt-12 text-xl xl:text-2xl font-semibold font-serif">
            Attualmente il tuo scaffale è vuoto.
          </p>
          <p className="text-center text-base xl:text-lg font-light mt-2">
            Aggiungi i libri che sei disposto a scambiare.
          </p>
        </>
      ) : null}
      <button
        className="my-16 btn btn-md md:btn-md lg:btn-lg bg-darkblue hover:bg-lightblue text-slate-50"
        onClick={() => router.push("/user/add-books")}
      >
        Aggiungi un libro
      </button>
    </div>
  );
};

export default UserBooks;
