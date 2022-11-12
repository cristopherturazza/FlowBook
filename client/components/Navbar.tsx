import Link from "next/link";
import * as React from "react";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar: React.FC = () => {
  const { userData } = useAuthContext();
  const { logout } = useLogout();

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  //TO-DO: link a pagina profilo personale
  // Notifiche?

  return (
    <div className="navbar bg-darkred shadow-xl text-slate-50">
      <h1 className="navbar-start px-12 py-6 font-bold text-4xl tracking-tight">
        FlowBook
      </h1>
      <div className="navbar-end pr-24">
        {!userData?.isLoggedIn ? (
          <ul className="flex text-lg font-semibold font-serif">
            <li className="pr-8 hover:text-lightblue">
              <Link href="/login">Accedi</Link>
            </li>
            <li className="hover:text-lightblue">
              <Link href="/signup">Registrati</Link>
            </li>
          </ul>
        ) : null}
        {userData?.isLoggedIn ? (
          <ul className="flex text-lg font-semibold font-serif">
            <li className="pr-8 hover:text-lightblue">
              <button onClick={() => logout()}>Logout</button>
            </li>
            <li className="hover:text-lightblue">
              <Link href="/user/your-account">Il tuo profilo</Link>
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
