import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <div className="overscroll-x-contain overflow-x-hidden flex h-screen bg-fifth flex-1 flex-col justify-center items-center mt-14 px-6 py-12 lg:px-8">
        <Image
          src="/log.png"
          alt="Mi imagen"
          layout="fixed"
          width={400}
          height={400}
          className="absolute -bottom-20 -left-12 z-5 "
        />

        <Image
          src="/logi.png"
          alt="Mi imagen"
          layout="fixed"
          width={300}
          height={300}
          className="absolute top-16 -right-1 z-5 "
        />

        <div className="bg-primary_light z-30 shadow-md rounded-md p-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-start text-2xl font-titulo font-bold leading-9 tracking-tight ">
              Inicio de Sesión Fallido: 
            </h2>
          </div>

          <div className="flex flex-row items-center gap-2 ">
            <h3 className="text-red">Usuario no autorizado </h3>
          </div>

          <div className="flex mt-4 flex-row items-center gap-2 ">
            <p className="font-subtitulo font-light text-xs">Si usted es un medico, asegurese de estar verificado en el sistema. Intente denuevo más tarde.</p>
          </div>
          
          <div className="flex mt-4 flex-row items-center gap-2 ">
            <p className="text-xs font-semibold  ">Si el problema persiste contactenos</p>
          </div>  
          <div>
          </div>
        </div>
      </div>
    </>
  );
}