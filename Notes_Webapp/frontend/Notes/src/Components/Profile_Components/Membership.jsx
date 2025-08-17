import React, { useEffect, useState } from 'react'
import ProfileSidebar from './ProfileSidebar'
import Themes from '../../Data/Themes.json'
import { FaFilePdf } from "react-icons/fa";
import { BiSolidFileTxt } from "react-icons/bi";
import { BsFiletypeDocx } from "react-icons/bs";
import { IoCheckmark } from "react-icons/io5";
import axios from 'axios';
import { data } from 'react-router-dom';

const Membership = () => {
  
  const [isDark, setIsDark] = useState(() => {
      const currentTheme = localStorage.getItem('themes')
      return currentTheme === 'dark'
    })
  const [isPremium, setIsPremium] = useState(null)
  const dark = Themes[0].banana[0].dark[0]
  const light = Themes[0].banana[0].light[0]

  useEffect(() => {
    const Isloggedin = JSON.parse(localStorage.getItem('login'))
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (Isloggedin) {
    const dataFetcher = async () =>{
      try {
        
        const premium = await axios.get('http://127.0.0.1:5000/get_premium', {
          params : {username: userData.username}
        });
        setIsPremium(premium.data.result);
        
    } catch (err) {
      console.log(err)
    }
  }
  dataFetcher();
}
  }, [])
  return (
    <div className={` ${isDark ? `${dark['dashboard-bg-color']} ${dark.color}` : `${light['dashboard-bg-color']} ${light.color}`} min-h-screen grid grid-cols-[20%_80%] `}>
      <ProfileSidebar/>
    <section className={`p-5`}>
      <section className='flex gap-10 justify-center items-center h-[730px] z-50 relative'>
      <article className={` rounded-2xl flex flex-col w-[400px] p-5 h-[60%] ${isDark ? 'bg-[#2c2a26]' : 'bg-[#ffefd0]'} shadow-lg shadow-zinc-400 hover:scale-[1.01] transition-transform`}>
        <h1 className='text-2xl font-bold'>Free Pack</h1>
        <ul className='flex grow flex-col gap-2 my-5 text-xs font-semibold'>
        <li className='before:content-["➖"]'> Unlocked Speech-to-text 🎙️</li>
        <li className='before:content-["➖"] flex items-center gap-1'> Save files in .pdf <FaFilePdf className='text-red-500'/>, .txt <BiSolidFileTxt className='text-blue-500'/>and .docx <BsFiletypeDocx className='text-blue-400'/></li>
        <li className='before:content-["✔️"]'> Can access to free themes ⛰️</li>
        <li className='before:content-["➖"]'> Can access to premium themes ⛰️</li>
        <li className='before:content-["✔️"]'> Can access to free profile pictures</li>
        <li className='before:content-["➖"]'> Can access to premium profile pictures</li>
        <li className='before:content-["➖"]'> Can access to premium profile pictures</li>
      </ul>
      <button className={`border ${isDark ? `${dark['border-color'], dark['not-imp-color']}` : `${light['border-color'], light['not-imp-color']}`} w-full py-2 rounded-[20px] cursor-pointer transition-colors duration-300 flex justify-center`}>{!isPremium ? <IoCheckmark/> : `Free` }</button>
      </article>
      
      <article className={` ${isDark ? 'bg-[#2c2a26]' : 'bg-[#ffefd0]'} flex flex-col rounded-2xl hover:scale-[1.01] transition-transform h-[70%] w-[400px] p-5 shadow-lg shadow-amber-300`}>
        
        <h1 className='text-2xl font-bold '>Premium Membership 👑</h1>
      <ul className='flex flex-col gap-2 my-5 grow text-xs font-semibold'>
        <li className='before:content-["✔️"]'> Unlocked Speech-to-text 🎙️</li>
        <li className='before:content-["✔️"] flex items-center gap-1'> Save files in .pdf <FaFilePdf className='text-red-500'/>, .txt <BiSolidFileTxt className='text-blue-500'/>and .docx <BsFiletypeDocx className='text-blue-400'/></li>
        <li className='before:content-["✔️"]'> Can access to free themes ⛰️</li>
        <li className='before:content-["✔️"]'> Can access to premium themes ⛰️</li>
        <li className='before:content-["✔️"]'> Can access yo free profile pictures</li>
        <li className='before:content-["✔️"]'> Can access yo premium profile pictures</li>
        <li className='before:content-["✔️"]'> Can access yo premium profile pictures</li>
      </ul>
      <button className={`border ${isDark ? `${dark['border-color'], dark['not-imp-color']}` : `${light['border-color'], light['not-imp-color']}`} w-full py-2 rounded-[20px] ${isPremium ? `bg-amber-300 text-black` : `cursor-pointer hover:bg-amber-300 hover:text-black hover:border-transparent transition-colors duration-300`} `}>{isPremium ?`Applied ✅` : `Buy Now ₹29/month`}</button>
      </article>
      
      </section>
    </section>
    </div>
  )
}

export default Membership
