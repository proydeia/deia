export default function Id_paciente() {
  return (
    <main className="w-11/12 flex flex-col justify-center items-center bg-primary_light py-4 rounded-sm">
      <div className="sm:w-11/12 flex flex-col w-full overflow-y-auto h-96 gap-6">
        <div className=" w-full bg-primary flex  justify-center items-center rounded-md">
          <div className="w-full  p-4  my-2">
            <h1 className="text-2xl font-bold text-left">
              Información del Paciente
            </h1>
            <h2>Nombre:</h2>
            <h2>Apellido:</h2>
            <h2>DNI:</h2>
            <h2>Fecha de Naciemiento:</h2>
            <h2>Sexo Biológico:</h2>
            <h2>Peso:</h2>
            <h2>Altura:</h2>
          </div>
        </div>
        <div className=" w-full bg-primary flex  justify-center items-center rounded-sm">
          <div className="w-full px-4 py-2  my-2">
            <h1 className="text-2xl font-bold text-left">
              Información Adicional
            </h1>
            <h2>Patología:</h2>
          </div>
        </div>
        <div className="w-full min-h-64 bg-primary flex flex-col justify-center items-center rounded-sm">
          <div className="w-full p-4  my-2">
            <h1 className="text-2xl font-bold text-left">
              Historial de Espirometrías
            </h1>
          </div>
          <div className="flex flex-row w-full h-full">
            <div className="w-1/2  bg-third m-2 rounded-sm">Imagen espirometria</div>
            <div className="w-1/2 m-2">
              <p>Fecha:</p>
              <p>Resultado:</p>
              <p>Datos:</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
