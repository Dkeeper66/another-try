import './App.css'
import React, { useState } from 'react'


const Profile = ()=>{
  return(
    <>
    <img
    src='https://i.imgur.com/MK3eW3As.jpg'
    alt='nu hz kto'
    />
    </>
  )
}

export default function App(){
  const [task, setTask] = useState('')
  const [taskList, setTaskList] = useState([])
  const handleSubmit = (e)=>{
    e.preventDefault()
    const objTask ={
      name: task,
      status: 'true',
      id: Date.now()
    }
    setTaskList([...taskList,objTask])
    setTask('')
  }
  const listItems = taskList.map(({ name, id, status })=> <li key={id}>{name}, {id}, {status}</li>)
  return(
    <>
    <div>look at them</div>
    <Profile />
    <Profile />
    <Profile />
    <form onSubmit={handleSubmit}>
    <input 
    value={task}
    type='text'
    required
    onChange={(e)=>setTask(e.target.value)}
    />
    <button
    type='sumbit'
    >Sumbit</button>
    </form>
    <ul>{listItems}</ul>
    </>
  )
}