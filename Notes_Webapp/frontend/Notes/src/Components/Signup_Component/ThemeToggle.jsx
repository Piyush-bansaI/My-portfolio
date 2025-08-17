import React from 'react'

const ThemeToggle = ({ changeTheme, isDark }) => {
  return (
      <button onClick={changeTheme} className='absolute top-0 flex flex-col gap-3 right-0 m-5 text-xl cursor-pointer'>{isDark? '☀️' : '🌙' }</button>
  )
}

export default ThemeToggle
