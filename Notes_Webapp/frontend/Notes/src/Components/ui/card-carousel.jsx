import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"

import Themes from '../../Data/Themes.json'

import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"


export const CardCarousel = ({
  images,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
}) => {
  const css = `
    .swiper {
      width: 100%;
      padding-bottom: 50px;
    }
    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 300px;
    }
    .swiper-slide img {
      display: block;
      width: 100%;
    }
    .swiper-3d .swiper-slide-shadow-left {
      background-image: none;
    }
    .swiper-3d .swiper-slide-shadow-right {
      background: none;
    }
  `

  const [isDark, setIsDark] = useState(() => {
  const currentTheme = localStorage.getItem('themes')
  return currentTheme === 'dark'
})

const dark = Themes[0].banana[0].dark[0]
const light = Themes[0].banana[0].light[0]


  return (
    <section className="w-ace-y-4">
      <style>{css}</style>
      <div className={`mx-auto lg:w-[90%] rounded-[24px] border ${isDark ? dark['border-color'] : light['border-color']} p-2 shadow-sm md:rounded-t-[44px]`}>
        <div className={`relative mx-auto flex w-full flex-col justify-center rounded-[24px] border ${isDark ? dark['border-color'] : light['border-color']} bg-neutral-800/5 p-2 shadow-sm md:items-start md:gap-8 md:rounded-b-[20px] h-[500px] md:rounded-t-[40px] md:p-2`}>
          <div className="flex w-full items-center justify-center gap-4">
            <div className="w-full">
              <Swiper
                spaceBetween={100}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                pagination={showPagination}
                navigation={
                  showNavigation
                    ? {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }
                    : undefined
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={`slide1-${index}`} >
                    <button className="sm:w-[600px] relative left-1/2 -translate-x-1/2 rounded-3xl">
                      <img
                        src={image.src}
                        width={600}
                        height={500}
                        className=" rounded-xl"
                        alt={image.alt}
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
