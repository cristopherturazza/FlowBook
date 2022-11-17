import Link from "next/link";
import Image from "next/image";
import bookSharing from "../public/booksharing.jpg";
import iconOnu12 from "../public/ONU12.jpg";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col items-center w-full bg-[url('/bookhero.jpg')]">
        <h1 className="font-black text-9xl tracking-tighter text-sand mt-24 drop-shadow-xl">
          FlowBook
        </h1>
        <p className="text-sand font-serif text-3xl max-w-[50vw] text-center drop-shadow-lg">
          Partecipa al flusso e scambia libri usati con altri appassionati di
          lettura intorno a te
        </p>
        <div className="flex justify-center w-full my-16">
          <Link
            href="/login"
            className="my-8 btn btn-sm sm:btn-sm md:btn-md lg:btn-lg bg-sand text-darkblue hover:bg-lightblue"
          >
            Accedi
          </Link>
          <Link
            href="/signup"
            className="my-8 ml-8 btn btn-sm sm:btn-sm md:btn-md lg:btn-lg bg-darkblue hover:bg-lightblue text-slate-50"
          >
            Registrati
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 my-20 mx-32">
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
        <div className="ml-12">
          <h3 className="text-5xl font-black text-darkblue tracking-tighter">
            E' sociale, è sostenibile.
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
          <div className="flex justify-between items-center font-serif text-lg mt-6">
            <a
              target="_blank"
              href="https://unric.org/it/obiettivo-12-garantire-modelli-sostenibili-di-produzione-e-di-consumo/"
            >
              <Image
                src={iconOnu12}
                alt={"ONU - Agenda 2030"}
                width={160}
                height={160}
              ></Image>
            </a>
            <p className="ml-4">
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
