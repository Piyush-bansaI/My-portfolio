import React, { useEffect, useState } from 'react'
import Themes from '../../Data/Themes.json'
import profilePicture from '../../Data/profilePicture.json'
import { IoIosHome } from "react-icons/io";
import { Link } from 'react-router-dom';
const ProfilePic = () => {
    const [userData, setUserData] = useState(() => {
       const data = localStorage.getItem('userData')
       return data ? JSON.parse(data) : null
    })
    const [isDark, setIsDark] = useState(() => {
        const theme = localStorage.getItem('themes') || 'light';
        return theme === 'dark'
    })
    const dark = Themes[0].banana[0].dark[0]
    const light = Themes[0].banana[0].light[0]
  return (
    <section className={`w-full min-h-screen ${isDark ? `${dark.color} ${dark['dashboard-bg-color']}` : `${light.color} ${light['dashboard-bg-color']}`}`}>
        <article className='flex items-center justify-between'>
      <h1 className='p-5 text-2xl font-semibold'>Profile Pictures 👤</h1>
      <Link to={'/'} className='text-2xl sm:mx-5 mr-3'><IoIosHome/></Link>
        </article>
      <hr className={`${isDark ? dark['border-color'] : light['border-color']} sm:w-[300px] mx-3`}/>
      <section className='md:flex h-[700px] gap-5 justify-between '>
        <article className='md:w-[20%] flex flex-col items-center my-10'>
            <img src={userData.profilePic} alt="User-Profile" width={150} className='rounded-full bg-zinc-800 mb-auto'/>
        <button className={` ${isDark ? dark['accent-Color']: light['accent-Color']} rounded p-2 w-[200px] font-bold`}>Save Changes</button>
        </article>
        <article className={`border ${isDark ? dark['border-color']: light['border-color']} md:w-[80%] flex flex-wrap sm:flex-nowrap p-5 gap-5 max-h-[400px] sm:max-h-[700px] overflow-y-auto`}>
            {profilePicture.map((pic, i) => {
               return <button key={i} className='h-fit cursor-pointer '>
                    <img src={pic.picture} alt="" width={150} className={`rounded-full border-5 ${pic.borderStyle} bg-zinc-700`} />
                </button>
            })}
        </article>
      </section>
    </section>
  )
}

export default ProfilePic
