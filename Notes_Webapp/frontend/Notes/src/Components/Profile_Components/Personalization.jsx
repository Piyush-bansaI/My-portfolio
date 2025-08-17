import React, { useEffect, useState } from 'react'
import ProfileSidebar from './ProfileSidebar'
import Themes from '../../Data/Themes.json'
import ProfileSwiper from './ProfileSwiper'
import profilePicture from '../../Data/profilePicture.json'
import ThemeUi from '../../Data/ThemesUI.json'
import axios, { Axios } from 'axios'
import { Link } from 'react-router-dom'

const Personalization = () => {
  
  const [isDark, setIsDark] = useState(() => {
      const currentTheme = localStorage.getItem('themes')
      return currentTheme === 'dark'
    })
  const dark = Themes[0].banana[0].dark[0]
  const light = Themes[0].banana[0].light[0]
  
  return (
    <section className={` ${isDark ? `${dark['dashboard-bg-color']} ${dark.color}` : `${light['dashboard-bg-color']} ${light.color}`} min-h-screen grid grid-cols-[20%_80%] `}>
      <ProfileSidebar/>
      <section className='p-5'>
        <article>
        <h1 className='text-2xl font-semibold'>Profile Pictures</h1>
        <hr className={`my-3 w-[40%] ${isDark ? dark['border-color'] : light['border-color']}`}/>
        <Link to={'/Personalization/ProfilePic'}>
        <ProfileSwiper datas={profilePicture} isdark={isDark} dark={dark} light={light} bgHeight={"300px"} border={'border'} bg={true} imgWidth={200} rounded={true}/>
        </Link>
        <h1 className='text-2xl font-semibold'>Theme Selection</h1>
        <hr className={`w-[40%] my-3 ${isDark ? dark['border-color'] : light['border-color']}`}/>
        <Link to={'/Personalization/ThemeSelection'}>
        <ProfileSwiper datas={ThemeUi} isdark={isDark} dark={dark} light={light} bgHeight={'400px'} border={'no-border'} bg={false} imgWidth={500} rounded={false}/>
        </Link>
        </article>
      </section>
    </section>
  )
}

export default Personalization
