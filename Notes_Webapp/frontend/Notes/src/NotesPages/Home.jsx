'use client'
import React, { useEffect, useState } from 'react'
import NotesNav from '../Components/Notes_Components/NotesNav'
import NotesMain from '../Components/Notes_Components/NotesMain'
import Themes from '../Data/Themes.json'
import NotesDialog from '../Components/Notes_Components/NotesDialog'
import NotesSignup from './NotesSignup'
import axios from 'axios'
import { MdMoreHoriz } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdSaveAlt } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import LoginDialog from '../Components/Notes_Components/LoginDialog'
import Temp from '@/Components/Temporary_component/Temp'

const Home = () => {

  // temporary notice
  const [IsNoticeOpened, setIsNoticeOpened] = useState(() => {
    const openNotice = localStorage.getItem('temp')
    return openNotice ? JSON.parse(openNotice) : true
  })

  const Dark = Themes[0].banana[0].dark[0]
  const Light = Themes[0].banana[0].light[0]
  const [isOpened, setIsOpened] = useState(false)
  const [dialogType, setDialogType] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [voiceActive, setVoiceActive] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showErr, setshowErr] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loggedIn =  localStorage.getItem('login')
    return loggedIn ? JSON.parse(loggedIn) : false
  })
  const [showLogin, setShowLogin] = useState(false)
  const [userData, setUserData] = useState(() => {
    const data = localStorage.getItem('userData')
    return data ? JSON.parse(data) : null
  })
  // for options
  const [options, setOptions] = useState(null);
  const [showOptions, setShowOptions] = useState(null);

  // this is for saving the notes
  const [saveNotes, setSaveNotes] = useState(() => {
    const storedNotes = localStorage.getItem('Notes');
    return storedNotes ? JSON.parse(storedNotes) : []
  })
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [deletingNoteId, setDeletingNoteId] = useState(null)
  const [showNotes, setShowNotes] = useState('')

  const bg = () => {
    if (isDark) {
      return Dark.background
    } else { 
      return Light.background
    }
  }
  const Color = () => {
    if (isDark) {
      return Dark.color
    } else { 
      return Light.color
    }
  }
  const [isDark, setIsDark] = useState(()=> {
    const currentTheme = localStorage.getItem('themes');
    return currentTheme === "dark"
  })

  useEffect(() => {
    localStorage.setItem("themes", isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    localStorage.setItem("themes", window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  }, [])
  
  // notes functionality
  
  const MenuColor = () => {
    if (isDark) {
      return Dark['option-bg-color']
    } else {
      return Light['option-bg-color']
    }
  }
  const OptionBgClr = () => {
    if (isDark) {
      return Dark['option-bg-color']
    } else {
      return Light['option-bg-color']
    }
  }
  const notesBorderClr = () => {
    if (isDark) {
      return Dark['option-border-color']
    } else {
      return Light['option-border-color']
    }
  }
  const borderColor = () => {
    if (isDark) {
      return Dark['border-color']
    } else {
      return Light['border-color']
    }
  }
  const notesBgClr = () => {
    if (isDark) {
      return Dark['notes-bg-color']
    } else {
      return Light['notes-bg-color']
    }
  }
  const notesDescClr = () => {
    if (isDark) {
      return Dark['notes-desc-color']
    } else {
      return Light['notes-desc-color']
    }
  }
  

  const idGenerator = () => {
  return Date.now().toString()
  }

  const SetNote = () =>{
    if (dialogType === 'CreateNote') {
    const newNote = {
      id: idGenerator(),
      title: title,
      content: description
    } 
    setSaveNotes(note => [newNote, ...note])
    } else if (dialogType === 'EditNote' && editingNoteId) {
     setSaveNotes(saveNotes.map((note) => note.id === editingNoteId ? {...note, title: title, content: description} : note)) 
     setEditingNoteId(null)
     setTitle('')
     setDesc('')
    }
  }
  useEffect(() => {
    localStorage.setItem('Notes', JSON.stringify(saveNotes))
  }, [saveNotes])
  
  // render notes
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('Notes') || '[]')
    if (savedNotes.length > 0) {
      setShowNotes(
        savedNotes.map(note => {
        return <section key={note.id} onMouseEnter={() => {
          setShowOptions(note.id)
        }} onMouseLeave={() => {
          setShowOptions(null)
        }} className={`border-2  rounded-2xl ${borderColor()} bg-linear-145 ${notesBgClr()} backdrop-blur-xs to-60% to-transparent p-4 hover:scale-[1.01] transition-transform relative z-0 isolate`}>
          <div className='absolute  top-[20px] right-[20px]'>
          {/* More btn */}
            <button title='More Options' onClick={() => {
            setOptions(options === note.id ? null : note.id);
            }} className={`cursor-pointer  p-1 relative hover:bg-amber-50/10 rounded transition-colors ${showOptions === note.id ? "block" : "hidden"}`}><MdMoreHoriz className='text-2xl'/></button>
          {/* Option Menu */}
            <div className={` ${OptionBgClr()} border ${borderColor()} ${(options === note.id && showOptions === note.id) ? 'block' : 'hidden'} rounded-2xl p-2 absolute top-full z-[500] w-[140px] 
          h-[100px] `}>
            <ul className={`w-full h-full flex flex-col justify-center relative  list-none`}>
            <li><button onClick={() => {
            setOptions(null)
            setIsOpened(true)
            setDialogType('SaveNote')
            }} className={`flex w-full rounded items-center gap-2 px-1 border border-transparent cursor-pointer hover:border ${notesBorderClr()} hover:bg-white/3`}><MdSaveAlt/>Save Note</button></li>
            <li><button onClick={() => {
            setOptions(null)
            setIsOpened(true)
            setDialogType('EditNote')
            setEditingNoteId(note.id)
            }} className={`flex w-full rounded items-center gap-2 px-1 border border-transparent cursor-pointer hover:border ${notesBorderClr()} hover:bg-white/3`}><FaPen/>Edit Note</button></li>
            <li><button onClick={() => {
            setOptions(null)
            setIsOpened(true)
            setDeletingNoteId(note.id)
            setDialogType('DeleteNote')
            }} className='flex w-full cursor-pointer rounded items-center gap-2 px-1 text-red-500 border border-transparent  hover:border hover:border-red-500/50 hover:bg-red-500/5'><MdDelete className='text-red-500'/>Delete Note</button></li>
            </ul>
            </div>
          </div>
          <article className='mb-4'>
            <h1 className='text-3xl font-bold pr-7'>{note.title}</h1>
          </article>
          <article>
            <p className={`text-sm ${notesDescClr()}`}>{note.content}</p>
          </article>
        </section>
      }))
    } else {
      setShowNotes(
        <section className='absolute w-full h-full left-0 top-0 flex flex-col justify-center items-center'>
          <img className='selection:bg-transparent' src={isDark ? Dark['notes-icon'] : Light['notes-icon']} alt="" width={100} />
          <article className={`backdrop-blur-xs text-center font-semibold ${isDark ? Dark.color : Light.color} text-lg tracking-tight `}>
          There are currently No Notes 📝,<br />
          Let's Create One! 🖊️
          </article>
        </section>
      )
    }
  }, [saveNotes, isDark, options, showOptions])
    
    //create new note
    const PostNote = (e) => {
        e.preventDefault()
        if (title.length > 0 && description.length > 0) {
          if (dialogType === 'CreateNote') {
            setIsOpened(false)
            setTitle('')
            setDescription('')
            SetNote();
          } else if (dialogType === 'EditNote') {
            setIsOpened(false)
            setTitle('')
            setDescription('')
            SetNote();
          }
        }
    }
    const deleteNote = () => {
      if (deletingNoteId !== null) {
        setSaveNotes(prev => prev.filter(note => note.id !== deletingNoteId))
        setIsOpened(false)
        setDeletingNoteId(null)
      }
    }

      const SttHandler = () => { //pending
      setVoiceActive(!voiceActive)
    }

    const formHandling = async (e) => {
      e.preventDefault()
      if (username.length === 0 || password.length === 0) {
        setshowErr(true)
        setErrMessage('Please enter your username and password before Submitting')
      } else {
            try {
            const response = await axios.post('http://127.0.0.1:5000/login', {
              Username: username,
              Password: password
            })
              setIsCorrect(true)
              setshowErr(true)
              if (response.data.success) {
                setErrMessage(response.data.success)
                const data = {
                username: response.data.Username,
                email: response.data.Email,
                profilePic: response.data.ProfilePicture,
                post: response.data.Post,
                gender: response.data.Gender
                }
                localStorage.setItem('userData', JSON.stringify(data))
                setUserData(data)
                localStorage.setItem('login', JSON.stringify(true))
                setIsLoggedIn(true)
                
                setTimeout(() => {
                  setIsOpened(false)
                }, 2000);
              } else {
                setErrMessage(response.data.failed)
              }

            } catch (err) {
              setshowErr(true)
        setErrMessage('Something went wrong!')
        console.log(err)
            }
        setUsername('')
        setPassword('')
        setShowPassword(false)
      }
      setTimeout(() => {
        setshowErr(false)
        setErrMessage('')
      }, 5000);
    }

    const loginDialog = () => {
      setShowLogin(!showLogin)
    }
    const logOut = () => {
      localStorage.setItem('login', 'false')
      localStorage.setItem('userData', null)
      setIsLoggedIn(false)
      setShowLogin(false)
    }

    const CloseTempNotice = () => {
      localStorage.setItem('temp', JSON.stringify(false))
      setIsNoticeOpened(false)
    }

  return (
    <div className={`w-full flex flex-col min-h-screen ${bg()} ${Color()} p-0 m-0 box-border relative`}>
      {/* nav */}
      <NotesNav dark={isDark} setDark={setIsDark} darkTheme={Dark} lightTheme={Light} setType={setDialogType} setOpen={setIsOpened} isLoggedIn={isLoggedIn}loginDialog={loginDialog} profilePic={userData?.profilePic} showLogin={showLogin} username={userData?.username} logOut={logOut} post={userData?.post} />
      {/* Main */}
      <NotesMain dark={isDark} darkTheme={Dark} lightTheme={Light} showNotes={showNotes} saveNotes={saveNotes}/>
      {/* Dialog */}
      <NotesDialog editingNoteId={editingNoteId} dark={isDark} darkTheme={Dark} lightTheme={Light} setOpen={setIsOpened} type={dialogType}  isOpened={isOpened} PostNote={PostNote} deleteNote={deleteNote} SttHandler={SttHandler} formHandling={formHandling} title={title} setTitle={setTitle} description={description} setDescription={setDescription} username={username} setUsername={setUsername} password={password} setPassword={setPassword} voiceActive={voiceActive} setVoiceActive={setVoiceActive} showPassword={showPassword} setShowPassword={setShowPassword} saveNotes={saveNotes} setEditingNoteId={setEditingNoteId} errMessage={errMessage} showErr={showErr} isCorrect={isCorrect}/>
      
      <Temp isDark={isDark} dark={Dark} light={Light} CloseTempNotice={CloseTempNotice} IsNoticeOpened={IsNoticeOpened}/>
      </div>
  )
}

export default Home