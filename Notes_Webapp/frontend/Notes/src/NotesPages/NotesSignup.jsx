import React, { useEffect, useState } from 'react'
import MoreLinks from '../Components/Signup_Component/MoreLinks';
import ThemeToggle from '../Components/Signup_Component/ThemeToggle';
import SignupForm from '../Components/Signup_Component/SignupForm';
import axios from 'axios';
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from 'react-icons/io';
import { Navigate, useNavigate } from 'react-router-dom';

const NotesSignup = () => {
  const [isDark, setIsDark] = useState(() => {
    const theme = localStorage.getItem('themes')
    return theme === 'dark'
  })
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [errMessage, seterrMessage] = useState('')
  const [errColor, setErrColor] = useState(false)
  const [preventLayoutShift, setPreventLayoutShift] = useState(true)
  const Navigate = useNavigate();
  const [isWrong, setIsWrong] = useState({
    Username : false,
    Email : false,
    Password : false,
    RePassword : false
  })

  useEffect(() => {
    localStorage.setItem('themes', isDark ? 'dark' : 'light')
  }, [isDark])
  const changeTheme = () => {
    setIsDark(!isDark)
  }

  const signUpHandlng = async (e) => {
    e.preventDefault()
    if (username.length === 0 && email.length === 0 && password.length === 0) {
      setPreventLayoutShift(false)
      setIsWrong({
        Username: true,
        Email: true,
        Password: true,
        RePassword: true
      });
      seterrMessage(
          <article className={`w-fit rounded border py-2 px-5 flex gap-1 items-center ${ errColor ?'bg-[#a79b75]/50 border-[#c3b589]' : 'bg-red-500/50 border-red-600'} `}> {errColor ? <article className='bg-amber-200/60 py-0.5 px-3 rounded-full font-semibold'>i</article> : <IoMdClose className='bg-red-600 rounded-full p-0.5'/>} Please enter the Information before submitting</article>
      )
    } //pending
    else if (username.length === 0 || email.length === 0 || password.length === 0) {
      if (username.length === 0) {
        setIsWrong({
        Username: true,
      });
      seterrMessage(
          <article className={`w-fit rounded border py-2 px-5 flex gap-1 items-center ${ errColor ?'bg-[#a79b75]/50 border-[#c3b589]' : 'bg-red-500/50 border-red-600'} `}> {errColor ? <article className='bg-amber-200/60 py-0.5 px-3 rounded-full font-semibold'>i</article> : <IoMdClose className='bg-red-600 rounded-full p-0.5'/>} <span>Please enter your <b>Username</b> before submitting</span></article>
      )
      
      } else if (email.length === 0 && password.length === 0) {
        setIsWrong({
        Email: true,
        Password: true
      });
      seterrMessage(
          <article className={`w-fit rounded border py-2 px-5 flex gap-1 items-center ${ errColor ?'bg-[#a79b75]/50 border-[#c3b589]' : 'bg-red-500/50 border-red-600'} `}> {errColor ? <article className='bg-amber-200/60 py-0.5 px-3 rounded-full font-semibold'>i</article> : <IoMdClose className='bg-red-600 rounded-full p-0.5'/>} <span>Please enter your <b>Email & Password</b> before submitting</span> </article>
      )
      } else if (email.length === 0) {
        setIsWrong({
        Email: true
      });
      seterrMessage(
          <article className={`w-fit rounded border py-2 px-5 ${ errColor ?'bg-[#a79b75]/50 border-[#a79b75]' : 'bg-red-500/50 border-red-600'} `}> <span>Please enter your <b>Email</b> before submitting
            </span></article>
        )
      } 
      else if (password.length === 0) {
        setIsWrong({
        Password: true
      });
      seterrMessage(
          <article className={`w-fit rounded border py-2 px-5 ${ errColor ?'bg-[#a79b75]/50 border-[#a79b75]' : 'bg-red-500/50 border-red-600'} `}> <span>Please enter your <b>Password</b> before submitting
            </span></article>
        )
      }
    } else if (!email.includes('@') || !email.includes('.')) {
      setPreventLayoutShift(false)
      setIsWrong({
        Email: true,
      });
      seterrMessage(
          <article className={`w-fit rounded border py-2 px-5 flex gap-1 items-center ${ errColor ?'bg-[#a79b75]/50 border-[#c3b589]' : 'bg-red-500/50 border-red-600'} `}> {errColor ? <article className='bg-amber-200/60 py-0.5 px-3 rounded-full font-semibold'>i</article> : <IoMdClose className='bg-red-600 rounded-full p-0.5'/>} Please enter valid Email</article>
      )
    } else if (!/[a-z]/.test(password) || 
    !/[A-Z]/.test(password) || 
    !/[0-9]/.test(password) || 
    !/[!@#$%&*]/.test(password)) {
      setIsWrong({
        Password: true
      });
      if (!/[a-z]/.test(password)) {
      setErrColor(true)
      setPreventLayoutShift(false)
      seterrMessage(
          <article className={`w-fit rounded border py-2 px-5 flex gap-1 items-center ${ errColor ?'bg-[#a79b75]/50 border-[#c3b589]' : 'bg-red-500/50 border-red-600'} `}> {errColor ? <article className='bg-amber-200/60 py-0.5 px-3 rounded-full font-semibold'>i</article> : <IoMdClose className='bg-red-600 rounded-full p-0.5'/>} <span>The password Must Contain a lower case letters from <b>a-z</b>
            </span> </article>
      )
      } else if (!/[A-Z]/.test(password)) {
        setPreventLayoutShift(false)
        setErrColor(true)
      seterrMessage(
          <article className={`w-fit rounded border py-2 px-5 flex gap-1 items-center ${ errColor ?'bg-[#a79b75]/50 border-[#c3b589]' : 'bg-red-500/50 border-red-600'} `}> {errColor ? <article className='bg-amber-200/60 py-0.5 px-3 rounded-full font-semibold'>i</article> : <IoMdClose className='bg-red-600 rounded-full p-0.5'/>}  <span>The password Must Contain a uppercase case letters from <b>A-Z</b>
            </span></article>
      )
      } else if (!/[1-9]/.test(password)) {
        setPreventLayoutShift(false)
        setErrColor(true)
      seterrMessage(
          <article className={`w-fit rounded border py-2 px-5 flex gap-1 items-center ${ errColor ?'bg-[#a79b75]/50 border-[#c3b589]' : 'bg-red-500/50 border-red-600'} `}> {errColor ? <article className='bg-amber-200/60 py-0.5 px-3 rounded-full font-semibold'>i</article> : <IoMdClose className='bg-red-600 rounded-full p-0.5'/>} <span>The password Must Contain a number case letters from <b>1-9</b>
            </span> </article>
      )
      } else if (!/[@#$%&*]/.test(password)) {
        setPreventLayoutShift(false)
        setErrColor(true)
      seterrMessage(
          <article className={`w-fit rounded border py-2 px-5 flex gap-1 items-center ${ errColor ?'bg-[#a79b75]/50 border-[#c3b589]' : 'bg-red-500/50 border-red-600'} `}> {errColor ? <article className='bg-amber-200/60 py-0.5 px-3 rounded-full font-semibold'>i</article> : <IoMdClose className='bg-red-600 rounded-full p-0.5'/>} <span>The password Must Contain a Special character like <b>@#$%&*</b>
            </span> </article>
      )
      } else {
        setPreventLayoutShift(false)
          seterrMessage(
          <article className={`w-fit rounded border py-2 px-5 flex gap-1 items-center ${ errColor ?'bg-[#a79b75]/50 border-[#c3b589]' : 'bg-red-500/50 border-red-600'} `}> {errColor ? <article className='bg-amber-200/60 py-0.5 px-3 rounded-full font-semibold'>i</article> : <IoMdClose className='bg-red-600 rounded-full p-0.5'/>} Error! </article>
      )
      }
    } else if (password !== rePassword) {
        setPreventLayoutShift(false)
        setIsWrong({
        Password: true,
        RePassword: true
      });
          seterrMessage(
          <article className={`w-fit rounded border py-2 px-5 flex gap-1 items-center ${ errColor ?'bg-[#a79b75]/50 border-[#c3b589]' : 'bg-red-500/50 border-red-600'} `}> {errColor ? <article className='bg-amber-200/60 py-0.5 px-3 rounded-full font-semibold'>i</article> : <IoMdClose className='bg-red-600 rounded-full p-0.5'/>} <span>your <b>Password</b> does not match with <b>Re-Password</b></span></article>
      )
    } else {
      try {
        const dataSender = await axios.post('https://notes-backend-oi8m.onrender.com/signup', {
          username: username,
          email: email,
          password: password, 
          rePassword: rePassword
        })
        if (dataSender.data.success) {
          setPreventLayoutShift(false)
          seterrMessage(
          <article className={`w-fit rounded border py-2 px-5 flex gap-1 items-center bg-green-700/50 border-green-400`}><IoMdCheckmark className='bg-green-400 rounded-full p-0.5'/>{dataSender.data.success}</article>
        )
        setTimeout(() => {
          Navigate('/')
        }, 1000);
        } else if (dataSender.data.problem) {
          setPreventLayoutShift(false)
          seterrMessage(
          <article className={`w-fit rounded border py-2 px-5 flex gap-1 items-center ${ errColor ?'bg-[#a79b75]/50 border-[#c3b589]' : 'bg-red-500/50 border-red-600'} `}> {errColor ? <article className='bg-amber-200/60 py-0.5 px-3 rounded-full font-semibold'>i</article> : <IoMdClose className='bg-red-600 rounded-full p-0.5'/>}{dataSender.data.problem}</article>
      )
        setTimeout(() => {
          seterrMessage('')
        }, 5000);
      } else if (dataSender.data.info) {
        setPreventLayoutShift(false)
          seterrMessage(
          <article className={`w-fit rounded border py-2 px-5 flex gap-1 items-center bg-[#a79b75]/50 border-[#c3b589]`}><article className='bg-amber-200/60 py-0.5 px-3 rounded-full font-semibold'>i</article>{dataSender.data.info}</article>
      )
        setTimeout(() => {
          seterrMessage('')
        }, 5000);}

      } catch (err) {
        seterrMessage(
          <article className={`w-fit rounded border py-2 px-5 flex gap-1 items-center ${ errColor ?'bg-[#a79b75]/50 border-[#c3b589]' : 'bg-red-500/50 border-red-600'} `}> {errColor ? <article className='bg-amber-200/60 py-0.5 px-3 rounded-full font-semibold'>i</article> : <IoMdClose className='bg-red-600 rounded-full p-0.5'/>}Something Went wrong! 😓</article>
      )
        console.log(err)
      }
    }
    setTimeout(() => {
      setPreventLayoutShift(true)
      seterrMessage('')
      setErrColor(false)
      setIsWrong({
        Username: false,
        Email: false,
        Password: false,
        RePassword: false
      })
    }, 5000);
  }


  return (
    <div className={`${isDark ?' bg-zinc-900 text-white selection:bg-[#ffedbb]/30' : 'bg-zinc-200 text-black selection:bg-[#baa670]/50'}  transition-colors min-h-screen flex justify-center items-center w-full`}>
      <section className='h-[90%]  overflow-hidden z-0 relative w-[95%] sm:w-[70%] rounded-[50px] md:rounded-[100px] shadow-black shadow-sm'>
        <img src="https://res.cloudinary.com/dncscskiw/image/upload/v1754657487/g4rdgvngdsg0av7vchow.png" className='absolute hidden sm:block z-[-1] w-full h-full' alt="Banana-background" />
      <main className={` z-50 w-[600px] max-w-full lg:w-[60%] rounded-tr-[50px] md:rounded-tr-[100px] rounded-br-[50px] md:rounded-br-[100px] h-full ${isDark ? 'bg-zinc-800' : 'bg-[#d7d5c8]'} transition-colors shadow-md shadow-black p-5 sm:p-10 lg:p-15`}><h1 className='text-4xl font-bold'>Create Account 👤
      </h1>
      <SignupForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} email={email} setEmail={setEmail} signUpHandlng={signUpHandlng} isDark={isDark} errMessage={errMessage} preventLayoutShift={preventLayoutShift} rePassword={rePassword} setRePassword={setRePassword} isWrong={isWrong}/>
      </main>
      </section>
      <MoreLinks/>
      <ThemeToggle changeTheme={changeTheme} isDark={isDark}/>
    </div>
  )
}

export default NotesSignup
