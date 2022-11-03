import Navbar from "./Navbar";
import Footer from "./Footer";
import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <div className="flex flex-col pb-20">
        <Navbar />
        {children}
      </div>
      <div className="absolute bottom-0 w-full h-20">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
