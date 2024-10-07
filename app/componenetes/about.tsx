export default function About() {
  return (
    <div className="bg-white w-full md:w-11/12  p-8 rounded-sm flex flex-col items-center justify-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-center  w-full mb-4 mt-8">
        Sobre Nosotros
      </h1>
      <div>
        <h2 className="text-xl text-center">Somos un grupo de estudiantes de quinto año del Colegio ORT que hemos desarrollado una plataforma de inteligencia artificial como proyecto final. Nuestro objetivo es continuar trabajando en este proyecto y llevarlo más allá de las aulas.</h2>
      </div>

      <div className="flex flex-row items-center justify-evenly m-8 gap-4 lg:gap-8">
        <div className="flex flex-col bg-primary p-4 sm:p-8  w-1/5 h-80 items-start justify-center ">
          <div className=" bg-secondary  h-40 w-full">Imagen</div>
          <p className=" py-2 sm:py-2 px-2 text-center font-bold text-md sm:text-xl ">
            Julieta Guerson
          </p>
          <p className="text-sm text-center">Desarrollo Front-End</p>
        </div>
        <div className="flex flex-col bg-primary p-4 sm:p-8 w-1/5 h-80  items-center justify-center ">
          <div className="bg-secondary  h-40 w-full">Imagen</div>
          <p className="py-2 sm:py-2 px-2 text-center font-bold text-md sm:text-xl">
            Tomás Gorodetsky
          </p>
            <p className="text-sm text-center">Desarrollador IA</p>
        </div>
        <div className="flex flex-col bg-primary p-4 sm:p-8 w-1/5 h-80  items-center justify-center ">
          <div className="bg-secondary  h-40 w-full">Imagen</div>
          <p className=" py-2 sm:py-2 px-2 text-center font-bold text-md sm:text-xl">
            Benjamín de Bárbara
          </p>
          <p className="text-sm text-center">Desarrollo Back-End</p>
        </div>
        <div className="flex flex-col bg-primary p-4 sm:p-8 w-1/5 h-80  items-center justify-center ">
          <div className="bg-secondary  h-40 w-full">Imagen</div>
          <p className=" py-2 sm:py-2 px-2 text-center font-bold text-md sm:text-xl">
            Abril Erlijman
          </p>
          <p className="text-sm text-center">Diseño UX/UI</p>
        </div>
      </div>
    </div>
  );
}
