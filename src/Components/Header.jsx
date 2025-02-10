import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IoMdMenu } from 'react-icons/io'
import { Link, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Details from '../Pages/Details'
import SectionDetails from '../Pages/SectionDetails'


function Header() {
  let [cat, setCat] = useState([])
  let [isMenuOpen, setIsMenuOpen] = useState(false)
  let [searchTerm, setSearchTerm] = useState('');
  let [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    fetch(`https://laghubittanews.com/wp-json/wp/v2/categories`).then(res => res.json()).then(a => setCat(a))
  }, [])
  let filteredCategories = cat.filter((a) => (
    a.slug.toLowerCase().includes(searchTerm.toLowerCase())
  ))
  return (
    <>
      <header className='py-5 shadow-sm sticky top-0 bg-white px-4 z-50' >
        <div className="container mx-auto flex justify-between items-center">
          <Link to={'/'}>
            <h2 className='font-bold uppercase flex text-2xl hover:text-blue-700 transition-all duration-300 '>Bala's News Portal</h2>
          </Link>
          <nav className='flex justify-end gap-4'>
            <ul className='hidden lg:flex gap-5 '>
              <Link className='font-bold uppercase hover:text-blue-700 transition duration-300 hover:scale-105' to={'/'}>Home</Link>
              {cat.slice(1, 7).map((a) => (
                <li key={a.id} className=' font-bold uppercase hover:text-blue-700 transition duration-300 hover:scale-105'>

                  <Link to={`/details/${a.id}/${a.slug}`}>
                    {a.slug}</Link></li>
              ))}
            </ul>
            <div className='flex gap-3 items-center text-xl'>
              <FaSearch className='cursor-pointer' onClick={() => setShowSearch(!showSearch)} />
              {showSearch && (
                <input
                  type="text"
                  className="absolute top-10 right-0 p-2 border border-gray-300 rounded-md w-60"
                  placeholder="Search News"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              )}

              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <IoMdMenu className='lg:hidden' />
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
        {showSearch && searchTerm && (
          <div className="absolute top-16 right-0 bg-white shadow-md p-3 w-60 border border-gray-300 rounded-md">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((a) => (
                <Link
                  key={a.id}
                  to={`/details/${a.id}/${a.slug}`}
                  className="block p-2 hover:bg-gray-200"
                  onClick={() => setShowSearch(false)}
                >
                  {a.slug}
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No results found</p>
            )}
          </div>
        )}
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details/:id/:slug' element={<Details />} />
        <Route path='/sectiondetails/:id/:slug' element={<SectionDetails />} />
      </Routes>
    </>
  )
}

export default Header
