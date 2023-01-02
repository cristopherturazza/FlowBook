import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import BookNotFound from "../../components/BookNotFound";
import Loading from "../../components/Loading";
import Image from "next/image";
import bookPlaceholder from "../../public/book-placeholder.png";
import { useAuthContext } from "../../hooks/useAuthContext";

const Book: React.FC = () => {
  const router = useRouter();
  const { userData } = useAuthContext();

  const fetchBook = async (id: string | undefined | string[]) => {
    const fetch = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/books/${id}`
    );
    return fetch.data;
  };

  const { id: bookID } = router.query;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["book", bookID],
    queryFn: () => fetchBook(bookID),
  });

  return (
    <div className="flex flex-col items-center">
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <BookNotFound />
      ) : data ? (
        <>
          <h1 className="text-4xl xl:text-6xl max-w-[20ch] text-center font-black mt-12 text-darkblue tracking-tighter">
            {data.title}
          </h1>
          <div className="flex flex-col items-center xl:flex-row justify-between">
            <Image
              src={
                data.cover && data.cover != "" ? data.cover : bookPlaceholder
              }
              alt={data.title}
              width={200}
              height={300}
              className="rounded-md mt-12"
            ></Image>
            <div className="mt-12 xl:ml-12">
              <p className="text-lg xl:text-xl my-2 font-serif">
                <strong>Autore/i: </strong>
                {data.author}
              </p>
              <p className="text-lg xl:text-xl my-2 font-serif">
                <strong>Codice ISBN: </strong>
                {data.isbn}
              </p>
              <p className="text-lg xl:text-xl my-2 font-serif">
                <strong>Categoria: </strong>
                {data.category}
              </p>
              <p className="text-lg xl:text-xl my-2 font-serif">
                <strong>Anno: </strong>
                {data.year}
              </p>
              <p className="text-lg xl:text-xl my-2 font-serif">
                <strong>Stato del libro: </strong>
                {data.status}
              </p>
              <p className="text-lg xl:text-xl my-2 font-serif">
                <strong>Proprietario: </strong>
                {userData?.id != data.owner._id ? data.owner.fullname : "Tu"}
              </p>
              <p className="text-lg xl:text-xl my-2 font-serif">
                <strong>Dove si trova: </strong>
                {data.owner.city.city +
                  " (" +
                  data.owner.city.county_code +
                  ")"}
              </p>
            </div>
          </div>
          <div className="flex">
            {userData?.id != data.owner._id ? (
              <div className="my-16 btn btn-md md:btn-md lg:btn-lg bg-darkblue hover:bg-lightblue text-slate-50">
                Richiedi scambio
              </div>
            ) : (
              <div className="my-16 btn btn-md md:btn-md lg:btn-lg bg-slate-300 pointer-events-none hover:bg-lightblue text-darkblue">
                Il libro è tuo
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Book;
