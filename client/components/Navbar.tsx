import Link from "next/link";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar: React.FC = () => {
  const { state } = useAuthContext();
  const { logout } = useLogout();

  const user = state?.email;

  //TO-DO: link a pagina profilo personale
  // Notifiche?

  return (
    <div className="navbar bg-darkred shadow-xl text-slate-50">
      <h1 className="navbar-start px-12 py-6 font-bold text-4xl tracking-tight">
        FlowBook
      </h1>
      <div className="navbar-end pr-24">
        {!user && (
          <ul className="flex text-lg font-semibold font-serif">
            <li className="pr-8 hover:text-lightblue">
              <Link href="/login">Accedi</Link>
            </li>
            <li className="hover:text-lightblue">
              <Link href="/signup">Registrati</Link>
            </li>
          </ul>
        )}
        {user && (
          <ul className="flex text-lg font-semibold font-serif">
            <li className="pr-8 hover:text-lightblue">
              <button onClick={() => logout()}>Logout</button>
            </li>
            <li className="hover:text-lightblue">
              <Link href="/user">Il tuo profilo</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
