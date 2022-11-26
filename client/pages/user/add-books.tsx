import React, { useState } from "react";
import Image from "next/image";
import { useBooks } from "../../hooks/useBooks";
import axios from "axios";
import bookPlaceholder from "../../public/book-placeholder.png";

interface Book {
  isbn?: string;
  title: string;
  author: string;
  status: string;
  year: string;
  category: string;
  cover?: string;
}

const AddBooks: React.FC = () => {
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { addBook, isLoading, isError, isDone, error } = useBooks();

  const handleFetchBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    if (isbn) {
      try {
        const fetch = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=+isbn:${isbn}`
        );
        const volumeData = fetch.data.items[0].volumeInfo;
        setTitle(volumeData.title ?? "");
        setAuthor(volumeData.authors.toLocaleString() ?? "");
        setYear(volumeData.publishedDate ?? "");
        setCover(volumeData.imageLinks.thumbnail ?? "");
        setIsSearching(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const book: Book = {
      isbn: isbn,
      title: title,
      author: author,
      status: status,
      year: year,
      category: category,
      cover: cover,
    };

    addBook(book);
  };

  const clearAll = () => {
    setIsbn("");
    setTitle("");
    setAuthor("");
    setYear("");
    setCategory("");
    setStatus("");
    setCover("");
  };

  const handleClearAll = (e: React.FormEvent) => {
    e.preventDefault();
    clearAll();
  };

  return (
    <div className="flex flex-col items-center ">
      <h3 className="text-7xl font-black mt-12 text-darkblue tracking-tighter">
        Aggiungi un libro
      </h3>
      <h5 className="mt-8 text-lg font-serif">
        Cerca il tuo libro tramite il codice ISBN o inserisci i dati
        manualmente.
      </h5>
      <form
        className="flex flex-col mt-4 form-control min-w-[400px]"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col items-center label font-serif text-lg font-semibold text-darkblue">
          <div className="flex mt-4">
            <input
              type="text"
              onChange={(e) => setIsbn(e.target.value)}
              value={isbn}
              className="input input-bordered  min-w-[30ch] bg-slate-100 focus:outline-lightblue"
              placeholder="Inserisci un ISBN a 13 cifre..."
            />
            <button
              className="flex p-3 ml-4 bg-darkblue text-white rounded-lg items-center hover:bg-lightblue transition-all duration-100 ease-in-out select-none"
              onClick={(e) => handleFetchBook(e)}
            >
              {isSearching ? (
                <div>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
              ) : (
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
              )}
            </button>
            <button
              className="flex p-3 ml-4 bg-scarletred text-white rounded-lg items-center hover:bg-darkred active:bg-lightblue transition-all duration-100 ease-in-out select-none"
              onClick={(e) => handleClearAll(e)}
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </label>
        <div className="divider"></div>

        <div className="flex gap-12">
          <div>
            <Image
              src={cover != "" ? cover : bookPlaceholder}
              alt="bookCover"
              width={125}
              height={188}
              className="shadow-md"
            ></Image>
          </div>
          <div>
            <label className="flex flex-col items-start label p-0 font-serif text-lg font-semibold text-darkblue">
              Titolo
              <input
                type="text"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="input input-bordered mt-2 bg-slate-100 focus:outline-lightblue min-w-[35ch]"
              ></input>
            </label>
            <label className="flex flex-col items-start label p-0 mt-4 font-serif text-lg font-semibold  text-darkblue">
              Autore/i
              <input
                type="text"
                required
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                className="input input-bordered mt-2 bg-slate-100 focus:outline-lightblu min-w-[35ch]"
              ></input>
            </label>
          </div>
        </div>
        <div className="mt-4 mb-2 font-thin text-xs">
          *Il caricamento manuale della cover attualmente non è disponibile.
        </div>

        <div className="flex gap-6">
          <label className="flex flex-col items-start label font-serif text-lg font-semibold text-darkblue">
            Anno
            <input
              type="text"
              required
              onChange={(e) => setYear(e.target.value)}
              value={year}
              className="input input-bordered w-[100px] mt-4 bg-slate-100 focus:outline-lightblue"
            ></input>
          </label>
          <label className="flex flex-col items-start label font-serif text-lg font-semibold text-darkblue">
            Categoria
            <select
              onChange={(e) => setCategory(e.target.value)}
              required
              value={category}
              className="select select-bordered mt-4 bg-slate-100 focus:outline-lightblue"
            >
              <option disabled value={""}>
                Seleziona una categoria:
              </option>
              <option value={"Biografia"}>Biografia</option>
              <option value={"Romanzo Storico"}>Romanzo Storico</option>
              <option value={"Giallo"}>Giallo</option>
              <option value={"Thriller"}>Thriller</option>
              <option value={"Azione/Avventura"}>Azione/Avventura</option>
              <option value={"Fantascienza"}>Fantascienza</option>
              <option value={"Fantasy"}>Fantasy</option>
              <option value={"Horror"}>Horror</option>
              <option value={"Romanzo Rosa"}>Romanzo Rosa</option>
              <option value={"Romanzo Formativo"}>Romanzo Formativo</option>
              <option value={"Umoristico"}>Umoristico</option>
              <option value={"Classico"}>Classico</option>
              <option value={"Saggio"}>Saggio</option>
              <option value={"Manuali"}>Manuali</option>
            </select>
          </label>
          <label className="flex flex-col items-start label font-serif text-lg font-semibold text-darkblue">
            Stato del libro
            <select
              onChange={(e) => setStatus(e.target.value)}
              required
              value={status}
              className="select select-bordered mt-4 bg-slate-100 focus:outline-lightblue"
            >
              <option disabled value={""}>
                Seleziona lo stato:
              </option>
              <option value="Come Nuovo">Come Nuovo</option>
              <option value="Leggeri Segni di Usura">
                Leggeri Segni di Usura
              </option>
              <option value="Gravi Segni di Usura">Gravi Segni di Usura</option>
            </select>
          </label>
        </div>
        {isError ? (
          <div className="alert alert-error shadow-lg my-6 text-slate-50 bg-scarletred">
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
              <span>Errore! {error} </span>
            </div>
          </div>
        ) : null}
        {isDone ? (
          <div className="alert alert-success shadow-lg my-6">
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
              <span>Libro aggiunto con successo!</span>
            </div>
          </div>
        ) : null}
        <div className="flex justify-center">
          <button
            disabled={isLoading}
            className="mb-12 mt-8 btn btn-sm sm:btn-sm md:btn-md lg:btn-lg bg-darkblue hover:bg-lightblue text-slate-50"
          >
            {isLoading ? (
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
            Aggiungi al tuo scaffale
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBooks;
