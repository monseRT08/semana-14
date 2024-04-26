"use server"

import { createClient } from "@/utils/supabase/client";
import { revalidatePath } from 'next/cache'
const supabase = createClient()
const sendData = async (formData) =>{
    const {raza,color,edad,tamano} = Object.fromEntries(formData.entries());

    if (raza === null || color === null || edad === null ||tamano === null) {
        return{
            status: false,
            message: "Agrega los valores",
            errors: null,
            params: { raza,color,edad,tamano}
        };
    }

    try {

        const { error } = await supabase.from('michis').insert([ {raza,color,edad,tamano}]).select();

        if (error) {
            return{
                status: false,
                message: "Hubo un error",
                errors: null,
                params: { raza,color,edad,tamano}
            }
        }

        revalidatePath('/agregaCats');

        return{
            status: true,
            message: "Registro de gato exitoso",
            errors: null,
            params: { raza,color,edad,tamano}
        };
    } catch (error) {
        return{
            status: false,
            message: "Hubo un error",
            errors: null,
            params: { raza,color,edad,tamano}
        };
    }

    
}

const catsList = async () => {
    const supabase = createClient();
    const {data,error} = await supabase.from('michis').select()
    return{
        michis:data,
        error,
    }
}
const searchCats = async (search) => {
    const supabase = createClient()
    const {data, error} = await supabase.from('michis').select("*").ilike("raza",`%${search}%` );
    console.log(error);
    return data;
}




export {catsList,searchCats,sendData}