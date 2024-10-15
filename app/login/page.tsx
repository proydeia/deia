import { signIn } from "@/auth";
import Form from "./form";
import Image from "next/image";

export default function LoginPage() {


  return (
    <>

      <div className="overscroll-x-contain overflow-x-hidden flex h-screen bg-fourth flex-1 flex-col justify-center items-center mt-14 px-6 py-12 lg:px-8">
      <Image
            src="/log.png"
            alt="Mi imagen"
            layout="fixed"
            width={400}
            height={400}
            className="absolute -bottom-14 -left-12 z-5 "
          />
      <Image
            src="/logi.png"
            alt="Mi imagen"
            layout="fixed"
            width={300}
            height={300}
            className="absolute top-16 -right-1 z-5 "
          />
        <div className="bg-primary_light shadow-md rounded-md p-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-8 text-start text-2xl font-titulo font-bold leading-9 tracking-tight ">
              Inicio de Sesión
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form></Form>
          </div>
          <div className="flex flex-row items-center gap-2 ">

          <div className="w-1/3 h-[1px] bg-secondary rounded-xl"></div>
          <p className="font-subtitulo font-light text-xs">Registrarme con</p>
          <div className="w-1/3 h-[1px] bg-secondary rounded-xl"></div>
          </div>
          <div>
            <form className="flex items-center justify-center m-5" action={async () => {
              "use server"
              await signIn('google')
            }}
            >
              <button type="submit" className="items-center justify-center gap-2 px-6 flex p-1 bg-white rounded-md hover:bg-custom-vanilla text-custom-black hover:text-custom-blue hover:shadow-custom-pale hover:shadow-sm transform transition-transform duration-200 hover:scale-105">
            <Image
                  src="/GUGEL.png"
                  alt="Mi imagen"
                  layout="fixed"
                  width={20}
                  height={20}
                />
                <span className="py-2 select-none pointer-events-none ">Google</span>
              </button>
            </form>

          </div>
        </div>
      </div>
    </>
  );
}