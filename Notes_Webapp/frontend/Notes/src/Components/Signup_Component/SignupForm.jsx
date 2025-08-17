import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { AiOutlineEnter } from "react-icons/ai";

const SignupForm = ({ username, setUsername, email, setEmail, password, setPassword, rePassword, setRePassword,signUpHandlng, isDark, errMessage, preventLayoutShift, isWrong }) => {
    const [isUsernameFocused, setIsUsernameFocused] = useState(false)
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isRePasswordFocused, setIsRePasswordFocused] = useState(false)
    const [showRePassword, setShowRePassword] = useState(false)
    const [isRePasswordActive, setIsRePasswordActive] = useState(false)
    useEffect(() => {
      if (password.length > 0) {
        setIsRePasswordActive(true)
      } else {
        setIsRePasswordActive(false)
      }
    }, [password])
    
    const usernameFocus = () => {
      setIsUsernameFocused(true)
    }
    const usernameUnFocus = () => {
      setIsUsernameFocused(false)
    }
    const emailFocus = () => {
      setIsEmailFocused(true)
    }
    const emailUnFocus = () => {
      setIsEmailFocused(false)
    }
    const passwordFocus = () => {
      setIsPasswordFocused(true)
    }
    const passwordUnFocus = () => {
      setIsPasswordFocused(false)
    }
    const rePasswordFocus = () => {
      setIsRePasswordFocused(true)
    }
    const rePasswordUnFocus = () => {
      setIsRePasswordFocused(false)
    }
    const inputFocused = () => {
      return `top-1 text-sm ${labelTextTheme()}`
    }
    const labelTextTheme = () => {
      if (isDark) {
        return 'text-white/50'
      } else {
        return 'text-black/50'
      }
    }
    const showPass = () => {
      setShowPassword(!showPassword)
    }
    const showRePass = () => {
      setShowRePassword(!showRePassword)
    }
  return (
    <section>
      <form onSubmit={signUpHandlng} className='flex flex-col gap-5 mb-10 mt-5'>
        <section className={`flex justify-center ${preventLayoutShift && 'my-3.5'}`}>
          {errMessage}
          </section>
        <div className='relative'>
            <div className={`flex ${ isWrong.Username ? 'bg-red-600/70': 'bg-[#a79b75]'}  rounded-xl items-center`}> 
            <div className='px-1 sm:px-2 py-1 text-2xl'>👥</div>
            <input autoComplete='off' className={`border ${isDark ? 'bg-zinc-800' : 'bg-[#d7d5c8]'} outline-none focus:border-[#8f7d42] ${ isWrong.Username && 'border-red-400'} transition-colors w-[95%] px-3 pt-4 h-[50px] rounded-xl`} onFocus={usernameFocus} onBlur={usernameUnFocus} type="text" id='username' name='username' value={username} onChange={(e) => {
              setUsername(e.target.value)
            }}/>
            </div>
            <label className={`absolute left-15 ${(isUsernameFocused || username.length > 0) ? inputFocused() : 'top-1/2 -translate-y-1/2'} transition-all`} htmlFor="username">Username</label>
        </div>
        <div className='relative'>
            <div className={`flex ${ isWrong.Email ? 'bg-red-600/70': 'bg-[#a79b75]'} rounded-xl items-center`}> 
            <div className='px-1 sm:px-2 py-1 text-2xl'>📧</div>
            <input className={`border ${isDark ? 'bg-zinc-800' : 'bg-[#d7d5c8]'} outline-none ${ isWrong.Email && 'border-red-400'} focus:border-[#ac964d] transition-colors pt-4 w-[95%] px-3 h-[50px] rounded-xl`} type="text" id='email' name='email' value={email} onFocus={emailFocus} onBlur={emailUnFocus} onChange={(e) => {
              setEmail(e.target.value)
            }}/>
            </div>
            <label className={`absolute left-15 ${(isEmailFocused || email.length > 0) ? inputFocused() : 'top-1/2 -translate-y-1/2'} transition-all`} htmlFor="email">Email</label>
        </div>
        <div className='relative'>
            <div className={`flex ${ isWrong.Password ? 'bg-red-600/70': 'bg-[#a79b75]'} rounded-xl items-center`}> 
            <div className='px-1 sm:px-2 py-1 text-2xl relative'>🔑</div>
            <input className={`border ${isDark ? 'bg-zinc-800' : 'bg-[#d7d5c8]'} outline-none ${ isWrong.Password && 'border-red-400'} focus:border-[#ac964d] transition-colors w-[95%] px-3 pr-13 pt-4 h-[50px] rounded-xl`} type={`${showPassword ? 'text' : 'password'}`} id='password' name='password' value={password} onFocus={passwordFocus} onBlur={passwordUnFocus} onChange={(e) => {
              setPassword(e.target.value)
            }}/>
            <button onClick={showPass} type='button' className={`absolute right-5 text-2xl cursor-pointer ${!isRePasswordActive && 'hidden'}`}>{showPassword ? <IoIosEyeOff/> : <IoMdEye/> }</button>
            </div>
            <label className={`absolute left-15 ${(isPasswordFocused || password.length > 0) ? inputFocused() : 'top-1/2 -translate-y-1/2'} transition-all`}
            htmlFor="password">Password</label>
        </div>
        <div className={`relative ${isRePasswordActive ? 'show-animation' : 'hidden'}`}>
            <div className='flex  rounded-xl'> 
            <div className='px-1 ml-2 py-1 text-2xl relative'><AiOutlineEnter className={`rotate-y-180 ${isDark ? 'text-white/50' : 'text-black/50'}`}/></div>
            <input className={`border ${isDark ? 'bg-zinc-800' : 'bg-[#d7d5c8]'} outline-none focus:border-[#ac964d] transition-colors ${ isWrong.Email && 'border-red-400'} w-[95%] px-3 pr-13 pt-4 h-[50px] rounded-xl`} type={`${showRePassword ? 'text' : 'password'}`} id='re-password' name='re-password' value={rePassword} onFocus={rePasswordFocus} onBlur={rePasswordUnFocus} onChange={(e) => {
              setRePassword(e.target.value)
            }}/>
            <button onClick={showRePass} type='button' className='absolute right-5 text-2xl cursor-pointer top-1/2 -translate-y-1/2'>{showRePassword ? <IoIosEyeOff/> : <IoMdEye/> }</button>
            </div>
            <label className={`absolute left-14 ${(isRePasswordFocused || rePassword.length > 0) ? inputFocused() : 'top-1/2 -translate-y-1/2'} transition-all`}
            htmlFor="re-password">Repeat Password</label>
        </div>
        <div className='flex justify-center'>
        <button type='submit' className='rounded-2xl bg-[#ac964d] hover:bg-[#8a783e] text-xl font-semibold cursor-pointer w-[50%] py-4'>SignUp</button>
        </div>
        <p className='text-center text-sm tracking-tight'>already have an account?<Link to={'/'} className='ml-1 text-[#ac964d] hover:underline font-semibold'>Login</Link></p>
      </form>
    </section>
  )
}

export default SignupForm
