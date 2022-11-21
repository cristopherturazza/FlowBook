import { useAuthContext } from "../../hooks/useAuthContext";
import NotLoggedIn from "../../components/NotLoggedIn";

const Dashboard: React.FC = () => {
  const { userData } = useAuthContext();
  return (
    <div className="flex flex-col items-center ">
      {userData?.isLoggedIn ? (
        <div className="flex flex-col items-center ">
          <h3 className="text-7xl font-black mt-12 text-darkblue tracking-tighter">
            {" "}
            Esplora il flusso{" "}
          </h3>
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default Dashboard;
