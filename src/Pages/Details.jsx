import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Details() {
  let { id, slug } = useParams()
  let [posts, setPosts] = useState([])
  useEffect(() => {
    fetch(`https://laghubittanews.com/wp-json/wp/v2/posts?categories=${id}`).then(res => res.json()).then(a => setPosts(a))
  }, [id])
  return (
    <>
      <section>
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-center uppercase">{slug} Category</h1>
          {posts.length === 0 ? (
            <p>No posts available in this category.</p>
          ) : (
            <div className="flex flex-wrap gap-6 justify-center">
              {posts.map((post)=>(
                <div
                  key={post.id}
                  className="flex flex-col bg-white p-4 shadow-md rounded-md w-full lg:w-96 hover:shadow-2xl transition-all duration-300 ease-out transform"
                >
                  <img src={post.featured_image_src} alt="" />
                  <h2 className="text-xl font-semibold hover:text-red-800 mt-2">{post.title.rendered}</h2>
                  <div
                    className="mt-2"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <Link
                    to={`/sectiondetails/${post.id}/${slug}`}
                    className="text-blue-500 hover:text-blue-700 mt-4"
                  >
                    Read more
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Details
