"use client"

import React, { useEffect, useState } from 'react'
import { updateDbCats, getCatsById } from'./action';
import ImageGallery from '@/app/gatos/id/[id]/page'

const editCast = ({params}:any) => {


    const [cats, setCats] = useState<any>([]);
    const [CatsId, setCatsId] =useState(params.index)
    const [catsData, setCatsData] = useState({
        raza:"",
        color:"",
        edad:"",
        tamano:""        
    })


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target;
    setCatsData((prevData)=> ({...prevData, [name]:value}));
    };

    const updateElementInDb = async ()  => {
        try {
            const response = await updateDbCats(params.id, catsData);
            console.error( "error", response)
            alert("Registro actualizado");
            setCatsData({
                raza:"",
                color:"",
                edad:"",
                tamano:"" 
            });
            
        } catch (error) {
            console.error("Ocurrio algun error", Response);
            
        }
    };

    useEffect(() =>{
        const getData = async () => {
            setCatsId(params.id)
            const dataresult = await getCatsById(params.id);
            setCats(dataresult || []);
            if(dataresult && dataresult.length >0 ){
                const{raza, color, edad, tamano }= dataresult[0];
                setCatsData({raza, color, edad, tamano });
                
            }
        };
        getData();
       

    },[params.id]);

    return (
        
        <div className="flex justify-center content-center items-center flex-col min-h-screen ">
            
            <div>
            <ImageGallery></ImageGallery>
            </div>

            {cats.map((item:any,index:any) => (
            <div  className="bg-slate-300 rounded-lg text-black p-8 flex content-center justify-center  " key={index}>
                <form className="flex flex-col gap-2 p-1  " onSubmit={(e) => {
                    e.preventDefault();
                    updateElementInDb();
                    
                }}>
                    <h1 className='text-lg content-center font-bold'>Edita Resgistro de gatos</h1>
                    <label htmlFor="raza">raza</label>
                    <input type="text" name='raza' value={catsData.raza} onChange={handleInputChange}
                    className='text-black rounded-md w-full' />
    
    
                    <label htmlFor="color">Color</label>
                    <input type="text" name='color' value={catsData.color} onChange={handleInputChange} 
                    className='text-black rounded-md w-full'/>
    
                    <label htmlFor="edad">Edad</label>
                    <input type="text" name='edad' value={catsData.edad} onChange={handleInputChange} 
                    className='text-black rounded-md w-full'/>
    
                    <label htmlFor="tamano">Tamaño</label>
                    <input type="text" name='tamano' value={catsData.tamano} onChange={handleInputChange} 
                    className='text-black rounded-md w-full'/>
    
                    <button className="bg-blue-600 p-2 rounded-md hover:bg-blue-800 hover:text-white transition" type='submit'>Actualizar</button>
                </form>
            </div>
        ))}
    
        </div>
      )
}




export default editCast;


