'use client'

import { useEffect, useState }  from 'react';
import { createClient } from '@/utils/supabase/client'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const supabase = createClient();
    useEffect(() => {
        const fetchImages = async () =>{
            try {
                const {data,error} = await supabase.from('michis').select('*');
                if(error){
                    throw error;

                }
                setImages(data);
            } catch (error) {
                console.error('Errror en las imagenes ', error.message);
            }
        };
        fetchImages();
        }, [supabase]);

        const renderCats = () => {
            const allImages = images.reduce((acc, item) => acc.concat(item.gallery),[]);
            return images.map((cats, index) => (
                <div key={index} className="card p-4 bg-teal-500  " >
                    {cats.gallery.length > 0 && (
                        <img src={cats.gallery} alt={cats.gallery[0].alt} className="rounded-md mb-4  "  />
                    )}

                    <div className="mt-2 px-8 ">
                        <h2 className="text-sm font-semibold" >{cats.raza}</h2>
                        <p className="text-sm text-gray-600">{cats.color}</p>
                        <p className="text-sm text-gray-600">{cats.edad}</p>
                        <p className="text-sm text-gray-600">{cats.tamano}</p>

                    </div>

                </div>
            ) );
        };

       
        const settings = {
            dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
            centerMode: true,
            centerPadding: '50px',
          };
        

          return (
            <div className="slider-container h-56 grid grid-cols-2 gap-5 content-center mx-96
            ">
            
                  <Slider className='' 
                  {...settings}>
                    {renderCats()}
                  </Slider> 
            
            </div>
          );
        };

 export default ImageGallery;
