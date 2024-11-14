
import { Spirometry } from "@/app/lib/dbSchema/schema";

interface SpirometryListProps {
  spirometries: Spirometry[];
  onVerMas: (id: number) => void;
}

const VerMasButton = ({ Id, Espiro_id }: { Id: string; Espiro_id: (id: string) => void }) => {
  return (
    <button
      className="bg-primary_light rounded-sm h-11/12 p-2 ml-auto"
      onClick={() => Espiro_id(Id)}
    >
      Ver Mas
    </button>
  );
};

export default function SpirometryList({ spirometries, onVerMas }: SpirometryListProps) {
  return (
    <>
      {spirometries.map((spirometry) => (
        <div
          className="bg-primary rounded-sm p-4 flex flex-row items-center"
          key={spirometry.id}
        >
          <div className="flex-grow">
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
          {/* <VerMasButton Id={spirometry.id} Espiro_id={onVerMas} /> */}
        </div>
      ))}
    </>
  );
}