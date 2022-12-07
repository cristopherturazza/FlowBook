import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import BookNotFound from "../../components/BookNotFound";
import Loading from "../../components/Loading";
import Image from "next/image";
import bookPlaceholder from "../../public/book-placeholder.png";

const Book: React.FC = () => {
  const router = useRouter();

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

  console.log(data);

  return (
    <div className="flex flex-col items-center">
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <BookNotFound />
      ) : data ? (
        <>
          <h1 className="text-5xl xl:text-7xl max-w-[20ch] text-center font-black mt-12 text-darkblue tracking-tighter">
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
                {data.owner.fullname}
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
            <div className="my-16 btn btn-md md:btn-md lg:btn-lg bg-darkblue hover:bg-lightblue text-slate-50">
              Richiedi scambio
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Book;
