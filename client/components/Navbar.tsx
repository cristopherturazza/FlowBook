import Link from "next/link";
import { useAuthContext } from "../hooks/useAuthContext";

interface IMenu {
  menuToggle: boolean;
  setMenuToggle: (id: boolean) => void;
}

const Navbar: React.FC<IMenu> = ({ menuToggle, setMenuToggle }) => {
  const { userData } = useAuthContext();

  //TO-DO: Notifiche?

  return (
    <div className="navbar z-10 h-24 bg-darkred shadow-xl text-slate-50">
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
          <ul className="flex text-lg font-semibold">
            <label
              className="btn btn-square btn-ghost"
              onClick={() => setMenuToggle(!menuToggle)}
            >
              {menuToggle ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </label>
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
