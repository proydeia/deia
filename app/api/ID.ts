import { TableExpression } from "kysely";
import db, { DatabaseType } from "../lib/dbSchema/schema";
const { v4: uuidv4 } = require('uuid');

// ID

export async function uuid (table: TableExpression <DatabaseType, keyof DatabaseType>): Promise <string> { //genera un UUID único.
    try{

        let uuid = uuidv4(); //genera un UUID

        const idList = await db //obtiene todos los IDs de la tabla
        .selectFrom(table)
        .select("id")
        .execute();        
        
        while(idList.some((element) => element.id === uuid)){ //checkea que el id no exista en la base de datos; si existe, genera otro.
            uuid = uuidv4();
        }

        return uuid;
    }
    catch(e){
        throw new Error("E");
    }
};