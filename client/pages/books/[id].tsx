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
            <div className="mt-12 xl:ml-20">
              <h3 className="font-bold text-2xl">Informazioni</h3>
              <div className="divider"></div>
              <p className="flex items-center xl:text-xl my-3 font-serif">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>

                <strong className="mr-2">Autore/i: </strong>
                {data.author}
              </p>
              <p className="flex items-center xl:text-xl my-3 font-serif">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
                  />
                </svg>

                <strong className="mr-2">Codice ISBN: </strong>
                {data.isbn}
              </p>
              <p className="flex items-center xl:text-xl my-3 font-serif">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6z"
                  />
                </svg>

                <strong className="mr-2">Categoria: </strong>
                {data.category}
              </p>
              <p className="flex items-center xl:text-xl my-3 font-serif">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>

                <strong className="mr-2">Anno: </strong>
                {data.year}
              </p>
              <p className="flex items-center xl:text-xl my-2 font-serif">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>

                <strong className="mr-2">Stato del libro: </strong>
                {data.status}
              </p>
              <p className="flex items-center xl:text-xl my-3 font-serif">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <strong className="mr-2">Proprietario: </strong>
                {userData?.id != data.owner._id ? data.owner.fullname : "Tu"}
              </p>
              <p className="flex items-center xl:text-xl my-3 font-serif">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>

                <strong className="mr-2">Dove si trova: </strong>
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
