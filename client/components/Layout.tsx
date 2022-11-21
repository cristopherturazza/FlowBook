import { PropsWithChildren, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <div className="relative min-h-screen bg-sand text-slate-700 overflow-hidden">
      <div className="flex flex-col pb-24">
        <Navbar menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
        <div className="flex justify-center">{children}</div>
        <div
          className={`sidebar ${
            menuToggle ? "translate-x-full" : "translate-x-0"
          } bg-darkred bg-gradient-to-br from-darkred to-[#5a0000] text-sand fixed right-0 pl-8 pr-8 pt-28 h-screen ease-in-out duration-300`}
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
