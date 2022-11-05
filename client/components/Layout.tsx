import Navbar from "./Navbar";
import Footer from "./Footer";
import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-sand text-slate-700">
      <div className="flex flex-col pb-24 ">
        <Navbar />
        {children}
      </div>
      <div className="absolute bottom-0 w-full h-24">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
