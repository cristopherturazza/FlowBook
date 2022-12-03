import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col items-center ">
        <h3 className="text-5xl xl:text-7xl font-black text-center mt-12 text-darkblue tracking-tighter">
          {" "}
          Esplora il flusso{" "}
        </h3>
      </div>
    </div>
  );
};

export default Dashboard;
