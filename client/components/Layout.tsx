import { PropsWithChildren, useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import NotLoggedIn from "./NotLoggedIn";
import axios from "axios";
import { useLogout } from "../hooks/useLogout";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [menuToggle, setMenuToggle] = useState(false);
  const { userData } = useAuthContext();
  const [userAlert, setUserAlert] = useState(false);
  const router = useRouter();
  const { logout } = useLogout();

  // Check if token is expired at every route change

  useEffect(() => {
    const checkJWT = async () => {
      try {
        const check = await axios.get(
          `${process.env.NEXT_PUBLIC_API_PATH}/api/users/${userData?.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${userData?.token}`,
            },
          }
        );
      } catch (err: any) {
        err.response.status ? logout() : null;
      }
    };
    userData?.id ? checkJWT() : null;
  }, [router.asPath]);

  // sync alert status

  useEffect(() => {
    const alert = async () => {
      const fetch = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/api/users/alert/${userData?.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );
      setUserAlert(fetch.data);
    };
    userData?.id ? alert() : null;
  }, [userData?.id]);

  const resetAlert = async () => {
    const reset = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/users/alert/reset/${userData?.id}`,
      { dummy: "empty" },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userData?.token}`,
        },
      }
    );

    setUserAlert(false);
  };

  return (
    <div className="relative min-h-screen bg-sand text-slate-700 overflow-hidden">
      <div className="flex flex-col relative pb-24">
        <Navbar
          menuToggle={menuToggle}
          setMenuToggle={setMenuToggle}
          userAlert={userAlert}
          resetAlert={resetAlert}
        />

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
          <Sidebar
            menuToggle={menuToggle}
            setMenuToggle={setMenuToggle}
            userAlert={userAlert}
            resetAlert={resetAlert}
          />
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-24">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
