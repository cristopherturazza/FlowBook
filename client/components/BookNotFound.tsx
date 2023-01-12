import Link from "next/link";

// Book Not found error page

const BookNotFound: React.FC = () => {
  return (
    <>
      <h4 className="text-3xl mt-20 text-darkblue tracking-tighter">
        {" "}
        Nessun libro trovato.
      </h4>
      <Link
        href="/user/dashboard"
        className="btn btn-outline btn-sm sm:btn-sm md:btn-md mt-12 mb-8 border-lightblue text-lightblue hover:bg-lightblue hover:text-slate-50 hover:border-darkblue"
      >
        Torna alla ricerca
      </Link>
    </>
  );
};

export default BookNotFound;
