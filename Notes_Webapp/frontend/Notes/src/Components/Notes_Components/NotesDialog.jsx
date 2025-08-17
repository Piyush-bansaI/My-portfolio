import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaMicrophoneAlt } from "react-icons/fa";

const NotesDialog = ({ darkTheme, lightTheme, dark, isOpened, setOpen, type, PostNote, deleteNote, SttHandler, formHandling, title, setTitle, description, setDescription, username, setUsername, password, setPassword, voiceActive, setVoiceActive, showPassword, setShowPassword, editingNoteId, setEditingNoteId, saveNotes, errMessage, showErr, isCorrect }) => {


    useEffect(() => {
      if (editingNoteId !== null) {
      const note = saveNotes.find(note => note.id === editingNoteId)
        if (note) {
          setTitle(note.title)
          setDescription(note.content)
        }
      }
    }, [editingNoteId, saveNotes])
    

    const closeDialog = () => {
       setOpen(false)
       setEditingNoteId(null)
       setTitle('')
       setDescription('')
    }
    const LoginBtnClr = () => {
        if (dark) {
            return darkTheme['accent-Color']
        } else {
            return lightTheme['accent-Color']
        }
    }
  return (
    <>
    <div onClick={closeDialog} className={`bg-black/30 ${isOpened ? 'block' : 'hidden'} z-40 absolute top-0 left-0 w-full h-full`}></div>
    <dialog className={`${isOpened && 'block'} rounded-2xl ${dark ? darkTheme['dialog-bg-color'] : lightTheme['dialog-bg-color']} z-50 text-white backdrop-blur-[2px] max-w-full w-[500px] fixed top-1/2 left-1/2 -translate-1/2 p-5`}>
      {/* Create/Edit Note Dialog */}
      {(type === 'CreateNote' || type === 'EditNote') && <><div className='flex'>
      <h1 className='text-3xl font-bold mr-auto'>{type == 'CreateNote' ?'Create Note 🖊️' : 'Edit Note 🖋️'}</h1>
      <div className='flex gap-2'>
      <button onClick={SttHandler} className={`cursor-pointer relative ${voiceActive ? "before:block" : "before:hidden"} before:absolute before:w-full before:h-full before:bg-[#927a2c]/40 before:rounded-full before:p-6 before:animate-pulse  before:top-1/2 before:left-1/2 before:-translate-1/2 before:z-[-1] rounded-full bg-[#927a2c] px-2.5`}>{voiceActive ? <IoClose/> : <FaMicrophoneAlt/>}</button>
      <button onClick={closeDialog}><IoClose className='hover:text-[#ccac2d] text-xl cursor-pointer'/></button>
      </div>
      </div>
      <form onSubmit={PostNote} className='flex flex-col'>
        <input type="text" value={title} onChange={(e) => {
            setTitle(e.target.value)
        }} className='border text-lg rounded my-6 p-3 outline-none' placeholder='Your Title will be here.....'/>
        <textarea className='border rounded h-[250px] p-3 resize-none outline-none' value={description} onChange={(e) => {
            setDescription(e.target.value)
        }} placeholder='Here you can write anything 🖊️......'></textarea>
        <div className='flex gap-4 w-full justify-end my-5'>
        <button onClick={closeDialog} className='p-2 cursor-pointer hover:text-[#ccac2d]'>Cancel</button>
        <button type='submit' className='bg-[#ccac2d] cursor-pointer rounded font-semibold text-xl py-2 px-5'>{type === 'CreateNote' ? 'Post' : 'RePost'}</button>
        </div>
      </form></>}
      {/* Save Note Dialog */}
      {type === 'SaveNote' && <>
      <div className='flex'>
      <h1 className='text-3xl font-bold mr-auto'>Save Note 💾</h1>
      <button onClick={closeDialog}><IoClose className='hover:text-[#ccac2d] text-xl cursor-pointer'/></button>
      </div>
      <div className='flex justify-end gap-3 mt-5'>
        <button >Cancel</button>
        <button className='bg-[#ccac2d] cursor-pointer rounded font-semibold text-xl py-2 px-5'>Save As</button>
      </div>
      </>}
      {/* Delete Note Dialog */}
      {type === 'DeleteNote' && <>
      <div className='flex'>
      <h1 className='text-3xl font-bold mr-auto text-red-100'>Delete Note 🗑️</h1>
      <button onClick={closeDialog}><IoClose className='hover:text-[#ccac2d] text-xl cursor-pointer'/></button>
      </div>
      <article className='my-5'>
        Do you really wanna delete this note? Note that Deleted notes cannot be Recovered <br />
        then don't cry on me 😅
      </article>
      <section className='flex justify-end gap-4'>
        <button onClick={closeDialog} className='cursor-pointer'>Cancel</button>
        <button onClick={deleteNote} className='bg-red-600 cursor-pointer font-semibold hover:bg-red-700 text-zinc-50 rounded p-3'>Delete Note</button>
      </section>
      </>}
      {/* User Login */}
      {type == 'LoginPage' && <>
      <div className='flex'>
      <h1 className='text-4xl font-bold mr-auto'>Løgin</h1>
      <button onClick={closeDialog}><IoClose className='hover:text-[#ccac2d] text-xl cursor-pointer'/></button>
      </div>
      <form className='flex flex-col my-10' onSubmit={formHandling} method='POST'>
        <article className={`py-3 px-4 ${showErr ? `${ isCorrect ?'bg-green-500/40 border-green-600':'bg-red-500/40 border-red-600'}` : 'hidden'} rounded border`}>
          {errMessage}
        </article>
        <input type="text" value={username} onChange={(e) => {
          setUsername(e.target.value)
        }} className='border outline-none rounded my-3 text-lg p-2' placeholder='Username' name="username" />
        <div className='relative'>
        <button type='button' className='cursor-pointer absolute grid top-6 right-10'>
          <div className='relative '>{
          showPassword ?
          <FaEyeSlash onClick={() => setShowPassword(false)} className='absolute text-xl'/> :
          <FaEye onClick={() => setShowPassword(true)} className='absolute text-xl'/>}
          </div>
        </button>
        <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => {
          setPassword(e.target.value)
        }} className='border outline-none rounded my-3 w-full text-lg p-2 pr-12' placeholder='Password' name="password" />
        </div>
        <div className='flex flex-col justify-center items-center my-3 gap-3'>
        <button type='submit' className={`${LoginBtnClr()} px-10 py-2 rounded cursor-pointer text-xl font-semibold mt-3 w-50`}>Login</button>
        <p className='text-center'>New user?<Link to={'/Signup'} className='text-[#d7c342] hover:underline ml-1'>SignUp</Link></p>
        </div>
      </form>
      </>}
    </dialog>
    </>
  )
}

export default NotesDialog
