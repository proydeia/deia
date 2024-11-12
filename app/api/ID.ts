import { TableExpression } from "kysely";
import db, { DatabaseType } from "../lib/dbSchema/schema";
const { v4: uuidv4 } = require('uuid');

// ID

export async function uuid (table: TableExpression <DatabaseType, keyof DatabaseType>): Promise <string> {
    try{
        // const idList = await db //obtiene todos los IDs de la tabla
        // .selectFrom(table)
        // .select("id")
        // .execute();        
        
        // let uuid = uuidv4();
        // while(idList.some((element) => element.id === uuid)){ //checkea que el id no exista en la base de datos; si existe, genera otro.
        //     uuid = uuidv4();
        // }
        return "3";
    }
    catch(e){
        throw new Error("E");
    }
};