import React, { useEffect, useState } from 'react'
import { data, Link, useParams } from 'react-router-dom'
import ProfileSidebar from './ProfileSidebar'
import Themes from '../../Data/Themes.json'
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdLibraryAddCheck } from "react-icons/md";
import { IoIosInformationCircle } from "react-icons/io";
import axios from 'axios';


const Profile = () => {
  const [profileDescription, setProfileDescription] = useState(() => {
    const description =  localStorage.getItem('profileDescription')
    return description ? description : ''
  })
  const [ShowChange, setShowChange] = useState(false)
  const [isWritten, setIsWritten] = useState(() => {
    const written = localStorage.getItem('writtenDesc')
    return written ? JSON.parse(written) : false
  })
  const [isSaved, setIsSaved] = useState(() => {
    const saved = localStorage.getItem('savedDesc')
    return saved ? JSON.parse(saved) : false
  })
  const [data, setData] = useState(() => {
    const user = localStorage.getItem('userData')
    return user ? JSON.parse(user) : null
  })
  const [isDark, setIsDark] = useState(() => {
    const currentTheme = localStorage.getItem('themes')
    return currentTheme === 'dark'
  })
  const [isOpened, setIsOpened] = useState(false)

  const [isPremium, setIsPremium] = useState(null)
  const [isVerified, setIsVerified] = useState(null)
  const [post, setPost] = useState(null)

  const storedGender = localStorage.getItem('userData')
  const gender = storedGender ? JSON.parse(storedGender).gender : null
  const [showGender, setShowGender] = useState({
    type: gender,
    write: ''
  })
  const dark = Themes[0].banana[0].dark[0]
  const light = Themes[0].banana[0].light[0]

  useEffect(() => {
    if (showGender.type === 'male') {
      setShowGender(prev => ({...prev, write: 'Male 👨'}))
      
    } else if (showGender.type === 'female') {
      setShowGender(prev => ({...prev, write: 'female 👧'}))
    }else if (showGender.type === 'others') {
      setShowGender(prev => ({...prev, write: 'Others'}))
    } else {
      setShowGender(prev => ({...prev, write: 'Select Gender'}))
    }
  }, [showGender.type])
  
  useEffect(() => {
    setTimeout(() => {
      
      const login = JSON.parse(localStorage.getItem('login'))
    if (login) {
      const dataFetcher = async () => {
        try {
          const Data = await axios.get('https://notes-backend-oi8m.onrender.com/moment_of_truth', {
            params: {username: data.username}
          })
          setIsPremium(Data.data.premium);
          setIsVerified(Data.data.verified);
          setPost(Data.data.post);
        } catch (error) {
          console.log(error);
        }
      }
      dataFetcher(); 
    }

    }, 500);
    
  }, [])
  

  const saveProfileDesc = () => {
    if (profileDescription.length > 0) {
      localStorage.setItem('profileDescription', profileDescription)
      localStorage.setItem('writtenDesc', JSON.stringify(!isWritten))
      setIsWritten(!isWritten)
      localStorage.setItem('savedDesc', JSON.stringify(!isSaved))
      setIsSaved(!isSaved)
    }
    else if (isWritten === true || isSaved === true){
       localStorage.setItem('writtenDesc', JSON.stringify(!isWritten))
      setIsWritten(!isWritten)
      localStorage.setItem('savedDesc', JSON.stringify(!isSaved))
      setIsSaved(!isSaved)
    }
    else {
      setProfileDescription('Bro, set your description before hitting that save button')
      setTimeout(() => {
        setProfileDescription('')
      }, 1500);
    }
  }

  useEffect(() => {
    const description = localStorage.getItem('profileDescription')
     description ? setProfileDescription(description) : ''
  }, [saveProfileDesc])
  

  return (
    <section className={` ${isDark ? `${dark['dashboard-bg-color']} ${dark.color}` : `${light['dashboard-bg-color']} ${light.color}`} min-h-screen grid grid-cols-[20%_80%] `}>
      <ProfileSidebar/>
      <section className='p-5 w-full'>
        <h1 className='text-4xl font-bold'>Profile</h1>
        <hr className={`my-2 w-[60%] border-zinc-600`}/>
        
      <article className='p-5 md:flex  gap-5'>
        <div className='flex items-center'>
          <div className='relative ' onMouseEnter={() => setShowChange(true)} onMouseLeave={() => setShowChange(false)}>
        <img src={data?.profilePic} alt="Profile" height={100} width={130} 
        className='bg-zinc-700 absolute rounded-full md:mb-0 mb-5 top-1/2 left-1/2 -translate-1/2 '/>
        <Link to={'/Personalization'}>
        <img src="https://res.cloudinary.com/dncscskiw/image/upload/v1755171303/n3krnuznqnadcrgfudgf.png" width={200} className={`relative z-[400] top-0 border-transparent ${!isPremium && 'opacity-0'}`} alt="VIP" /></Link>
        <div  className={`inset-0 absolute w-full h-full z-20 bg-black/20 rounded-full ${ShowChange ? 'block' : 'hidden'}`}></div>
        <div className={`absolute z-40 w-full top-1/2 text-xs text-center pointer-events-none font-semibold ${ShowChange ? 'block' : 'hidden'}`}>Change Picture</div>
        </div>
        </div>
        <div className={`flex flex-col gap-3 grow`}>
        <h1 className='text-3xl font-semibold'>{data?.username} <span className='text-xs bg-amber-500 p-1 px-2 text-[#5a450f] rounded-2xl mr-1'>{post === 'Admin' && `Admin`} </span> <span className={`text-xs bg-[#ffca2d] p-1 px-2 ${post === 'Admin' && `hidden`} text-[#5a450f] rounded-2xl `}>{isPremium && `VIP`}</span></h1>
        <div className='relative md:w-[80%]'>
        <textarea name="profileDescription" className={`resize-none rounded ${isWritten && 'pointer-events-none cursor-no-drop'} outline-none w-full h-[150px] border ${isDark ? dark['border-color'] : light['border-color']} p-2`} value={profileDescription} onChange={(e) => {
          setProfileDescription(e.target.value)
        }} placeholder='Wanna set Description?...'/>
        <button onClick={saveProfileDesc} className={`${isDark ? dark['accent-Color'] : light['accent-Color']} px-3 py-1 z-20 rounded absolute right-0 bottom-0 m-5 cursor-pointer font-semibold`}>{isSaved ? "Edit" : 'Save'}</button>
        </div>
        </div>
      </article>
      <section className='p-3 w-full'>
        <h1 className='text-lg font-semibold'>Email</h1>
        <div className='relative w-[40%]'>
        <input disabled className={`border ${isDark ? dark['border-color'] : light['border-color']} my-2 w-full p-2 rounded cursor-no-drop`} type="text" placeholder={data?.email}/>
        <span className='absolute top-1/2 -translate-y-1/2 right-5'>
        {isVerified ? <MdLibraryAddCheck className='text-green-600'/> : <IoIosInformationCircle className='text-amber-500'/>}
        </span>
        </div>
      <article>
        <h1 className='font-semibold my-3'>Select Gender</h1>
        <div className='relative w-fit'>
        <button onClick={() => {
          setIsOpened(!isOpened)
        }} className={`border  px-5 py-2 ${isDark ? dark['border-color']: light['border-color']} flex items-center gap-2 rounded cursor-pointer`}>{showGender.write} <MdKeyboardArrowDown/> </button>
        <article className={`${isDark ? dark['option-bg-color']: light['option-bg-color']} py-1 ${isOpened ?'flex' : 'hidden'} absolute w-full flex-col rounded-2xl overflow-hidden`}>
          <button onClick={() => {
            setShowGender(prev => ({...prev, type: 'male'}))
            setIsOpened(false)
          }} className={` py-1 hover:border-zinc-600 border border-transparent cursor-pointer ${showGender.type === 'male' && `${isDark ? dark['border-color'] : light['border-color']} pointer-events-none bg-amber-200/40`} rounded-2xl px-8`}>Male 👨</button>
          <button onClick={() => {
            setShowGender(prev => ({...prev, type: 'female'}))
            setIsOpened(false)
          }} className={`py-1 hover:border-zinc-600 border border-transparent cursor-pointer ${showGender.type === 'female' && `${isDark ? dark['border-color'] : light['border-color']} pointer-events-none bg-amber-200/60`} rounded-2xl`}>Female 👧</button>
          <button onClick={() => {
            setShowGender(prev => ({...prev, type: 'others'}))
            setIsOpened(false)
          }} className={`py-1 hover:border-zinc-600 border border-transparent cursor-pointer ${showGender.type === 'others' && `${isDark ? dark['border-color'] : light['border-color']} pointer-events-none bg-amber-200/60`} rounded-2xl`}>Others..</button>
        </article>
        </div>
      </article>
      </section>
      </section>
    </section>
  )
}

export default Profile