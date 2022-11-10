import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Link from "next/link";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isError, isLoading } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="flex flex-col items-center ">
      <h3 className="text-7xl font-black mt-12 text-darkblue tracking-tighter">
        Oh, rieccoti!
      </h3>
      <form
        className="flex flex-col mt-4 form-control min-w-[400px]"
        onSubmit={handleSubmit}
      >
        <label className="label font-serif text-lg font-semibold text-darkblue">
          Email:
        </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          className="input input-bordered w-full bg-slate-100 focus:outline-lightblue"
        />
        <label className="label font-serif text-lg font-semibold text-darkblue mt-2">
          Password:
        </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="current-password"
          className="input input-bordered mb-8 w-full bg-slate-100  focus:outline-lightblue"
        />
        {isError ? (
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
              <span>Error! {error}</span>
            </div>
          </div>
        ) : null}
        <div className="flex justify-center">
          <button
            disabled={isLoading}
            className="mt-2 btn btn-sm sm:btn-sm md:btn-md lg:btn-lg bg-darkblue hover:bg-lightblue text-slate-50"
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
            Accedi
          </button>
        </div>
      </form>
      <p className="mt-4 font-serif"> oppure </p>
      <Link href="/signup">
        <button className="btn btn-outline btn-sm sm:btn-sm md:btn-md mt-4 mb-8 border-lightblue text-lightblue hover:bg-lightblue hover:text-slate-50 hover:border-darkblue">
          Registrati
        </button>
      </Link>
    </div>
  );
};

export default Login;
