import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AiFillInfoCircle } from "react-icons/ai";
import { ImExit } from "react-icons/im";
const Navbar = ({ Data, dark, light, isDark }) => {
    const linkStyle = () => {
        return `flex items-center tracking-tight p-2 rounded-xl transition-colors `
    }
  return (
    <article className='flex flex-col my-3 text-xl px-3 gap-2'>
      <NavLink to={`/Profile/${Data.username}`} className={({ isActive }) => { return isActive ? `${isDark ? `${dark['dashboard-active-btn-color']} ${dark['dashboard-active-hover-btn-color']}` : `${light['dashboard-active-btn-color']} ${light['dashboard-active-hover-btn-color']}`}  ${linkStyle()}` : `${isDark ? dark['dashboard-link-hover-color'] : light['dashboard-link-hover-color']} ${linkStyle()}`
        }}><span className='grow'> Profile </span>👥</NavLink>
      <NavLink to={'/Membership'} className={({ isActive }) => { return isActive ? `${isDark ? `${dark['dashboard-active-btn-color']} ${dark['dashboard-active-hover-btn-color']}` : `${light['dashboard-active-btn-color']} ${light['dashboard-active-hover-btn-color']}`}  ${linkStyle()}` : `${isDark ? dark['dashboard-link-hover-color'] : light['dashboard-link-hover-color']} ${linkStyle()}`
        }}><span className='grow'> Membership</span>👑</NavLink>
      <NavLink to={'/Personalization'} className={({ isActive }) => { return isActive ? `${isDark ? `${dark['dashboard-active-btn-color']} ${dark['dashboard-active-hover-btn-color']}` : `${light['dashboard-active-btn-color']} ${light['dashboard-active-hover-btn-color']}`}  ${linkStyle()}` : `${isDark ? dark['dashboard-link-hover-color'] : light['dashboard-link-hover-color']} ${linkStyle()}`
        }}><span className='grow'> Personalization</span>⛰️</NavLink>
      <NavLink to={'/AboutMe'} className={({ isActive }) => { return isActive ? `${isDark ? `${dark['dashboard-active-btn-color']} ${dark['dashboard-active-hover-btn-color']}` : `${light['dashboard-active-btn-color']} ${light['dashboard-active-hover-btn-color']}`}  ${linkStyle()}` : `${isDark ? dark['dashboard-link-hover-color'] : light['dashboard-link-hover-color']} ${linkStyle()}`
        }}><span className='grow'>About Me</span> <AiFillInfoCircle/> </NavLink>
      <Link to={'/'} className={`${linkStyle()}hover:bg-red-600/30`}><span className='grow'>Go Back </span><ImExit/></Link>
    </article>
  )
}

export default Navbar
