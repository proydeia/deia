"use server"
const axios = require('axios');
import { spirometryFormSchema, spirometryState } from "@/app/lib/formsDefinitions/spirometryFormDefinition";
import db, { newSpirometry, Spirometry } from "@/app/lib/dbSchema/schema";
import { uuid } from "../ID";
import { userData } from "../auth/userData";

axios.defaults.withCredentials = true
const URL = process.env.URL

// Datos del input medico

type spirometryInput = {
    id:         string;
    peso:       number;
    sexo:       number;
    altura:     number;
    nacimiento: Date;
    fev1:       number;
    fev1_lln:   number;
    fvc:        number;
    fvc_lln:    number;
}

// Espirometrias

export async function getSpirometryList (patientId: string): Promise < Spirometry[] > {
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');

    try{
        const spirometryTable = await db
        .selectFrom("spirometryTable")
        .where("spirometryTable.patient", "=", patientId)  
        .selectAll()
        .execute();
        return spirometryTable;
    }
    catch(error:unknown){
        throw new Error('D')
    }
}

export async function getSpirometry (spirometryId: string): Promise < Spirometry > {
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');
    
    try{
        const spirometry = await db 
        .selectFrom("spirometryTable")
        .where("spirometryTable.id", "=", spirometryId)
        .selectAll()
        .executeTakeFirstOrThrow();
        return spirometry;
    }
    catch(error:unknown){
        throw new Error("D");
    }
}

export async function deleteSpirometry(spirometryId: string) {
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');

    try{
        await db
        .deleteFrom("spirometryTable")
        .where("spirometryTable.id", "=", spirometryId)
        .executeTakeFirstOrThrow();
        return
    }
    catch(error:unknown){
        throw new Error('D');
    }
}

export async function createSpirometry(state: spirometryState, formData: FormData): Promise<spirometryState> {
    const validatedFields = spirometryFormSchema.safeParse({
        id:         formData.get('id'),
        sexo:       Number(formData.get('sexo')),
        altura:     Number(formData.get('altura')),
        peso:       Number(formData.get('peso')),
        nacimiento: new Date(formData.get('nacimiento') as string),
        fev1:       Number(formData.get('fev1')),
        fev1_lln:   Number(formData.get('fev1_lln')),
        fvc:        Number(formData.get('fvc')),
        fvc_lln:    Number(formData.get('fvc_lln')),
    });

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        };
    };

    const user = await userData();
    if (!user || user.adm) throw new Error('U');

    try{
        await loadSpirometry(validatedFields.data);
        return {
            message:'Registro creado con exito'
        };
    }
    catch(error:unknown){
        console.log(error);
        return {
            message: 'Error al generar registro. Intente nuevamente.'
        };
    }
}

async function loadSpirometry(data:spirometryInput){
    try{
        const spirometryData = {
            fev1:       data.fev1,
            fev1pred:   -1,
            fvc:        data.fvc,
            fvcpred:    -1,
        }
    
        const spirometryDataAi = {
            ...spirometryData, 
            sexo:       data.sexo, 
            edad:       calculateAge(data.nacimiento),
            altura:     data.altura,
            peso:       -1,
        };
        
        const obstruction:number = await axios.post(`${URL}/obstructiongold`, spirometryData)
        .then((res:any) => {
            if(res.data.result === -1) throw new Error('Render 500');
            return res.data.result;
        })
        .catch((error:unknown) => {
            throw new Error('O');
        })
        
        const obstructionAi:number = await axios.post(`${URL}/obstructionaigold`, spirometryDataAi)
        .then((res:any) => {
            if(res.data.result === -1) throw new Error('Render 500');
            return res.data.result;
        })
        .catch((error:unknown) => {
            throw new Error('Oia');
        })
        
        const restriction:number = await axios.post(`${URL}/restrictiongold`, spirometryData)
        .then((res:any) => {
            if(res.data.result === -1) throw new Error('Render 500');
            return res.data.result;
        })
        .catch((error:unknown) => {
            throw new Error('R');
        })
        
        const restrictionAi:number = await axios.post(`${URL}/restrictionaigold`, spirometryDataAi)
        .then((res:any) => {
            if(res.data.result === -1) throw new Error('Render 500');
            return res.data.result;
        })
        .catch((error:unknown) => {
            throw new Error('Ria');
        })
            
        const spirometryId = await uuid("spirometryTable");	
        
        
        var date = new Date;
        date.setDate(date.getDate() + 1); //no se que le pasa pero me resta un dia. esta fue la mejor soucion un miercoles a las 23:48pm
        
        const spirometry: newSpirometry = {
            patient:        data.id,
            ...spirometryData,
            id:             spirometryId,
            obstruction:    obstruction,
            obstructionai:  obstructionAi,
            restriction:    restriction,
            restrictionai:  restrictionAi,
            date:           date
        }; 
        
        console.log(spirometry);
        
        const spirometryDB: newSpirometry = await db
        .insertInto("spirometryTable")
        .values(spirometry)
        .returningAll()
        .executeTakeFirstOrThrow();
        

        if(spirometryDB instanceof Error)
        {
            deleteSpirometry(spirometryId);
            throw new Error('DB');
        }
    
        return

    }
    catch(error:unknown){
        console.log(error);
        throw new Error('D');
    }
}

function calculateAge(birthdate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }
    return age;
}
