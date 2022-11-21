import Link from "next/link";

const NotLoggedIn: React.FC = () => {
  return (
    <>
      <h4 className="text-3xl font-semibold mt-20 text-darkblue tracking-tighter">
        {" "}
        Devi effettuare il login per visualizzare il tuo profilo
      </h4>
      <Link
        href="/login"
        className="btn btn-outline btn-sm sm:btn-sm md:btn-md mt-12 mb-8 border-lightblue text-lightblue hover:bg-lightblue hover:text-slate-50 hover:border-darkblue"
      >
        Login
      </Link>
    </>
  );
};

export default NotLoggedIn;
