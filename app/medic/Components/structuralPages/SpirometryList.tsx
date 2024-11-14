import { Spirometry } from "@/app/lib/dbSchema/schema";

interface SpirometryListProps {
  spirometries: Spirometry[];
  onVerMas: (id: number) => void;
}

const VerMasButton = ({ Id, Espiro_id }: { Id: string; Espiro_id: (id: number) => void }) => {
  return (
    <button
      className="bg-primary_light rounded-sm h-11/12 p-2 ml-auto"
      onClick={() => Espiro_id(Number(Id))}
    >
      Ver Mas
    </button>
  );
};

export default function SpirometryList({ spirometries, onVerMas }: SpirometryListProps) {
  return (
    <>
      <div className="flex flex-row flex-direction-row-reverse justify-between bg-secondary  w-full ">
        

      </div>
      {spirometries.map((spirometry) => (
        <div
          className="bg-primary rounded-lg shadow-md mt-1 mb-1 px-4 py-2 w-11/12 flex flex-row items-center "
          key={spirometry.id}
        >
          <div className="flex-grow max-h-10 flex-row">
            <p>Fecha: {new Date(spirometry.date).toDateString()}</p>
            <p>
              {spirometry.obstruction >= 0 && spirometry.restriction <= 0 ? (
                `Obstrucción: ${spirometry.obstruction}`
              ) : spirometry.restriction >= 0 && spirometry.obstruction <= 0 ? (
                `Restricción: ${spirometry.restriction}`
              ) : (
                "No hay obstrucción ni restricción"
              )}
            </p>
          </div>
          <VerMasButton Id={spirometry.id.toString()} Espiro_id={onVerMas} />
        </div>
      ))}
    </>
  );
}