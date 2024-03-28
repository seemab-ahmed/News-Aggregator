import React from 'react'
import { Search } from '../search/search'
import logo from "../../images/logo.png";
import { searchNewsAtom } from '../../atoms/searchNewsAtom';
import { useRecoilState } from 'recoil';

export const Navbar= () => {
  const [, setNewsSearch] =
  useRecoilState(searchNewsAtom);
    const newsCategory = ["Home" , "Technology", "Sports", "Health", "Science"]
    const handleClick = (item: string) => {
      setNewsSearch((state:any ) => ({
        ...state,
        keyword: item,
      }));
    }
  return (

    <header className="">
    <div className='flex justify-between w-full  p-2 pb-0 shadow-lg md:pb-4 items-center sm:px-4 md:px-10'>
    <div>
        <img src={logo} width={210} alt="Logo" />
    </div>
    <Search />
    </div>
    <div className="relative bg-gray-100  mb-5">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
 <div className="flex justify-center items-center py-2">
      <nav className="hidden md:flex space-x-3">
        {newsCategory.map((item , index)=>(
            <button className="text-sm leading-6 font-medium text-gray-500 focus:outline-none hover:text-indigo-900 transition ease-in-out duration-150 px-5 py-2 hover:bg-[#3b82f6] rounded-md " key={index} onClick={() => handleClick(item)}>{item} </button>
        ))}
        </nav>
      
    </div>
</div>
</div>
  </header>
    
  )
}
