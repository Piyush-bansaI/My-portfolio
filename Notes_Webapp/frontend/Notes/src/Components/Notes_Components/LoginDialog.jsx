import React from 'react'
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FcPicture } from "react-icons/fc";
import { MdInfo } from "react-icons/md";
import { TbPremiumRights } from "react-icons/tb";
import { Link } from 'react-router-dom';

const LoginDialog = ({ showLogin, isDark, username, post, logOut, dark, light }) => {
    const reaction = () => {
        if (post === 'Admin') {
        return '😎'
        } else if (post === 'User') {
        return '🙂'
        }
    }
  return (
      <dialog className={`${showLogin && 'flex'}  gap-2 flex-col -left-75 top-15 z-10 absolute ${isDark ? `${dark['dialog-bg-color']} ${dark.color}` : light['dialog-bg-color']} ${light.color} py-3 px-5 border ${dark['border-color']}`}>
        <h1 className='font-semibold tracking-tight'>hi, {username}! {reaction()}</h1>
        <Link to={`/Profile/${username}`} className={`font-semibold text-xl px-20 py-1 rounded-3xl flex items-center gap-2 cursor-pointer ${isDark ? `${dark['profile-btn-color']} ${dark['profile-btn-hover-color']}` : `${light['profile-btn-color']} ${light['profile-btn-hover-color']}`}`}> <CgProfile/> Profile</Link>
        <Link to={'/Membership'} className={`font-semibold text-xl px-20 py-1 rounded-3xl flex items-center gap-2 cursor-pointer ${isDark ? `${dark['profile-btn-color']} ${dark['profile-btn-hover-color']}` : `${light['profile-btn-color']} ${light['profile-btn-hover-color']}`}`}> <TbPremiumRights/> Membership</Link>
        <Link to={'/Personalization'} className={`font-semibold text-xl px-20 py-1 rounded-3xl flex items-center gap-2 cursor-pointer ${isDark ? `${dark['profile-btn-color']} ${dark['profile-btn-hover-color']}` : `${light['profile-btn-color']} ${light['profile-btn-hover-color']}`}`}> <FcPicture/> Personalization</Link>
        <Link to={'/AboutMe'} className={`font-semibold text-xl px-20 py-1 rounded-3xl flex items-center gap-2 cursor-pointer ${isDark ? `${dark['profile-btn-color']} ${dark['profile-btn-hover-color']}` : `${light['profile-btn-color']} ${light['profile-btn-hover-color']}`}`}> <MdInfo/> About Me</Link>
        <button onClick={logOut} title='LogOut' className={`bg-red-500 hover:bg-red-600 rounded cursor-pointer py-2 flex items-center justify-center gap-2 font-semibold`}><BiLogOut/>Logout</button>
      </dialog>
  )
}

export default LoginDialog
