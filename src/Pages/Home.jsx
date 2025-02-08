import React, { useEffect, useState } from 'react'
import { Swiper,SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Section from './Section';


function Home() {
    let[posts,setPosts]=useState([])
    

    useEffect(()=>{
        fetch(`https://laghubittanews.com/wp-json/wp/v2/posts`).then(res=>res.json()).then(a=>setPosts(a))
        
    },[])
  return (
    <>
       <Swiper navigation={true} pagination={{ clickable: true }}  modules={[Navigation,Pagination]} className="mySwiper">
        {posts.slice(6,9).map((a)=>(
              <SwiperSlide key={a.id} className='relative'> 
                    <img className='w-full h-[500px] object-cover' src={a.featured_image_src} alt="" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/10"></div>
                    <div className="absolute bottom-10 left-5 right-5 text-white text-center">
                        <h2 className="text-2xl font-bold">{a.title.rendered}</h2>
                    </div>
                 </SwiperSlide>
        ))}
       </Swiper>

       <Section title='अन्तरवार्ता' id='7'/>
       <Section title='उद्यमशीलता' id='22'/>
       <Section title='केन्द्रीय बैंक ' id='4'/>
       <Section title='फोटो कथा' id='21'/>
    </>
  )
}

export default Home
