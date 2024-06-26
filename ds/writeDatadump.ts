import db, { Spirometry } from "@/app/lib/db/schema";

export async function writeJSON() {
    try{        
        const enjsonFalse: Spirometry[] = await db // Get all enjson false spirometrues
        .selectFrom("spirometries")
        .selectAll()
        .where("spirometries.enjson", "=", 0)
        .execute();

        const datadump: any = require('./datadump.json');

        const dataPromise =  enjsonFalse.map(async (spirometry:Spirometry) => {
            const { patient, date, id, ...filteredSpirometry} = spirometry;
            const extraInfo = await db
            .selectFrom("patients")
            .select(["extrainfo"])
            .where("patients.id", "=", spirometry.patient)
            .executeTakeFirstOrThrow();

            datadump[spirometry.id] = {
                ...filteredSpirometry, 
                "notasextra": extraInfo.extrainfo, 
                "fuma": -1,
                "edad": -1,
                "sexo": -1,
                "altura": -1,
                "peso": -1,
            };
        })

        await Promise.all(dataPromise);

        console.log(JSON.stringify(datadump));

        return;
    }

    catch(error:unknown){
        throw new Error (JSON.stringify(error));
    }
}