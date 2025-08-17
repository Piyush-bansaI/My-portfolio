import React, { useState } from 'react'

const NotesMain = ({ dark, darkTheme, lightTheme, showNotes, saveNotes }) => {
  return (
    <main className='notes-main px-1 sm:px-5 z-0 grid gap-2.5'>
      {showNotes}
    </main>
  )
}

export default NotesMain
