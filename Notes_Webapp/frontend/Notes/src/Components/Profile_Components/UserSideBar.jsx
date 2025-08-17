import React from 'react'

const UserSideBar = ({ post, Data, dark, light, isDark }) => {
  return (
    <section>
        <article className='p-3'>
        <img src={Data.profilePic} alt="Profile-pic" width={40} height={40} className='my-2 rounded-full bg-zinc-700'/>
        <h1 className='text-lg font-semibold'>{Data.username} {post}</h1>
        <p className={`text-xs tracking-tight ${isDark ? dark['not-imp-color'] : light['not-imp-color']}`}>{Data.email}</p>
        </article>
      </section>
  )
}

export default UserSideBar
