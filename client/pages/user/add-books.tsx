import { useEffect, useState } from "react";
import Image from "next/image";
import bookPlaceholder from "../../public/book-placeholder.png";

const AddBooks: React.FC = () => {
  const [ISBN, setISBN] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState(bookPlaceholder);

  return (
    <div className="flex flex-col items-center ">
      <h3 className="text-7xl font-black mt-12 text-darkblue tracking-tighter">
        Aggiungi un libro
      </h3>
      <h5 className="mt-8 text-lg font-serif">
        Cerca il tuo libro tramite il codice ISBN o inserisci i dati
        manualmente.
      </h5>
      <form className="flex flex-col mt-4 form-control min-w-[400px]">
        <label className="flex flex-col items-center label font-serif text-lg font-semibold text-darkblue">
          <div className="flex mt-4">
            <input
              type="text"
              onChange={(e) => setISBN(e.target.value)}
              value={ISBN}
              className="input input-bordered  min-w-[400px] bg-slate-100 focus:outline-lightblue"
              placeholder="Inserisci un ISBN a 13 o 10 cifre..."
            />
            <button className="flex p-3 ml-4 bg-scarletred text-white rounded-lg items-center hover:bg-darkred active:bg-lightblue transition-all duration-100 ease-in-out select-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
        </label>
        <div className="divider"></div>
        <div className="flex items-center mt-4">
          <div className="flex flex-col w-[125px]">
            <Image src={cover} alt="bookCover" width={125} height={188}></Image>
            <small className="mt-2 leading-tight ">
              *Il caricamento manuale della cover attualmente non è disponibile.
            </small>
          </div>
          <div className="flex flex-col ml-16">
            <div className="grid grid-cols-2 gap-4 -mt-16">
              <label className="flex flex-col items-start label font-serif text-lg font-semibold text-darkblue">
                Titolo
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className="input input-bordered mt-4 bg-slate-100 focus:outline-lightblue"
                ></input>
              </label>
              <label className="flex flex-col items-start label font-serif text-lg font-semibold text-darkblue">
                Autore/i
                <input
                  type="text"
                  onChange={(e) => setAuthor(e.target.value)}
                  value={author}
                  className="input input-bordered mt-4 bg-slate-100 focus:outline-lightblue"
                ></input>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <label className="flex flex-col items-start label font-serif text-lg font-semibold text-darkblue">
                Categoria
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  className="select select-bordered mt-4 bg-slate-100 focus:outline-lightblue"
                ></select>
              </label>
              <label className="flex flex-col items-start label font-serif text-lg font-semibold text-darkblue">
                Stato del libro
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                  className="select select-bordered mt-4 bg-slate-100 focus:outline-lightblue"
                >
                  <option value="Come Nuovo">Come Nuovo</option>
                  <option value="In Buono Stato">In Buono Stato</option>
                  <option value="Con Segni di Usura">Con Segni di Usura</option>
                  <option value="Rovinato">Rovinato</option>
                  <option value="Incompleto">Incompleto</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="mb-12 mt-16 btn btn-sm sm:btn-sm md:btn-md lg:btn-lg bg-darkblue hover:bg-lightblue text-slate-50">
            Aggiungi al tuo scaffale
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBooks;
