import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Dialog } from "@headlessui/react";
import { useExchange } from "../../hooks/useExchange";
import BookNotFound from "../../components/BookNotFound";
import Loading from "../../components/Loading";
import Image from "next/image";
import bookPlaceholder from "../../public/book-placeholder.png";
import { useState } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";

const Book: React.FC = () => {
  const router = useRouter();
  const { userData } = useAuthContext();
  const [dialogStatus, setDialogStatus] = useState(false);

  const { isWorking, isExError, isDone, exError, addExchangeRequest } =
    useExchange();

  const { id: bookID } = router.query;

  const fetchBook = async (id: string | undefined | string[]) => {
    const fetch = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/books/${id}`
    );
    return fetch.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["book", bookID],
    queryFn: () => fetchBook(bookID),
  });

  const handleExchange = async () => {
    if (userData?.id) {
      const request = {
        sender: userData.id,
        receiver: data.owner._id,
        book: data._id,
      };
      const send = await addExchangeRequest(request);
    }
  };

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
              <div
                className="my-16 btn btn-md md:btn-md lg:btn-lg bg-darkblue hover:bg-lightblue text-slate-50"
                onClick={() => setDialogStatus(true)}
              >
                Richiedi scambio
              </div>
            ) : (
              <div className="my-16 btn btn-md md:btn-md lg:btn-lg bg-slate-300 pointer-events-none hover:bg-lightblue text-darkblue">
                Il libro è tuo
              </div>
            )}
          </div>
          <Dialog
            className="relative z-50"
            open={dialogStatus}
            onClose={() => setDialogStatus(false)}
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-sm rounded-xl bg-sand shadow-2xl p-12">
                <Dialog.Title className="text-xl xl:text-3xl text-center font-black text-darkblue tracking-tighter">
                  Richiedi Scambio
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-center text-lightblue">
                  Stai per inviare una richiesta di scambio per questo libro
                  all'utente {data.owner.fullname}.
                </Dialog.Description>

                <p className="text-darkred text-center mt-4">
                  Sei sicuro di voler inviare la richiesta?
                </p>
                <div className="flex justify-center mt-8 gap-6">
                  <button
                    className="btn btn-md md:btn-md lg:btn-lg bg-darkblue hover:bg-lightblue text-slate-50 disabled:text-slate-500"
                    onClick={() => handleExchange()}
                    disabled={isWorking || isDone || isExError}
                  >
                    {isWorking ? (
                      <div>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Invia
                  </button>
                  <button
                    className="btn btn-md md:btn-md lg:btn-lg bg-darkred hover:bg-scarletred text-slate-50"
                    onClick={() => setDialogStatus(false)}
                  >
                    {isDone || isExError ? "Chiudi" : "Annulla"}
                  </button>
                </div>
                {isExError ? (
                  <div className="alert alert-error shadow-lg mt-12 text-slate-50 bg-scarletred">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{exError}</span>
                    </div>
                  </div>
                ) : null}
                {isDone ? (
                  <div className="alert alert-success shadow-lg mt-12">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Richiesta inviata!</span>
                    </div>
                  </div>
                ) : null}
              </Dialog.Panel>
            </div>
          </Dialog>
        </>
      ) : null}
    </div>
  );
};

export default Book;
