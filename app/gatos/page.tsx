"use client"

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { catsList} from './action'
import ImageGallery from './id/[id]/page';
import Carusel from '../../components/Carusel';

const  listCats = () => {
    const [cats, setCats] = useState <any>([])
    const [searchCats, setSearchCats] = useState('');
    const supabase = createClient()

    useEffect(() => {
        const getData = async () =>{
            const dataresult = await catsList();
            setCats(dataresult.michis || []);
            if(dataresult.error){
                alert(dataresult.error.message);
            }
        };
        getData();
       
    }, []);

    function sendSearchCats() {
        if(!searchCats){
            return;
        }else{
            const filteredCats = cats.filter((gat:any) => gat.raza.toLowerCase().includes(searchCats.toLowerCase()));
            setCats(filteredCats);
        }
        
        console.log("buscar gato")
    }

    return(

        

        <div className="flex flex-col items-stretch content-center space-y-4">

       <div>
            <ImageGallery></ImageGallery>
        </div>

    

        <input type="text" onChange={(e: any) => {setSearchCats(e.target.value)}} placeholder="Busca tu gato" className="mt-4 mb-2 w-full rounded-lg p-1 text-whit border" />
        <button onClick={sendSearchCats}  className="bg-black p-2 mb-2 rounded-md hover:bg-slate-800 hover:text-white transition text-white" >Buscar</button>
        {
            cats.map((gat: any,id:any)=>(
                <div className="block max-w-sm p-6 bg-white border border-white rounded-lg shadow hover:bg-gray-100 dark:bg-gray-500
                dark:border-gray-700 dark:hover:bg-gray-700 " key={id}>
                    <div>
                        <p className="text-3xl capitalize text-black">{gat.raza}</p>
                        <p className='text-black'> { gat.color }</p>
                        <p className=" pt-2   text-black ">{ gat.edad } </p>
                        <p className="bg-white-800 text-black rounded-md w-full "> { gat.tamano }</p>
                    </div>
        
                </div>
            ))
        }
        </div>
        
    )
}
export default listCats;