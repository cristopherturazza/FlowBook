import { useState } from "react";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="mt-12">
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-darkblue sr-only "
        >
          Search
        </label>
        <div className="flex xl:flex-row flex-col items-center">
          <div className="relative">
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
              type="search"
              id="default-search"
              className="block font-serif w-[30ch] xl:w-[50ch] p-4 pl-10 text-sm text-darkblue border border-slate-300 rounded-lg outline-none bg-slate-50 focus:ring-lightblue focus:border-lightblue"
              placeholder="Inserisci una parola chiave..."
              required
              value={query}
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
          </div>
          <button
            type="submit"
            className="text-slate-50 btn mt-4 xl:ml-4 xl:mt-0 bg-darkred hover:bg-scarletred font-medium rounded-lg text-sm px-4 py-2"
          >
            Cerca
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
