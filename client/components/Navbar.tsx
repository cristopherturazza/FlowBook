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
    <div className="navbar z-50 h-24 bg-darkred shadow-xl text-slate-50">
      <h1 className="navbar-start text-sand px-6 xl:px-16 py-6 font-bold text-2xl xl:text-4xl tracking-tight">
        <Link href={userData?.isLoggedIn ? "/user/dashboard" : "/"}>
          FlowBook
        </Link>
      </h1>
      <div className="navbar-end text-sand pr-4 xl:pr-16">
        {!userData?.isLoggedIn ? (
          <ul className="flex text-lg font-semibold">
            <Link href="/login">
              <li className="flex items-center px-2 xl:px-4 py-2 mx-2 btn-ghost border rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 xl:mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>
                <span className="hidden xl:block">Accedi</span>
              </li>
            </Link>
            <Link href="/signup">
              <li className="flex items-center btn-ghost border px-2 xl:px-4 py-2 mx-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 xl:mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                  />
                </svg>
                <span className="hidden xl:block">Registrati</span>
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
              {!menuToggle ? (
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
