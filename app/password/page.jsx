"use client"
import  { useState,useEffect } from 'react'
import { saveNewPassword } from './action'


export default function changePassword() {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errors, setErrors] = useState({});


    const savePassword = (form) => {

        form.preventDefault();
        let errorList = {}
    
        if (!password) {
            errorList.password = "Se necesita una Contraseña";
        }
        else if (password.length < 8) {
            errorList.password = "Su password debe tener minimo 8 carácteres";
        }else if (password != confirm) {
            errorList.confirm = "Las Contraseñas no coinciden";
        }

        if (!confirm) {
            errorList.confirm = "Se necesita una Contraseña";
        }
        else if (confirm.length < 8) {
            errorList.confirm = "Su password debe tener minimo 8 carácteres";
        }else if (confirm != password) {
            errorList.confirm = "Las Contraseñas no coinciden";
        }
      
        if (Object.keys(errorList).length > 0) {
            setErrors(errorList);
            return;
        }

        saveNewPassword( password , confirm).then( (result) => {
            console.log(result);
            alert(result.message);
        }).catch ((error) =>{
            console.log(error);
            alert(error.message)
        });
       
    }//fin del savePassword

   
    return (
        <  >

         <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 ">       
         <h2 className=" text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center ">Cambiar Contraseña</h2>
            <form 
                onSubmit={savePassword} 
                className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground " >
                  
                <div  className='flex flex-col gap-2 p-1  '>
                    <label  className="text-md" > Contraseña</label>
                    <input 
                    name="password"  
                    type="password" 
                    placeholder='Nueva Contraseña'
                    value={password}
                    onChange={(e) =>{
                        setPassword(e.target.value);
                        setErrors({
                            ...errors,
                            password: ''
                        });
                    }}  
                    
                    className={`rounded-md px-4 py-2 bg-inherit border mb-6 `} />
                    <p className='text-rose-600'>{errors.password}</p>

                    <label className="text-md"> Nueva Contraseña</label>
                    <input  
                    name="confirm"
                    type="password"
                    value={confirm}
                    onChange={(e) =>{
                        setConfirm(e.target.value);
                        setErrors({
                            ...errors,
                            confirm: ''
                        });
                    }} 
                     
                    className='rounded-md px-4 py-2 bg-inherit border mb-6' />
                    <p className='text-rose-600'>{errors.confirm}</p>


                    
                    <button type="submit" 
                    className='bg-green-700 rounded-md px-4 py-2 text-foreground mb-2'>
                        Cambiar Contraseña
                    </button>
                </div>


            </form>
         </div>
        </>
    )
}



