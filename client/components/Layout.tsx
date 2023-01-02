import { PropsWithChildren, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import NotLoggedIn from "./NotLoggedIn";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [menuToggle, setMenuToggle] = useState(false);
  const { userData } = useAuthContext();
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-sand text-slate-700 overflow-hidden">
      <div className="flex flex-col relative pb-24">
        <Navbar menuToggle={menuToggle} setMenuToggle={setMenuToggle} />

        {userData?.isLoggedIn ||
        router.asPath === "/login" ||
        router.asPath === "/signup" ||
        router.asPath === "/" ? (
          <div className="flex justify-center mt-24">{children}</div>
        ) : (
          <div className="flex flex-col items-center mt-24">
            <NotLoggedIn />
          </div>
        )}

        <div
          className={`sidebar ${
            !menuToggle ? "translate-x-full" : "translate-x-0"
          } bg-darkred bg-gradient-to-br from-darkred to-[#5a0000] text-sand z-40 fixed right-0 pl-8 pr-8 pt-28 h-screen ease-in-out duration-300`}
        >
          <Sidebar menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-24">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
