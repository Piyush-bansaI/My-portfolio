import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";

const temp = ({ isDark, dark, light, CloseTempNotice, IsNoticeOpened }) => {
  return (
    <>
    <div onClick={CloseTempNotice} className={`fixed w-full h-screen bg-black/20 z-20 ${IsNoticeOpened ? 'block' : 'hidden'}`}></div>
    <dialog className={`${IsNoticeOpened && 'block'} w-[500px] absolute z-30 top-1/2 left-1/2 -translate-1/2 ${isDark ? `${dark['dialog-bg-color']} ${dark['border-color']} ${dark.color}` : `${light['dialog-bg-color']} ${light['border-color']} ${light.color}`} border p-5 rounded-2xl pop backdrop-blur-xs`}>
    <section className='flex items-center justify-between'>
    <h1 className='font-bold text-2xl'>Notice!!</h1>
    <button onClick={CloseTempNotice} className={`cursor-pointer text-[#ffd900]`}><IoMdClose/></button>
    </section>
    <article className={`text-sm tracking-tight my-5 `}>
        <p className={`opacity-80 font-semibold`}>There are some features which are not finished, because of that. <br />
         I am request you to be patient and sooner or later I will add them in this website. Sorry for the inconvinience</p>
        <p className='mt-2 opacity-65'>Thank you! Keep Supporting like this 🙂</p>
    </article>
    <section className='flex justify-end gap-2'>
        <button onClick={CloseTempNotice} className={`${isDark ? dark['border-color'] : light['border-color']} border px-3 py-2 rounded font-semibold cursor-pointer`}>
        Cancel
        </button>
        <button onClick={CloseTempNotice} className={`${isDark ? dark['accent-Color'] : light['accent-Color']} px-3 py-2 rounded font-semibold cursor-pointer`}>
        Got It!
        </button>
    </section>
    </dialog>
    </>
  )
}

export default temp
