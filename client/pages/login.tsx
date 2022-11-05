import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Link from "next/link";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

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
          className="input input-bordered w-full bg-slate-100 focus:outline-lightblue"
        />
        <label className="label font-serif text-lg font-semibold text-darkblue mt-2">
          Password:
        </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="input input-bordered w-full bg-slate-100  focus:outline-lightblue"
        />
        <div className="flex justify-center">
          <button
            disabled={isLoading}
            className="mt-8 btn btn-sm sm:btn-sm md:btn-md lg:btn-lg bg-darkblue hover:bg-lightblue text-slate-50"
          >
            Accedi
          </button>
        </div>

        {error && <div> error </div>}
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
