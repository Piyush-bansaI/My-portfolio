import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
const profileSwiper = ({ datas, isdark, dark, light, bgHeight, border, bg, imgWidth, rounded }) => {
  return (
    <>
    <div
    style={{height: bgHeight}} className={`border ${isdark ? dark['border-color'] : light['border-color']} relative flex  overflow-y-hidden overflow-x-auto items-center slide`}>
      
      {datas.map(data => {
       return <img key={data.picture} src={data.picture} width={imgWidth} alt="Profile-pics" className={`inline-block mx-3 ${rounded && 'rounded-full'} relative ${bg &&'bg-zinc-700'} ${border !== 'no-border' &&'border-5'}  selection:bg-transparent ${data.borderStyle} hover:scale-[1.01] transition-transform`} />
      })}
    </div>
      <div
      className={`flex items-center justify-end px-3 py-2 hover:underline gap-3 text-sm ${isdark ? dark['not-imp-color'] : light['not-imp-color']} `}>View More <FaLongArrowAltRight/></div>
    </>
  )
}

export default profileSwiper
