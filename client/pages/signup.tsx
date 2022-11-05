import React, { FormEvent, useState, useEffect } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [errorPasswordCheck, setErrorPasswordCheck] = useState(false);
  const [fullname, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!errorPasswordCheck) {
      await signup(email, password, fullname, birthDate, gender, city);
    }
  };

  useEffect(() => {
    password != passwordCheck
      ? setErrorPasswordCheck(true)
      : setErrorPasswordCheck(false);
  }, [password, passwordCheck]);

  return (
    <div className="flex flex-col items-center ">
      <h3 className="text-7xl font-black mt-8 text-darkblue tracking-tighter">
        Partecipa al flusso
      </h3>
      <form
        className="flex flex-col mt-6 form-control min-w-[400px]"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-5 ">
          <div className="flex flex-col">
            <label className="label font-serif text-lg font-semibold text-darkblue">
              Email:
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="input input-bordered w-full bg-slate-100 focus:outline-lightblue"
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
        <div className="grid grid-cols-3 gap-5 mt-4">
          <div className="flex flex-col">
            <label className="label font-serif text-lg font-semibold text-darkblue">
              Data di nascita:
            </label>
            <input
              type="date"
              onChange={(e) => setBirthDate(e.target.value)}
              value={birthDate}
              className="input input-bordered w-full bg-slate-100 focus:outline-lightblue"
            />
          </div>
          <div className="flex flex-col">
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
              Città:
            </label>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              className="input input-bordered w-full bg-slate-100 focus:outline-lightblue"
            />
          </div>
        </div>
        <div className="flex justify-center mt-1">
          <button
            disabled={isLoading}
            className="mt-8 btn btn-sm sm:btn-sm md:btn-md lg:btn-lg bg-darkblue hover:bg-lightblue text-slate-50"
          >
            Iscriviti
          </button>
        </div>
        {isLoading && <div> Loading.... </div>}
        {error && <div> Error </div>}
      </form>
    </div>
  );
};

export default Signup;
