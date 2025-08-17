import React, { useState } from 'react'
import ProfileSidebar from './ProfileSidebar'
import Themes from '../../Data/Themes.json'

const AboutMe = () => {
  
  const [isDark, setIsDark] = useState(() => {
      const currentTheme = localStorage.getItem('themes')
      return currentTheme === 'dark'
    })
  const dark = Themes[0].banana[0].dark[0]
  const light = Themes[0].banana[0].light[0]
  return (
    <section className={` ${isDark ? `${dark['dashboard-bg-color']} ${dark.color}` : `${light['dashboard-bg-color']} ${light.color}`} min-h-screen grid grid-cols-[20%_80%] `}>
      <ProfileSidebar/>
      <section className={`p-5`}>
    <h1 className='text-3xl font-semibold'>About Me</h1>
    <hr className={`${isDark ? dark['border-color'] : light['border-color']} mt-3 w-[40%]`}/>
    <article className='text-lg'>
      <p className='my-3'><span className='text-2xl font-semibold'>Hey guys! 👋</span> My name is <b>Piyush</b> and I have created this website <br/>
      Hope you will gonna enjoy it and support me.</p>
      <p> ● I have created this website and gave it all that I have learnt so far and hope this website may grow and tried to add my own style in it.</p>
      <p> ● you can also explore all the feature of this website and also use it use it as you personal diary or whatever 😅.</p> 
      <p> ● I will be updating and keep bringing new feature in this website if I get time</p>
    </article>
    </section>
    </section>
  )
}

export default AboutMe
