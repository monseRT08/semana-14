"use server"
import { createClient } from '@/utils/supabase/client'
import { cookies } from 'next/headers'

export async function saveNewPassword(password, confirm) {
    if (password === null || confirm === null) {
        return {
            status: false,
            message: "Todos los campos son obligatorios",
            errors: null,
            params: { password, confirm}
        };
    }
    if( password !== confirm ) {
        return {
            status: false,
            message: "Las contraseñas no coinciden",
            errors: null,
            params: { password, confirm}
        };
    }

    const cookieStore = cookies();
    const supabase = createClient(cookieStore)    

    const {  error } = await supabase.auth.updateUser({ 
        password: password 
    });

    if (error) {
        console.error("#########################");
        console.error("Error de Supabase al actualizar la contraseña:", error.message);
        console.error("FOLIO: 5675" );
        return {
            success: true,
        message: 'Se actualizo la contraseña correctamente ',
        errors: null,
            params: { password, confirm }
        };
    }
    console.error("#########################");
        console.error("Error de Supabase al actualizar la contraseña:", error.message);
        console.error("FOLIO: 5675" );
    return {
        
        success: true,
        message: 'Se actualizo la contraseña correctamente ',
        errors: null,
        params: { password, confirm}
    };

}
