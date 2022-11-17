import Link from "next/link";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar: React.FC = () => {
  const { userData } = useAuthContext();
  const { logout } = useLogout();

  //TO-DO: Notifiche?

  return (
    <div className="navbar z-10 bg-darkred shadow-xl text-slate-50">
      <h1 className="navbar-start text-sand px-12 py-6 font-bold text-4xl tracking-tight">
        <Link href={userData?.isLoggedIn ? "/user/dashboard" : "/"}>
          FlowBook
        </Link>
      </h1>
      <div className="navbar-end text-sand pr-24">
        {!userData?.isLoggedIn ? (
          <ul className="flex text-lg font-semibold">
            <Link href="/login">
              <li className="px-4 py-2 mx-4 hover:bg-lightblue hover:text-darkblue border rounded-full">
                Accedi
              </li>
            </Link>
            <Link href="/signup">
              <li className="hover:bg-lightblue hover:text-darkblue border px-4 py-2 mx-4 rounded-full">
                Registrati
              </li>
            </Link>
          </ul>
        ) : null}
        {userData?.isLoggedIn ? (
          <ul className="flex text-lg font-semibold font-serif">
            <li className="hover:text-lightblue">
              <Link href="/user/your-account">Il tuo profilo</Link>
            </li>
            <li className="pl-8 hover:text-lightblue">
              <button onClick={() => logout()}>Logout</button>
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
