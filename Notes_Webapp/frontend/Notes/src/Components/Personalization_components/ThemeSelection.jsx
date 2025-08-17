import React, { useState } from 'react'
import Themes from '../../Data/Themes.json'
import { IoIosHome } from "react-icons/io";
import { Link } from 'react-router-dom';
import { CardCarousel } from "../../Components/ui/card-carousel"

const ThemeSelection = () => {
    const [isDark, setIsDark] = useState(() => {
        const currentTheme = localStorage.getItem('themes');
        return currentTheme === 'dark'
    })
    const dark = Themes[0].banana[0].dark[0]
    const light = Themes[0].banana[0].light[0]

      const images = [
    { src: "https://res.cloudinary.com/dncscskiw/image/upload/v1754934371/o2xg965ua6ufrmz3tobr.png", alt: "Beautiful Landscape" },
  ]


  return (
    <div className={`w-full min-h-screen ${isDark ? `${dark['dashboard-bg-color']} ${dark.color} ${dark['selection-color']}` : `${light['dashboard-bg-color'] } ${light.color} ${light['selection-color']}`}`}>
      <article className='flex items-center justify-between'>
      <h1 className='p-5 text-2xl font-semibold'>Theme Selection 🌄</h1>
      <Link to={'/'} className='text-2xl sm:mx-5 mr-3'><IoIosHome/></Link>
        </article>
        <div className="mt-10">
        <CardCarousel
          images={images}
          autoplayDelay={10000}
          showPagination={true}
          showNavigation={true}
        />
      </div>
      <section className='w-full flex justify-center my-2'>
        <button className={`${isDark? `${dark['accent-Color']}` : `${light['accent-Color']}`} w-[20%] py-1 rounded font-semibold hover:bg-amber-300/50 cursor-pointer`}>Select Theme</button>
      </section>
    </div>
  )
}

export default ThemeSelection
