import React, { useEffect, useState } from 'react'
import Home from './NotesPages/Home'
import { Route, Routes } from 'react-router-dom'
import NotesSignup from './NotesPages/NotesSignup'
import Profile from './Components/Profile_Components/Profile'
import Membership from './Components/Profile_Components/Membership'
import AboutMe from './Components/Profile_Components/AboutMe'
import Personalization from './Components/Profile_Components/Personalization'
import ProfilePic from './Components/Personalization_components/ProfilePic'
import ThemeSelection from './Components/Personalization_components/ThemeSelection'


const App = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/Signup' element={<NotesSignup/>} />
      <Route path='/Profile/*' element={<Profile/>}/>
      <Route path='/Membership' element={<Membership/>}/>
      <Route path='/Personalization' element={<Personalization/>}/>
      <Route path='/AboutMe' element={<AboutMe/>}/>
      <Route path='/Personalization/ProfilePic' element={<ProfilePic/>}/>
      <Route path='/Personalization/ThemeSelection' element={<ThemeSelection/>}/>
      </Routes>
    </div>
  )
}

export default App
