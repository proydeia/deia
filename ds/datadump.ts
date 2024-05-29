import db, { Spirometry } from "@/app/lib/db/schema";

export async function spirometriesModel(): Promise< {} > {
    try{        
        const enjsonFalse: Spirometry[] = await db // Get all enjson false spirometrues
        .selectFrom("spirometries")
        .selectAll()
        .where("spirometries.enjson", "=", 0)
        .execute();

        let dataDump = {};

        const dataPromise =  enjsonFalse.map(async (spirometry:Spirometry) => {
            const { patient, date, id, ...filteredSpirometry} = spirometry;
            const extraInfo = await db
            .selectFrom("patients")
            .select(["extrainfo"])
            .where("patients.id", "=", spirometry.patient)
            .executeTakeFirstOrThrow();

            dataDump = {
                ...dataDump, 
                [spirometry.id]: {
                    ...filteredSpirometry, 
                    notasextra: extraInfo, 
                    "fuma": -1,
                    "edad": -1,
                    "sexo": -1,
                    "altura": -1,
                    "peso": -1
                }
            };
        })

        await Promise.all(dataPromise);

        console.log(dataDump)

        return dataDump;
    }

    catch(error:unknown){
        throw new Error (JSON.stringify(error));
    }
}