import Link from "next/link";
import { useLogout } from "../hooks/useLogout";

interface IMenu {
  menuToggle: boolean;
  setMenuToggle: (id: boolean) => void;
}

const Sidebar: React.FC<IMenu> = ({ menuToggle, setMenuToggle }) => {
  const { logout } = useLogout();
  return (
    <ul className="mt-4 font-semibold text-lg z-50">
      <Link href="/user/dashboard" onClick={() => setMenuToggle(!menuToggle)}>
        <li className="flex py-3 pl-3 pr-12 items-center rounded-lg cursor-pointer btn-ghost active:bg-lightblue transition-all duration-100 ease-in-out select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          Cerca nel flusso
        </li>
      </Link>
      <Link href="/user/your-books" onClick={() => setMenuToggle(!menuToggle)}>
        <li className="flex py-3 pl-3 pr-12 items-center rounded-lg cursor-pointer btn-ghost active:bg-lightblue transition-all duration-100 ease-in-out select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
          I tuoi libri
        </li>
      </Link>
      <Link
        href="/user/your-exchange"
        onClick={() => setMenuToggle(!menuToggle)}
      >
        <li className="flex py-3 pl-3 pr-12 rounded-lg items-center cursor-pointer btn-ghost active:bg-lightblue transition-all duration-100 ease-in-out select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
          </svg>
          I tuoi scambi
        </li>
      </Link>
      <Link
        href="/user/your-account"
        onClick={() => setMenuToggle(!menuToggle)}
      >
        <li className="flex py-3 pl-3 pr-12 rounded-lg items-center cursor-pointer btn-ghost active:bg-lightblue transition-all duration-100 ease-in-out select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          Il tuo profilo
        </li>
      </Link>
      <li
        className="flex py-3 pl-3 pr-12 rounded-lg items-center cursor-pointer btn-ghost active:bg-lightblue transition-all duration-100 ease-in-out select-none"
        onClick={() => {
          setMenuToggle(!menuToggle);
          logout();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 mr-2 items-center"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
          />
        </svg>
        Logout
      </li>
    </ul>
  );
};

export default Sidebar;
