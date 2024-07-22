import FormButton from "./form_button";

// const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       miFunc(name, extraInfo);
//     } catch (error) {}
//   };
//                                                      AGREGAR LUEGO LOS DATOS DE LAS ESPIROMETRIAS

export default function AgregarEspiro() {
  return (
    <main className="h-full flex flex-col justify-center items-center w-11/12 ">
      <p className="text-2xl sm:text-3xl font-bold text-left text-primary_light w-full mb-4 mt-4">
        Agregar Espirometría
      </p>
      <form
        // onSubmit={handleSubmit}
        className="w-10/12 sm:w-full bg-primary_light rounded-sm flex flex-col justify-center items-center gap-4 overflow-y-auto"
      >
        <label className="w-11/12">
          <h1 className="text-sm font-light text-third mt-8">
            Nombre del Paciente
          </h1>
          <input
            type="text"
            id="nombre"
            className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
          />
        </label>
        <div className="grid-cols-2 grid w-11/12 gap-2 justify-center ">
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">FEV1</h1>
              <input
                type="number"
                id="fev1"
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
            </label>
          </div>
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">FEV1 LLN</h1>
              <input
                type="number"
                id="fev1L"
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
            </label>
          </div>
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">FVC</h1>
              <input
                type="number"
                id="fvc"
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
            </label>
          </div>
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">FVC LLN</h1>
              <input
                type="number"
                id="fvcL"
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
            </label>
          </div>
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">OBS med</h1>
              <input
                type="number"
                id="obs"
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
            </label>
          </div>
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">RES med</h1>
              <input
                type="number"
                id="res"
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
            </label>
          </div>
        </div>
        <label className="w-11/12">
          <h1 className="text-sm font-light text-third">Información Extra</h1>
          <input
            type="text"
            id="extraI"
            className="px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
          />
        </label>
        <FormButton />
      </form>
    </main>
  );
}
