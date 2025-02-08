import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IoMdMenu } from 'react-icons/io'
import { Link, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Details from '../Pages/Details'
import SectionDetails from '../Pages/SectionDetails'


function Header() {
    let[cat,setCat]=useState([])
    let [isMenuOpen, setIsMenuOpen] = useState(false)
    useEffect(()=>{
        fetch(`https://laghubittanews.com/wp-json/wp/v2/categories`).then(res=>res.json()).then(a=>setCat(a))
    },[])
  return (
    <>
      <header className='py-5 shadow-sm sticky top-0 bg-white px-4 z-50' >
            <div className="container mx-auto flex justify-between items-center">
                <Link to={'/'}>
                    <h2 className='font-bold uppercase flex text-2xl hover:text-blue-700 transition-all duration-300 '>Bala's News Portal</h2>
                </Link>
                <nav className='flex justify-end gap-4'>
                    <ul className='hidden lg:flex gap-5 '>
                        {cat.slice(1,7).map((a)=>(
                            <li key={a.id}className=' font-bold uppercase hover:text-blue-700 transition duration-300 hover:scale-105'>
                            <Link to={`/details/${a.id}/${a.slug}`}>
                                {a.slug}</Link></li>
                        ))}
                    </ul>
                    <div className='flex gap-3 items-center text-xl'>
                    <FaSearch className='cursor-pointer'/>
                    <button onClick={()=> setIsMenuOpen(!isMenuOpen)}>
                    <IoMdMenu className='lg:hidden'/>
                    </button>
                    </div>
                </nav>
            </div>

            {isMenuOpen && (
          <nav className="lg:hidden absolute top-[70px] left-0 w-full bg-white shadow-md p-5">
            <ul className="flex flex-col gap-3 text-center">
              {cat.slice(1, 7).map((a) => (
                <li className="font-bold uppercase" key={a.id}>
                  <Link
                    to={`/details/${a.id}/${a.slug}`}
                    onClick={() => setIsMenuOpen(false)} 
                  >
                    {a.slug}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
      <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/details/:id/:slug' element={<Details/>}/>
            <Route path='/sectiondetails/:id/:slug' element={<SectionDetails/>}/>
      </Routes>
    </>
  )
}

export default Header
