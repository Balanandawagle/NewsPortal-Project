import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Section(props) {
     let[posts,setPosts]=useState([])
      useEffect(()=>{
             fetch(`https://laghubittanews.com/wp-json/wp/v2/posts`).then(res=>res.json()).then(a=>setPosts(a))
         },[])
  return (
    <>
      <>
      <section className='py-3 '>
        <div className="container mx-auto px-5">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className='text-[30px] font-bold uppercase'>{props.title}</h3>
               <Link to={"/"} className='bg-blue-800 text-white p-2'>Read More</Link>
            </div>
        </div>
        <div className="container mx-auto flex flex-wrap justify-center gap-5 py-5 px-5"  >
                {posts.slice(0,3).map((a)=>(
                     <div key={a.id} className="w-[380px] grow border rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:border-blue-500 hover:scale-105 hover:opacity-90 transition-all duration-300 z-999">
                        <Link to={`/sectiondetails/${a.id}/${a.slug}`}>
                        <img className='w-full h-56 object-cover' src={a.featured_image_src} alt="" />
                        <p className='p-3 transition-all duration-200 hover:text-blue-500 ' dangerouslySetInnerHTML={{ __html:a.title.rendered }}></p>
                        </Link>
                        </div>
                        
                ))}
            </div>
        </section>
      </>
    </>
  )
}

export default Section
