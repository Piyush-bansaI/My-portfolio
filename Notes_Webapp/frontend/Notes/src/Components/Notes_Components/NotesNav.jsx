import React, { useEffect, useState } from 'react'
import { data, Link } from 'react-router-dom';
import { FaPen } from "react-icons/fa6";
import Themes from "../../Data/Themes.json"
import LoginDialog from './LoginDialog';

const NotesNav = ({ dark, setDark, darkTheme, lightTheme, setOpen, setType, isLoggedIn, loginDialog, profilePic, post, logOut, showLogin, username }) => {
    const OpenDialog = () => {
      setOpen(true)
      setType('CreateNote')
    }
    const OpenLogin = () => {
      setOpen(true)
      setType('LoginPage')
    }
    const changeTheme = () => {
        setDark(!dark)
    }
    const accentClr = () => {
      if (dark) {
        return darkTheme['accent-Color']
      }
       else {
        return lightTheme['accent-Color']
      }
    }
    const borderClr = () => {
      if (dark) {
        return darkTheme['border-color']
      }
       else {
        return lightTheme['border-color']
      }
    }
  
  return (
    <nav className='w-full relative z-10 flex items-center justify-between p-7'>
    <h1><Link className='text-4xl font-bold' to={'/'}>Notes</Link></h1>
      <ul className='flex list-none items-center gap-5'>
        <li><button onClick={OpenDialog} className={` p-3 rounded cursor-pointer ${accentClr()} flex gap-3 items-center font-bold sm:before:content-['Create_New_Note']`}><FaPen className={`${dark ? "text-zinc-300" : "text-[#474747]"}`}/></button></li>
        <li><button title='Change Theme' onClick={changeTheme} className={`p-3 rounded backdrop-blur-sm border cursor-pointer ${borderClr()} text-lg`}>{dark ? "☀️" : "🌙"}</button></li>
        {isLoggedIn ? <li className='relative'><button onClick={loginDialog} className={`cursor-pointer rounded-full bg-zinc-600`}><img src={profilePic} width={40} alt="Account" /></button>
        {/* Login Data */}
      <LoginDialog isDark={dark} showLogin={showLogin} username={username} logOut={logOut} post={post} dark={darkTheme} light={lightTheme}/></li> : <li><button onClick={OpenLogin} className={`border-2 p-3 backdrop-blur-sm rounded cursor-pointer ${borderClr()}`}>Login</button></li>
        }
      </ul>
    </nav>
  )
}

export default NotesNav
