import React, { useState } from "react";
import { Popover, Transition, Listbox } from "@headlessui/react";
import { Fragment } from "react";

interface SearchBarProps {
  onSearch: (q: string, cat: string, stat: string, dis: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tutte");
  const [status, setStatus] = useState("");
  const [distance, setDistance] = useState(1200);

  const categories = [
    "Tutte",
    "Biografia",
    "Romanzo Storico",
    "Giallo",
    "Thriller",
    "Azione/Avventura",
    "Fantascienza",
    "Fantasy",
    "Horror",
    "Romanzo Rosa",
    "Romanzo Formativo",
    "Umoristico",
    "Classico",
    "Saggio",
    "Manuali",
  ];

  // send query to parent

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, category, status, distance);
  };

  // send filter query to parent

  const handleFilter = (e: React.FormEvent) => {
    onSearch(query, category, status, distance);
  };

  // reset query

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery("");
    setCategory("Tutte");
    setStatus("");
    setDistance(1200);
    onSearch("", "Tutte", "", 1200);
  };

  return (
    <div className="mt-12">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-darkblue sr-only "
        >
          Search
        </label>
        <div className="flex lg:flex-row flex-col items-center">
          <div className="flex relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="default-search"
              className="block font-serif w-[30ch] md:w-[40ch]  lg:w-[50ch] p-4 pl-10 text-sm text-darkblue border border-slate-300 rounded-lg outline-none bg-slate-50 focus:ring-lightblue focus:border-lightblue"
              placeholder="Cerca nei titoli..."
              required
              value={query}
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button>
                    <div
                      className={`absolute right-5 top-4 cursor-pointer ${
                        open ? "text-lightblue" : "text-darkblue"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </Popover.Button>
                  <Popover.Overlay className="fixed inset-0 z-10 bg-black opacity-30" />
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute right-0 z-10 mt-10">
                      <div className="rounded-lg shadow-lg border border-slate-300 bg-slate-50">
                        <div className="h-3 w-3 absolute bg-slate-50 border-l border-t border-slate-300 right-7 -top-3 z-50 origin-bottom-left rotate-45 transform"></div>
                        <div className="mb-4">
                          <Listbox value={category} onChange={setCategory}>
                            <Listbox.Label
                              className={"label px-4 mt-2 font-serif text-sm"}
                            >
                              Categoria
                            </Listbox.Label>
                            <Listbox.Button
                              className={
                                "select select-bordered relative items-center my-2 mx-4 w-[30ch] bg-slate-100"
                              }
                            >
                              {category}
                            </Listbox.Button>
                            <Listbox.Options
                              className={
                                "mx-4 w-3/4 absolute flex flex-col bg-slate-100 border rounded-md z-50 my-1 py-2"
                              }
                            >
                              {categories.map((category, i) => (
                                <Listbox.Option
                                  key={i}
                                  value={category}
                                  className="px-4 py-1 cursor-pointer hover:bg-lightblue hover:text-slate-50 text-sm"
                                >
                                  {category}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Listbox>
                          <Listbox value={status} onChange={setStatus}>
                            <Listbox.Label
                              className={"label px-4 mt-2 font-serif text-sm"}
                            >
                              Stato del Libro
                            </Listbox.Label>
                            <Listbox.Button
                              className={
                                "select select-bordered relative items-center my-2 mx-4 w-[30ch] bg-slate-100"
                              }
                            >
                              {status === ""
                                ? "Tutti"
                                : status === "good"
                                ? "In Buono Stato"
                                : status === "perfect"
                                ? "Come Nuovi"
                                : "Tutti"}
                            </Listbox.Button>
                            <Listbox.Options
                              className={
                                "mx-4 w-3/4 absolute flex flex-col bg-slate-100 border rounded-md z-50 my-1 py-2"
                              }
                            >
                              <Listbox.Option
                                value={""}
                                className="px-4 py-1 cursor-pointer hover:bg-lightblue hover:text-slate-50 text-sm"
                              >
                                Tutti
                              </Listbox.Option>
                              <Listbox.Option
                                value={"good"}
                                className="px-4 py-1 cursor-pointer hover:bg-lightblue hover:text-slate-50 text-sm"
                              >
                                In Buono Stato
                              </Listbox.Option>
                              <Listbox.Option
                                value={"perfect"}
                                className="px-4 py-1 cursor-pointer hover:bg-lightblue hover:text-slate-50 text-sm"
                              >
                                Come Nuovi
                              </Listbox.Option>
                            </Listbox.Options>
                          </Listbox>
                          <Listbox value={distance} onChange={setDistance}>
                            <Listbox.Label
                              className={"label px-4 mt-2 font-serif text-sm"}
                            >
                              Distanza
                            </Listbox.Label>
                            <Listbox.Button
                              className={
                                "select select-bordered relative items-center my-2 mx-4 w-[30ch] bg-slate-100"
                              }
                            >
                              {distance === 1200
                                ? "Tutti"
                                : distance === 10
                                ? "Nei dintorni"
                                : distance === 25
                                ? "25km"
                                : distance === 50
                                ? "50km"
                                : distance === 100
                                ? "100km"
                                : "Tutti"}
                            </Listbox.Button>
                            <Listbox.Options
                              className={
                                "mx-4 w-3/4 absolute flex flex-col bg-slate-100 border rounded-md z-50 my-1 py-2"
                              }
                            >
                              <Listbox.Option
                                value={1200}
                                className="px-4 py-1 cursor-pointer hover:bg-lightblue hover:text-slate-50 text-sm"
                              >
                                Tutti
                              </Listbox.Option>
                              <Listbox.Option
                                value={10}
                                className="px-4 py-1 cursor-pointer hover:bg-lightblue hover:text-slate-50 text-sm"
                              >
                                Nei dintorni
                              </Listbox.Option>
                              <Listbox.Option
                                value={25}
                                className="px-4 py-1 cursor-pointer hover:bg-lightblue hover:text-slate-50 text-sm"
                              >
                                25km
                              </Listbox.Option>
                              <Listbox.Option
                                value={50}
                                className="px-4 py-1 cursor-pointer hover:bg-lightblue hover:text-slate-50 text-sm"
                              >
                                50km
                              </Listbox.Option>
                              <Listbox.Option
                                value={100}
                                className="px-4 py-1 cursor-pointer hover:bg-lightblue hover:text-slate-50 text-sm"
                              >
                                100km
                              </Listbox.Option>
                            </Listbox.Options>
                          </Listbox>
                          <div className="flex justify-center mt-4">
                            <Popover.Button
                              className="text-slate-50 btn bg-darkblue hover:bg-lightblue font-medium rounded-lg text-sm px-4 py-2"
                              onClick={handleFilter}
                            >
                              Applica
                            </Popover.Button>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
          <div className="flex mt-4 lg:mt-0 gap-2 lg:gap-0">
            <button
              type="submit"
              className="text-slate-50 btn mt-4 lg:ml-4 lg:mt-0 bg-darkblue hover:bg-lightblue font-medium rounded-lg text-sm px-4 py-2"
            >
              Cerca
            </button>
            <button
              className="text-slate-50 btn mt-4 lg:ml-4 lg:mt-0 bg-darkred hover:bg-scarletred font-medium rounded-lg text-sm px-4 py-2"
              onClick={(e) => handleReset(e)}
            >
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
