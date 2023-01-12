import { Tab } from "@headlessui/react";
import { useState, useMemo } from "react";
import ExchangeReqReceived from "../../components/ExchangeReqReceived";
import ExchangeReqSent from "../../components/ExchangeReqSent";
import type { Exchange } from "../../types/Exchange";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Exchanges: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { userData } = useAuthContext();
  const [trigger, setTrigger] = useState(false);

  // trigger for refetching
  const refetcher = () => {
    setTrigger(!trigger);
  };

  // fetch user exchanges
  const fetchExchanges = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/exchanges/${userData?.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userData?.token}`,
        },
      }
    );
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["exchange", trigger],
    queryFn: () => fetchExchanges(),
    keepPreviousData: true,
  });

  // memo received exchanges
  const memoReceived = useMemo(() => {
    return (
      <div className="bg-slate-50 border border-slate-200 shadow-sm p-4 rounded-xl mt-8">
        <h3 className="font-bold text-xl text-darkblue">Richieste Ricevute</h3>
        <div className="divider"></div>
        {isLoading ? (
          <div className="text-center xl:min-w-[896px] animate-pulse">
            Attendere...
          </div>
        ) : isError || !data.received.length ? (
          <div className="text-center xl:min-w-[896px]">
            Nessuna richiesta ricevuta al momento.
          </div>
        ) : (
          data.received.map((req: Exchange) => (
            <ExchangeReqReceived
              key={req._id}
              id={req._id}
              cover={req.book.cover}
              title={req.book.title}
              date={req.createdAt}
              user={req.sender.fullname}
              status={req.status}
              trigger={refetcher}
            />
          ))
        )}
      </div>
    );
  }, [data]);

  // memo sent exchanges
  const memoSent = useMemo(() => {
    return (
      <div className="bg-slate-50 border border-slate-200 shadow-sm p-4 rounded-xl mt-8">
        <h3 className="font-bold text-xl text-darkblue">Richieste Inviate</h3>
        <div className="divider"></div>
        {isLoading ? (
          <div className="text-center xl:min-w-[896px] animate-pulse">
            Attendere...
          </div>
        ) : isError || !data.sent.length ? (
          <div className="text-center xl:min-w-[896px]">
            Nessuna richiesta inviata al momento.
          </div>
        ) : (
          data.sent.map((req: Exchange) => (
            <ExchangeReqSent
              key={req._id}
              cover={req.book.cover}
              title={req.book.title}
              date={req.createdAt}
              user={req.receiver.fullname}
              status={req.status}
              replyMessage={req.replyMessage}
              userEmail={req.receiver.email}
            />
          ))
        )}
      </div>
    );
  }, [data]);

  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-5xl xl:text-7xl font-black text-center mt-12 text-darkblue tracking-tighter">
        {" "}
        I tuoi scambi{" "}
      </h1>
      <div className="my-12 mx-6 max-w-4xl ">
        <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
          <Tab.List
            className={
              "bg-lightblue/30 p-2 border border-slate-300 flex rounded-xl space-x-4 shadow-sm text-slate-500 font-semibold text-lg"
            }
          >
            <Tab
              className={`px-6 py-4 flex-1 rounded-lg ${
                tabIndex === 0
                  ? "bg-slate-50 border border-slate-100 text-darkblue"
                  : "bg-none"
              }`}
            >
              Richieste Ricevute
            </Tab>
            <Tab
              className={`px-6 py-4 flex-1 rounded-lg ${
                tabIndex === 1
                  ? "bg-slate-50 border border-slate-100 text-darkblue"
                  : "bg-none"
              }`}
            >
              Richieste Inviate
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>{memoReceived}</Tab.Panel>
            <Tab.Panel>{memoSent}</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Exchanges;
