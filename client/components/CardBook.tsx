import Image from "next/image";
import bookPlaceholder from "../public/book-placeholder.png";
import { useRouter } from "next/router";
import LinesEllipsis from "react-lines-ellipsis";

interface CardBookProps {
  key: string;
  cover: string;
  title: string;
  author: string;
  status: string;
  id: string;
}

const CardBook: React.FC<CardBookProps> = (props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center my-8">
      <div className="relative">
        <Image
          src={props.cover && props.cover != "" ? props.cover : bookPlaceholder}
          alt={props.title}
          width={160}
          height={250}
          className="rounded-md shadow-md h-[250px]"
        ></Image>
        <div className="absolute -bottom-6 left-14">
          <button
            className="btn bg-darkblue hover:bg-lightblue rounded-full shadow-md text-slate-50 border-none"
            onClick={() => router.push(`/books/${props.id}`)}
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
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="text-center mt-8">
        <LinesEllipsis
          text={props.title}
          maxLine="2"
          ellipsis="..."
          basedOn="words"
          className="text-xl font-bold"
        />
        <div>
          <p className="font-serif text-lg">{props.author}</p>
          <p className="font-serif text-sm font-thin">{props.status}</p>
        </div>
      </div>
    </div>
  );
};

export default CardBook;
