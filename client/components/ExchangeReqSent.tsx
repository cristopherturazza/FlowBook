import bookPlaceholder from "../public/book-placeholder.png";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";

interface ExchangeProps {
  key: string;
  cover?: string;
  title: string;
  date: string;
  user: string;
  status: string;
  replyMessage?: string;
  userEmail?: string;
}

const ExchangeReqSent: React.FC<ExchangeProps> = (props) => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Copy to clipboard function

  const handleClipboard = () => {
    navigator.clipboard.writeText(props.userEmail ?? "");
    setCopySuccess(true);
  };

  //convert isodate to local dd/mm/yyyy date
  const localDate = (isodate: string) =>
    new Date(props.date).toLocaleDateString("it-IT", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

  return (
    <div className="flex flex-col items-center xl:grid xl:grid-cols-12 mb-4">
      <Image
        src={props.cover ?? bookPlaceholder}
        alt="Book Cover"
        className="xl:w-[50px] xl:col-span-1 rounded-sm"
        width={150}
        height={90}
      />
      <div className="flex flex-col text-center xl:text-start px-6 pt-6 xl:pt-0 xl:border-r xl:col-span-4">
        <h1 className="font-bold">Titolo</h1>
        <LinesEllipsis
          text={props.title}
          maxLine="1"
          ellipsis="..."
          basedOn="letters"
          className="xl:mt-4"
        />
      </div>
      <div className="flex flex-col text-center xl:text-start px-6 pt-6 xl:pt-0 xl:border-r xl:col-span-2">
        <h1 className="font-bold">Data</h1>
        <p className="xl:mt-4">{localDate(props.date)}</p>
      </div>
      <div className="flex flex-col text-center xl:text-start px-6 pt-6 xl:pt-0 xl:border-r xl:col-span-3">
        <h1 className="font-bold">Utente</h1>
        <LinesEllipsis
          text={props.user}
          maxLine="1"
          ellipsis="..."
          basedOn="letters"
          className="xl:mt-4"
        />
      </div>
      <div className="flex flex-col text-center xl:text-start px-6 py-6 xl:py-0 xl:col-span-2">
        <h1 className="font-bold">Risposta</h1>
        {props.status === "accepted" ? (
          <div
            className="flex justify-center items-center cursor-pointer bg-emerald-600 text-slate-50 text-center py-1 px-4 rounded-xl mt-3 space-x-1"
            onClick={() => setDialogStatus(!dialogStatus)}
          >
            Apri{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 ml-2"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
          </div>
        ) : props.status === "rejected" ? (
          <p className="bg-scarletred text-slate-50 text-center py-1 px-4 rounded-xl mt-3 space-x-1">
            Rifiutato
          </p>
        ) : (
          <p className="bg-amber-500 text-slate-50 text-center py-1 px-4 rounded-xl mt-3 space-x-1">
            In attesa
          </p>
        )}
      </div>
      <div className="xl:hidden divider"></div>
      <Dialog
        className={"relative z-50"}
        open={dialogStatus}
        onClose={() => setDialogStatus(false)}
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded-xl bg-sand shadow-2xl p-12">
            <Dialog.Title className="text-xl xl:text-3xl text-center font-black text-darkblue tracking-tighter">
              Risposta dell'utente {props.user}
            </Dialog.Title>
            <Dialog.Description className="mt-4 text-lightblue bg-slate-50 p-4 rounded-xl border">
              "{props.replyMessage}"
            </Dialog.Description>
            <h3 className="text-darkblue font-semibold mt-4 text-center">
              Indirizzo e-mail:
            </h3>
            <p className="text-sm text-center">
              Clicca sull'indirizzo per inviare una mail o usa il tasto copia
            </p>
            <p className="text-darkred relative p-4 rounded-xl border bg-slate-50 text-center mt-4">
              <a href={`mailto:${props.userEmail}`}>{props.userEmail}</a>
              <div
                className="absolute -top-5 -right-5 p-2 rounded-full shadow-lg bg-slate-50 cursor-pointer text-darkblue hover:text-lightblue active:shadow-sm"
                onClick={handleClipboard}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                  />
                </svg>
              </div>
            </p>
            {copySuccess ? (
              <div className="mt-2 text-center">Copiato!</div>
            ) : null}

            <div className="flex justify-center mt-8 gap-6">
              <button
                className="btn btn-md md:btn-md lg:btn-lg bg-darkred hover:bg-scarletred text-slate-50"
                onClick={() => {
                  setDialogStatus(false);
                }}
              >
                Chiudi
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ExchangeReqSent;
