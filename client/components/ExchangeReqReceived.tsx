import bookPlaceholder from "../public/book-placeholder.png";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import { useExchange } from "../hooks/useExchange";

interface ExchangeProps {
  key: string;
  id: string;
  cover?: string;
  title: string;
  date: string;
  user: string;
  status: string;
  trigger: () => void;
}

const ExchangeReqReceived: React.FC<ExchangeProps> = (props) => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const [allowStatus, setAllowStatus] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const { updateExchange, isWorking, isDone, isExError } = useExchange();

  //convert isodate to local dd/mm/yyyy date
  const localDate = (isodate: string) =>
    new Date(props.date).toLocaleDateString("it-IT", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

  const handleRejected = () => {
    updateExchange(props.id, "rejected");
    props.trigger();
  };

  const handleAccepted = () => {
    updateExchange(props.id, "accepted", replyMessage);
    setAllowStatus(false);
    setDialogStatus(false);
    props.trigger();
  };

  return (
    <div className="flex flex-col xl:grid xl:grid-cols-12 mb-4">
      <Image
        src={props.cover ?? bookPlaceholder}
        alt="Book Cover"
        className="xl:w-[50px] xl:col-span-1 rounded-sm"
        width={150}
        height={90}
      />
      <div className="flex flex-col px-6 xl:border-r xl:col-span-4">
        <h1 className="font-bold">Titolo</h1>
        <LinesEllipsis
          text={props.title}
          maxLine="1"
          ellipsis="..."
          basedOn="letters"
          className="mt-4"
        />
      </div>
      <div className="flex flex-col px-6 xl:border-r xl:col-span-2">
        <h1 className="font-bold">Data</h1>
        <p className="mt-4">{localDate(props.date)}</p>
      </div>
      <div className="flex flex-col px-6 xl:border-r xl:col-span-3">
        <h1 className="font-bold">Richiedente</h1>
        <LinesEllipsis
          text={props.user}
          maxLine="1"
          ellipsis="..."
          basedOn="letters"
          className="mt-4"
        />
      </div>
      <div className="flex flex-col px-6 xl:col-span-2">
        <h1 className="font-bold">Risposta</h1>
        {props.status === "accepted" ? (
          <p className="bg-emerald-600 text-slate-50 text-center p-1 rounded-xl mt-3 space-x-1">
            Accettato
          </p>
        ) : props.status === "rejected" ? (
          <p className="bg-scarletred text-slate-50 text-center p-1 rounded-xl mt-3 space-x-1">
            Rifiutato
          </p>
        ) : (
          <div className=" flex mt-2 space-x-2 ">
            <button
              onClick={() => setDialogStatus(true)}
              className="btn-sm btn rounded-lg px-2 text-slate-50 bg-emerald-600 hover:bg-emerald-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </button>
            <button
              onClick={handleRejected}
              className="btn-sm btn rounded-lg px-2 text-slate-50 bg-darkred hover:bg-scarletred"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <Dialog
        className={"relative z-50"}
        open={dialogStatus}
        onClose={() => setDialogStatus(false)}
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded-xl bg-sand shadow-2xl p-12">
            <Dialog.Title className="text-xl xl:text-3xl text-center font-black text-darkblue tracking-tighter">
              Accetta Scambio
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-center text-lightblue">
              Per accettare la proposta di scambio dovrai fornire il tuo
              indirizzo e-mail e le indicazioni per contattarti.
            </Dialog.Description>
            <p className="text-darkred text-center mt-4">
              Sei sicuro di voler accettare la richiesta e fornire il tuo
              indirizzo e-mail all'utente?
            </p>
            <div className="flex mt-4 justify-center items-center">
              <input
                type="checkbox"
                className="checkbox checkbox-accent  border border-darkblue"
                checked={allowStatus}
                onClick={() => setAllowStatus(!allowStatus)}
              ></input>
              <p className="text-darkblue font-semibold ml-4">
                Si, voglio fornire la mia e-mail
              </p>
            </div>
            {allowStatus ? (
              <div className="flex flex-col items-center text-darkblue text-sm mt-6 ">
                <p>Lascia un messaggio all'utente (consigliato): </p>
                <textarea
                  className="textarea textarea-bordered focus:outline-lightblue bg-slate-50 mt-2 w-full"
                  placeholder="Es.: libro in cambio desiderato, necessità relative allo scambio, ecc..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                ></textarea>
              </div>
            ) : null}
            <div className="flex justify-center mt-8 gap-6">
              <button
                disabled={!allowStatus}
                className="btn btn-md md:btn-md lg:btn-lg bg-darkblue hover:bg-lightblue text-slate-50 disabled:text-slate-500"
                onClick={handleAccepted}
              >
                Accetta
              </button>
              <button
                className="btn btn-md md:btn-md lg:btn-lg bg-darkred hover:bg-scarletred text-slate-50"
                onClick={() => {
                  setAllowStatus(false);
                  setDialogStatus(false);
                }}
              >
                Annulla
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ExchangeReqReceived;
