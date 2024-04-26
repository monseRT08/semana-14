"use server"

import { createClient } from "@/utils/supabase/client";

const getCatsById = async(id) =>{
    const supabase = createClient()

    const { data } = await supabase
    .from('michis')
    .select('*')
    .eq('id', `${id}`)

    return data
}


const updateDbCats = async (id, updateCats) =>{
    const supabase = createClient()

    const {data,error} = await supabase
    .from('michis')
    .update({
        raza: updateCats.raza,
        color: updateCats.color,
        edad: updateCats.edad,
        tamano: updateCats.tamano
    })
    .eq( 'id', id)

    return { status: 200, cats: data }
}

export { getCatsById, updateDbCats  }