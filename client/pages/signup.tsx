import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/router";
import { useSignup } from "../hooks/useSignup";
import axios from "axios";
import type { HintCity } from "../types/HintCity";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [errorPasswordCheck, setErrorPasswordCheck] = useState(false);
  const [fullname, setFullName] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [hintCities, setHintCities] = useState<Array<HintCity>>([]);
  const [selectedCity, setSelectedCity] = useState<HintCity>();
  const { signup, error, isError, isLoading, isDone } = useSignup();

  const { userData } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    userData?.isLoggedIn === true ? router.push("/user/dashboard") : null;
  }, [userData]);

  const handleCity = (city: HintCity) => {
    if (typeof city.city === "string") {
      setCity(`${city.city} (${city.county_code})`);
    }

    const selected = {
      place_id: city.place_id,
      city: city.city || city.name,
      county_code: city.county_code,
      lon: city.lon,
      lat: city.lat,
    };

    setSelectedCity(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!errorPasswordCheck) {
      await signup(email, password, fullname, birthdate, gender, selectedCity);
    }
  };

  useEffect(() => {
    password != passwordCheck
      ? setErrorPasswordCheck(true)
      : setErrorPasswordCheck(false);
  }, [password, passwordCheck]);

  useEffect(() => {
    const fetchCities = async () => {
      if (city != "") {
        const query = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${city}&lang=it&limit=3&type=city&filter=countrycode:it&format=json&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}`
        );
        setHintCities(query.data.results);
      } else {
        setHintCities([]);
      }
    };
    fetchCities();
  }, [city]);

  return (
    <div className="flex flex-col items-center ">
      <h3 className="text-5xl xl:text-7xl xl:max-w-none max-w-[9ch] text-center font-black mt-8 text-darkblue tracking-tighter">
        Partecipa al flusso
      </h3>
      <form
        className="flex flex-col mt-6 form-control max-w-[250px] xl:max-w-none xl:min-w-[400px]"
        onSubmit={handleSubmit}
        autoComplete="new-password"
      >
        <div className="xl:grid xl:grid-cols-2 gap-6 ">
          <div className="flex flex-col">
            <label className="label font-serif text-lg font-semibold text-darkblue">
              Email:
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="input input-bordered w-full bg-slate-100 focus:outline-lightblue"
              placeholder="Richiesto"
            />
          </div>
          <div className="flex flex-col">
            <label className="label font-serif text-lg font-semibold text-darkblue">
              Nome e Cognome:
            </label>
            <input
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              value={fullname}
              className="input input-bordered w-full bg-slate-100 focus:outline-lightblue"
              placeholder="Richiesto"
            />
          </div>
          <div className="flex flex-col relative">
            <label className="label font-serif text-lg font-semibold text-darkblue">
              Password:
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Richiesto"
              autoComplete="new-password"
              className={`input input-bordered w-full bg-slate-100 focus:outline-lightblue ${
                errorPasswordCheck
                  ? "outline-scarletred focus:outline-scarletred"
                  : "outline-none focus:outline-lightblue"
              }`}
            />
            {errorPasswordCheck && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6 text-scarletred absolute right-4 top-14"
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
            )}
          </div>
          <div className="flex flex-col relative">
            <label className="label font-serif text-lg font-semibold text-darkblue">
              Conferma Password:
            </label>
            <input
              type="password"
              onChange={(e) => setPasswordCheck(e.target.value)}
              value={passwordCheck}
              placeholder="Richiesto"
              className={`input input-bordered w-full bg-slate-100 focus:outline-lightblue ${
                errorPasswordCheck
                  ? "outline-scarletred focus:outline-scarletred"
                  : "outline-none focus:outline-lightblue"
              }`}
            />
            {errorPasswordCheck && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6 text-scarletred absolute right-4 top-14"
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
            )}
          </div>
        </div>
        <small className="mt-2">
          La password deve contenere almeno 8 caratteri, minimo una lettera
          maiuscola, almeno un numero e almeno un simbolo.
        </small>
        <div className="xl:grid xl:grid-cols-3 gap-2 my-4">
          <div className="flex flex-col dropdown dropdown-bottom mb-8">
            <label className="label font-serif text-lg font-semibold text-darkblue">
              Città:
            </label>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              className="input input-bordered w-full bg-slate-100 focus:outline-lightblue"
              placeholder="Richiesto"
            />
            <div>
              {hintCities.length > 2 && (
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-slate-100 text-darkblue rounded-box w-56 "
                >
                  <li className="p-1 border-b-2 mb-1 ">
                    Seleziona la tua città:
                  </li>
                  {hintCities?.length &&
                    hintCities.map((city) => (
                      <li
                        className="p-2 hover:bg-slate-300 rounded-md cursor-pointer"
                        key={city.place_id}
                        onClick={() => {
                          (document.activeElement as HTMLElement).blur();
                          handleCity(city);
                        }}
                      >
                        {city.city || city.name} ({city.county_code})
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center xl:items-start  ">
            <label className="label font-serif text-lg font-semibold text-darkblue">
              Genere:
            </label>
            <div className="flex flex-row">
              <label className="flex flex-col items-center pl-2">
                <input
                  type="radio"
                  value="male"
                  id="male"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "male"}
                  className="radio mb-1 bg-slate-200 border-darkblue checked:bg-lightblue"
                />
                Maschio
              </label>
              <label className="flex flex-col items-center pl-2">
                <input
                  type="radio"
                  value="female"
                  id="female"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "female"}
                  className="radio mb-1 bg-slate-200 border-darkblue checked:bg-lightblue "
                />
                Femmina
              </label>
              <label className="flex flex-col items-center pl-2">
                <input
                  type="radio"
                  value="other"
                  id="other"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "other"}
                  className="radio mb-1 bg-slate-200 border-darkblue checked:bg-lightblue"
                />
                Altro
              </label>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="label font-serif text-lg font-semibold text-darkblue">
              Data di nascita:
            </label>
            <input
              type="date"
              onChange={(e) => setBirthDate(e.target.value)}
              value={birthdate}
              className="input input-bordered w-full bg-slate-100 focus:outline-lightblue"
            />
          </div>
        </div>

        {isError && (
          <div className="alert alert-error shadow-lg mb-6 text-slate-50 bg-scarletred">
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
              <span>Errore! {error}</span>
            </div>
          </div>
        )}
        {isDone ? (
          <div className="alert alert-success shadow-lg mb-6">
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
              <span>Utente creato correttamente!</span>
            </div>
          </div>
        ) : null}
        <div className="flex flex-col items-center justify-center">
          <button
            disabled={isLoading}
            className="mb-8 btn btn-md md:btn-md lg:btn-lg bg-darkblue hover:bg-lightblue text-slate-50"
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
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : null}
            Iscriviti
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
