import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const UserBooks: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchBook = async () => {
      const fetch = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=+isbn:9788820066932"
      );
      console.log(fetch.data.items);
    };
    fetchBook();
  }, []);

  return (
    <div className="flex flex-col items-center ">
      <h3 className="text-7xl font-black mt-12 text-darkblue tracking-tighter">
        {" "}
        I tuoi libri{" "}
      </h3>
      <p className="text-center mt-12 text-2xl font-semibold font-serif">
        Attualmente il tuo scaffale è vuoto.
      </p>
      <p className="text-center text-lg font-light mt-2">
        Aggiungi i libri che sei disposto a scambiare.
      </p>
      <button
        className="mt-16 btn btn-sm sm:btn-sm md:btn-md lg:btn-lg bg-darkblue hover:bg-lightblue text-slate-50"
        onClick={() => router.push("/user/add-books")}
      >
        Aggiungi un libro
      </button>
    </div>
  );
};

export default UserBooks;
