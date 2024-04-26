"use client"

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";


const imageGallery = () =>{
    const [images, setImages]  = useState([]);
    const supabase = createClient()

    useEffect(() => {
        const fetchImages = async () =>{

      
        try {
            const{data, error} = await supabase.from('michis').select('*');
            if(error){
                throw error;
            }
            setImages(data);
        } catch (error) {
            console.error("error en las imagenes", error.message);

        }  };

        fetchImages();
    },[supabase]);

    const allImages= images.reduce((acc, item) => acc.concat(item.gallery),[]);

    return(
        <div>
      <ImageGallery 
      showFullscreenButton={false}
      showPlayButton={false}
      autoPlay={true}
      items={allImages} />
        </div>
    )
}

export default imageGallery;