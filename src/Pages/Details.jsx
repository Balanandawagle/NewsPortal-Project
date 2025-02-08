import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Details() {
    let{id,slug}=useParams()
    let[posts,setPosts]=useState([])
    let [selectedPost, setSelectedPost] = useState(null)

    useEffect(()=>{
        fetch(`https://laghubittanews.com/wp-json/wp/v2/posts?categories=${id}`).then(res=>res.json()).then(a=>setPosts(a))
    },[id])
  return (
    <>
       <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold uppercase text-center mb-6">Category: {slug}</h2>

      {selectedPost ? (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <img src={selectedPost.featured_image_src} alt="" className="w-full h-64 object-cover rounded" />
        <h3 className="text-2xl font-bold mt-4">{selectedPost.title.rendered}</h3>
        <p className="text-gray-700 mt-2" dangerouslySetInnerHTML={{ __html: selectedPost.content.rendered }} />
        <button  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => setSelectedPost(null)} 
        >
          Back to Posts
        </button>
      </div>
      ):(
        <div className="flex flex-wrap gap-6 justify-center">
        {posts.map((a)=>(
            <div  key={a.id} className="max-w-sm w-full md:w-1/3 lg:w-1/4 bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition" onClick={() => setSelectedPost(a)}>
              <img src={a.featured_image_src} alt="" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{a.title.rendered}</h3>
              <p className="text-gray-600 text-sm mt-2" dangerouslySetInnerHTML={{ __html: a.excerpt.rendered }} />
            </div>
          </div>
        ))}
          
      </div>
    )}
  </div>
    
    </>
  )
}

export default Details
