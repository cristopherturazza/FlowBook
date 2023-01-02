import { Tab } from "@headlessui/react";
import { useState } from "react";

const Exchanges: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-5xl xl:text-7xl font-black text-center mt-12 text-darkblue tracking-tighter">
        {" "}
        I tuoi scambi{" "}
      </h1>
      <div className="mt-12">
        <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
          <Tab.List
            className={
              "bg-lightblue/30 p-2 border border-slate-300 flex rounded-xl space-x-4 shadow-sm text-slate-500 font-semibold text-lg"
            }
          >
            <Tab
              className={`px-6 py-4 rounded-lg ${
                tabIndex === 0
                  ? "bg-slate-50 border border-slate-100 text-darkblue"
                  : "bg-none"
              }`}
            >
              Richieste Ricevute
            </Tab>
            <Tab
              className={`px-6 py-4 rounded-lg ${
                tabIndex === 1
                  ? "bg-slate-50 border border-slate-100 text-darkblue"
                  : "bg-none"
              }`}
            >
              Richieste Inviate
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="bg-slate-50 border border-slate-200 shadow-sm p-4 rounded-xl mt-8">
                <h3 className="font-bold text-xl text-darkblue">
                  Richieste Ricevute
                </h3>
                <div className="divider"></div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="bg-slate-50 border border-slate-200 shadow-sm p-4 rounded-xl mt-8">
                <h3 className="font-bold text-xl text-darkblue">
                  Richieste Inviate
                </h3>
                <div className="divider"></div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Exchanges;
