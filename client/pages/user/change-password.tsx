import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from "react";
import { useNewPassword } from "../../hooks/useNewPassword";
import { useRouter } from "next/router";

const ChangePassword: React.FC = () => {
  const { userData, dispatch } = useAuthContext();

  const router = useRouter();

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [errorPasswordCheck, setErrorPasswordCheck] = useState(false);

  const { updatePassword, error, isError, isDone, isLoading } =
    useNewPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePassword(password);
  };

  useEffect(() => {
    password != passwordCheck
      ? setErrorPasswordCheck(true)
      : setErrorPasswordCheck(false);
  }, [password, passwordCheck]);

  return (
    <div className="flex flex-col items-center ">
      <h3 className="text-5xl xl:text-7xl text-center font-black mt-12 text-darkblue tracking-tighter">
        Cambia Password
      </h3>
      <form
        className="flex flex-col mt-6 form-control max-w-[250px] xl:max-w-[400px]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col relative">
          <label className="label font-serif text-lg font-semibold text-darkblue">
            Nuova Password:
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
        <div className="flex flex-col relative">
          <label className="label font-serif text-lg font-semibold text-darkblue">
            Conferma Nuova Password:
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
        <small className="mt-2">
          La password deve contenere almeno 8 caratteri, minimo una lettera
          maiuscola, almeno un numero e almeno un simbolo.
        </small>
        {isError ? (
          <div className="alert alert-error shadow-lg my-4 text-slate-50 bg-scarletred">
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
          <div className="alert alert-success shadow-lg my-4">
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
              <span>Password modificata! Effettua nuovamente il login</span>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col items-center justify-center mt-1">
          <button
            disabled={isLoading}
            className="my-8 btn btn-md md:btn-md lg:btn-lg bg-darkblue hover:bg-lightblue text-slate-50"
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
            Cambia Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
