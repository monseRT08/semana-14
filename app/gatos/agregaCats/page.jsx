"use client"

import { useState, useEffect } from 'react'
import  { sendData } from  '../action'
import { useRouter } from 'next/navigation';





const saveCats = () => {
    const [error, setError] = useState({})
    const [isValid, setIsvalid] =useState(true)
    const [catsData, setCatsData] = useState({
        raza:"",
        color:"",
        edad:"",
        tamano:""        
    })

    const validateData = (form) =>{
        form.preventDefault()
        let errroreCats={}        
        if (!catsData.raza){
            errroreCats.raza = "Ingresa la raza del gato";
        }
        if (!catsData.color){
            errroreCats.color = "Ingresa el color del gato";
        }
        if (!catsData.edad){
            errroreCats.edad = "Ingresa la edad del gato";
        }
        if (!catsData.tamano){
                errroreCats.tamano = "Ingresa el tamoño del gato";
        }

      if(Object.keys(errroreCats).length > 0){
                setError(errroreCats);
                return;
         } 

        sendCatsData()
    }

    const chaeckValue = (value) => {
        return (value.trim() != '' || /^[a-z0-9]+$/i.test(value));
    }


    const sendCatsData= async () => {
       try {
        const formData = new FormData();
        formData.append('raza',catsData.raza);
        formData.append('color',catsData.color);
        formData.append('edad',catsData.edad);
        formData.append('tamano',catsData.tamano);
        console.log(formData)
        const response = await sendData(formData);
        if (response.status) {
            alert("Se Agrego el gato")
            console.log("El gato se envio de forma exitosa ",response.message);
            setError(response.errors ||{});
            
        }
       } catch (error) {
        
        console.error("hubo un error ", error.message);

       }
      
    };

    const setValueToState = (event) => {
        const { name, value } = event.target;

        let valueToCheck = chaeckValue(value);

        if (valueToCheck) {
            setIsvalid(true);
            setCatsData(data => ({
                ...data,
                [name]: value,
            }));
        } else {
            setIsvalid(false);
        }

    }

    return(
        <    >
        <h2 className='pt-5 pb-4 text-xl'>Agrega tu gato</h2>
        <form onSubmit={validateData} >
        <div className='flex flex-col gap-3 '>
            <label htmlFor="raza">Raza</label>
            <input type="text" value={catsData.raza} onChange={setValueToState} name="raza"  className={`rounded-md p-2 border text-black `}  />
            <p className='text-rose-600'>{error.raza}</p>

            <label htmlFor="color">color</label>
            <input type="text" value={catsData.color} onChange={setValueToState} name="color" className='rounded-md p-2 border text-black' />
            <p className='text-rose-600'>{error.color}</p>

            <label htmlFor="edad">edad</label>
            <input type="text" value={catsData.edad} onChange={setValueToState} name="edad" className='rounded-md p-2 border text-black'/>
            <p className='text-rose-600'>{error.edad}</p>

            <label htmlFor="tamano">tamano</label>
            <input type="text" value={catsData.tamano} onChange={setValueToState} name="tamano" className='rounded-md p-2 border text-black'/>
            <p className='text-rose-600'>{error.tamano}</p>

            <button type="submit" className='p-2 bg-blue-500 text-white rounded-lg hover:bg-bl-800'> Agrega tu Gato</button>

        </div>
        </form>
        </>
    )
}

export default saveCats;