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

const Counters = ({taskList})=>{
  const doneCount = taskList.filter(task => task.status === true).length
  const undoneCount = taskList.filter(task => task.status === false).length
  const sumCount = taskList.length
  return(
    <>
    <div>Всего задач {sumCount}</div>
    <div>Выполнено {doneCount}</div>
    <div>Не выполнено {undoneCount}</div>
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
      status: false,
      id: Date.now()
    }
    setTaskList([...taskList,objTask])
    setTask('')
  }
  const toggleStatus = (id) =>{
    setTaskList(
      taskList.map((task) => 
        task.id === id ? {...task, status: !task.status} : task)
      )
  }
  
  const listItems = taskList.map(({ name, id, status })=>{
    let styleID = 'falseTask'
    if (status === true){styleID='trueTask'}
    return(
    <form className='taskshow' key={id}>
      <li id={styleID}>{name}, {id}, {status.toString()}</li>
      <input 
      type='checkbox'
      value={status}
      onChange={() => toggleStatus(id)}></input>
    </form>)}
)
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
    <Counters taskList={taskList}/>
    </>
  )
}