import db, { Spirometry } from "@/app/lib/dbSchema/schema";
import { readFileSync, writeFileSync } from 'fs';

export async function writeJSON() {
    try{     

        const enjsonFalse: Spirometry[] = await db // Get all enjson false spirometrues
        .selectFrom("spirometries")
        .selectAll()
        .where("spirometries.enjson", "=", 0)
        .execute();

        await db //set all enjson false (0) to true (1)
        .updateTable("spirometries")
        .set({enjson: 1})
        .where("spirometries.enjson", "=", 0)
        .execute();

        const oldDatadump: any = readFileSync('./ds/datadump.json', 'utf8');
        let newDatadump: any = {};

        const dataPromise =  enjsonFalse.map(async (spirometry:Spirometry) => {
            const { patient, date, id, ...filteredSpirometry} = spirometry;
            const extraInfo = await db
            .selectFrom("patients")
            .select(["extrainfo"])
            .where("patients.id", "=", spirometry.patient)
            .executeTakeFirstOrThrow();
            
            newDatadump[spirometry.id] = {
                ...filteredSpirometry, 
                "notasextra": extraInfo.extrainfo, 
                "fuma": -1,
                "edad": -1,
                "sexo": -1,
                "altura": -1,
                "peso": -1,
            };
        })

        await Promise.all(dataPromise).then(() => {
            newDatadump = {...JSON.parse(oldDatadump), ...newDatadump};
            writeFileSync('./ds/datadump.json', JSON.stringify(newDatadump, null, 2));
        });
    }

    catch(error:unknown){
        console.log(error)
        throw new Error;
    }
}