import React from 'react'
import { FaGithub } from "react-icons/fa";

const MoreLinks = () => {
  return (
      <section className='absolute bottom-0 flex flex-row-reverse items-center sm:flex-col gap-3 left-0 m-5 '>
      <article className=' tracking-tight w-[100px] text-center leading-3 font-semibold text-[0.7rem]'><br />
      you can follow me <br /> on these links</article>
      <div className='w-[30px] flex items-center justify-center'>
      <a href="https://github.com/Piyush-bansaI" target='_blank'>
      <FaGithub className='text-xl'/>
      </a>
      </div>
      </section>
  )
}

export default MoreLinks
