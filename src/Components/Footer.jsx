import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Footer() {
        let[cat,setCat]=useState([])
        useEffect(()=>{
                fetch(`https://laghubittanews.com/wp-json/wp/v2/categories`).then(res=>res.json()).then(a=>setCat(a))
            },[])
  return (
    <>
      

<footer class="bg-gray-900  shadow-sm dark:bg-gray-900">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
             <Link to={'/'}>
                               <h2 className='font-bold text-white uppercase flex text-2xl hover:text-blue-700 transition-all duration-300 '>Bala's News Portal</h2>
                           </Link>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-gray-400">
                
                    
                    {cat.slice(1,7).map((a)=>(
                                                <li key={a.id} className='font-bold uppercase hover:text-blue-700 transition duration-300 hover:scale-105 mx-2'>
                                                <Link to={`/details/${a.id}/${a.slug}`}>
                                                    {a.slug}
                                                    </Link>
                                                    </li>
                                            ))}
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link to={"/"} class="hover:underline">BalanandaW</Link>. All Rights Reserved.</span>
    </div>
</footer>


    </>
  )
}

export default Footer
