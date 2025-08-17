import React, { useEffect, useState } from 'react'
import Profile from './Profile'
import UserSideBar from './UserSideBar'
import Navbar from './Navbar'
import Themes from '../../Data/Themes.json'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

import axios from 'axios'

const AboutUser = () => {
  const [isDark, setIsDark] = useState(() => {
    const currentTheme = localStorage.getItem('themes')
    return currentTheme === 'dark'
  })
  const [Data, setData] = useState(
    JSON.parse(localStorage.getItem('userData'))
  )
  const [isPremium, setIsPremium] = useState(null)
  const [isVerified, setIsVerified] = useState(null)
  const dark = Themes[0].banana[0].dark[0]
  const light = Themes[0].banana[0].light[0]
  const [postType, setPostType] = useState(null)
  const [post, setPost] = useState(null)
  
  return (
    <div className={`${isDark ? `${dark['profile-sidebar-bg-color']} ${dark.color}` : `${light['profile-sidebar-bg-color']} ${light.color}`} h-screen sticky top-0`}>
    <section className='grid grid-rows-[17%_70%_13%] h-full'>
      <section>
    <UserSideBar Data={Data} post={post} dark={dark} light={light} isDark={isDark}/>
    <hr className='border-zinc-600 w-[70%] ml-3'/>
    </section>
    <Navbar Data={Data} dark={dark} light={light} isDark={isDark}/>
    <article className={`flex flex-col items-center gap-5`}>
    <p className={`text-xs text-center ${isDark ? dark['not-imp-color'] : light['not-imp-color']}`}>I will be creating more projects like this</p>
    <div className='flex gap-2'>
    <a href="https://github.com/Piyush-bansaI" target='_blank'><FaGithub className='text-2xl'/></a>
    <a href="https://www.linkedin.com/in/piyush-bansal-621883347?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target='_blank'><FaLinkedin className='text-2xl'/></a></div>
    </article>
    </section>
    </div>
  )
}

export default AboutUser
