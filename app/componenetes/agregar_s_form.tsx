import FormButton from "./form_button";

export default function AgregarEspiro() {
  return (
    <main>
      <form className="w-10/12 sm:w-full bg-primary_light h-3/4 rounded-sm flex flex-col justify-center items-center gap-4">
        <label className="flex flex-col grid-cols-2 gap-2">
          <h1 className="text-sm font-light text-third">
            Valores Espirometría
          </h1>
          <div className="flex flex-col gap-2 sm:flex-row items-center justify-center">
            <input
              className="px-3 rounded-md py-2 w-full sm:w-1/2"
              placeholder="Valor 1"
            />
            <input
              className="px-3 rounded-md py-2 w-full sm:w-1/2"
              placeholder="Valor 2"
            />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row items-center justify-center">
            <input
              className="px-3 rounded-md py-2 w-full sm:w-1/2"
              placeholder="Valor 3"
            />
            <input
              className="px-3 rounded-md py-2 w-full sm:w-1/2"
              placeholder="Valor 4"
            />
          </div>
        </label>
        <FormButton />
      </form>
    </main>
  );
}
