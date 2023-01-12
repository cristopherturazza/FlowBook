import Link from "next/link";
import Image from "next/image";
import bookSharing from "../public/booksharing.jpg";
import iconOnu12 from "../public/ONU12.jpg";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col items-center w-full bg-[url('/bookhero.jpg')]">
        <h1 className="font-black text-6xl xl:text-9xl tracking-tighter text-sand mt-24 drop-shadow-xl">
          FlowBook
        </h1>
        <p className="text-sand font-serif mt-4 text-xl xl:text-3xl max-w-[50vw] text-center drop-shadow-lg">
          Partecipa al flusso e scambia libri usati con altri appassionati di
          lettura intorno a te
        </p>
        <div className="flex flex-col xl:flex-row xl:justify-center xl:w-full my-16">
          <Link
            href="/login"
            className="my-8 btn btn-lg bg-scarletred text-sand hover:bg-darkred"
          >
            Accedi
          </Link>
          <Link
            href="/signup"
            className="my-8 xl:ml-8 btn btn-lg bg-darkblue hover:bg-lightblue text-slate-50"
          >
            Registrati
          </Link>
        </div>
      </div>
      <div className="xl:grid xl:grid-cols-2 my-20 mx-20 xl:mx-32">
        <div>
          <Image
            src={bookSharing}
            alt="Scambiamo libri!"
            width={600}
            height={600}
            placeholder="blur"
            className="rounded-lg"
          ></Image>
        </div>
        <div className="xl:ml-12">
          <h3 className="mt-8 xl:mt-0 text-5xl font-black text-darkblue tracking-tighter">
            È sociale, è sostenibile.
          </h3>
          <p className="font-semibold font-serif text-xl italic mt-4">
            Un libro è per sempre, il proprietario{" "}
            <span className="font-black">no</span>.
          </p>
          <p className="font-serif text-lg leading-relaxed">
            <br />
            Scegli i libri che sei disposto a scambiare e mettiti in contatto
            con tanti appassionati di lettura come te. <br /> Un flusso costante
            e sostenibile di cultura, alimentalo con noi.
          </p>
          <div className="flex flex-col-reverse xl:flex-row justify-between items-center font-serif text-lg mt-6">
            <a
              target="_blank"
              href="https://unric.org/it/obiettivo-12-garantire-modelli-sostenibili-di-produzione-e-di-consumo/"
            >
              <Image
                src={iconOnu12}
                alt={"ONU - Agenda 2030"}
                width={160}
                height={160}
                className="my-8 xl:my-4"
              ></Image>
            </a>
            <p className="xl:ml-4">
              Ispirato dall'obiettivo numero 12 dell'Agenda 2030 ONU: Garantire
              modelli sostenibili di produzione e di consumo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
