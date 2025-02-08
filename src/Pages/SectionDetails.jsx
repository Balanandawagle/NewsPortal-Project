import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function SectionDetails() {
    let{id}=useParams()
    let[post,setPost]=useState()
    useEffect(()=>{
        fetch(`https://laghubittanews.com/wp-json/wp/v2/posts/${id}`).then(res=>res.json()).then(a=>setPost(a))
    },[id])
    if (!post) return <p>Loading...</p>;
  return (
    <>
    <div className="container mx-auto flex flex-col items-center py-6 px-4">
    <h2 className="text-3xl font-bold">{post.title.rendered}</h2>
    <img className="w-full h-72 object-cover mt-4" src={post.featured_image_src}/>
    <div className="mt-6 text-lg text-gray-700"dangerouslySetInnerHTML={{ __html: post.content.rendered }}/>
    </div>
    </>
  )
}

export default SectionDetails
