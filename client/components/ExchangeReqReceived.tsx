import bookPlaceholder from "../public/book-placeholder.png";
import Image from "next/image";
import LinesEllipsis from "react-lines-ellipsis";

interface ExchangeProps {
  key: string;
  cover?: string;
  title: string;
  date: string;
  isbn: string;
  user: string;
  status: string;
}

const ExchangeReqReceived: React.FC<ExchangeProps> = (props) => {
  //convert isodate to local dd/mm/yyyy date
  const localDate = (isodate: string) =>
    new Date(props.date).toLocaleDateString("it-IT", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

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
          <p className="text-darkblue">Accettato</p>
        ) : props.status === "rejected" ? (
          <p className="text-darkblue">Accettato</p>
        ) : (
          <div className=" flex mt-2 space-x-2 ">
            <button className="btn-sm btn rounded-lg px-2 text-slate-50 bg-darkblue hover:bg-lightblue">
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
            <button className="btn-sm btn rounded-lg px-2 text-slate-50 bg-darkred hover:bg-scarletred">
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
    </div>
  );
};

export default ExchangeReqReceived;
