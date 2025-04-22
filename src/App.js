import './App.css'
import React, { useState } from 'react'



const Counters = ({taskList})=>{
  const doneCount = taskList.filter(task => task.status === true).length
  const undoneCount = taskList.filter(task => task.status !== true).length
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
  const [editedTask, setEditedTask] = useState(null)
  const [showEdit, setShowEdit] = useState(null)
  const [showDelete, setShowDelete] = useState(false)
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

  const handleEdit = (taskObj) =>{
    setEditedTask(taskObj.id)
    setTask(taskObj.name)
    setShowEdit(taskObj.id)
  }

  const handleSave = (e) =>{
    e.preventDefault()
    if (editedTask){
      setTaskList(
        taskList.map((t)=> t.id === editedTask ? {...t, name: task}:t)
      )
      setEditedTask(null)
      setTask('')
      setShowEdit(null)
    }
  }

  const handleDelete = ({id})=>{
    const newList = taskList.filter(task => task.id !== id)
    setTaskList(newList)

  }

  const handleDeleteAll = ()=>{
    setShowDelete(true)
    }
  
  
  const listItems = taskList.map(({ name, id, status })=>{
    let styleID = 'falseTask'
    if (status === true){styleID='trueTask'}

    return(
    <div className='taskshow' key={id}>
      <li id={styleID}>{name}, {id}, {status.toString()}</li>
      <div>
        {showEdit !== id && (
          <button type='button' onClick={() => handleEdit({name, id})}>
            Редактировать
            </button>
          )}
      </div>
      <div>
        {showEdit === id && (
          <form onSubmit={handleSave}>
            <input 
            type='text' 
            placeholder={name} 
            value={task} 
            onChange={(e)=>setTask(e.target.value)}>
            </input>
            <button
            type='submit'>
              сохранить
            </button>
          </form>)}
      </div>
      <input 
      type='checkbox'
      checked={status}
      onChange={() => toggleStatus(id)}></input>
      <button
      type='button'
      onClick={() => handleDelete({id})}
      >
        Удалить
      </button>
    </div>)}
)
  return(
    <>
    <h1>ToDo</h1>
    <form onSubmit={handleSubmit}>
    <input 
    value={task}
    type='text'
    required
    onChange={(e)=>setTask(e.target.value)}
    disabled={editedTask !== null}
    />
    <button
    type='sumbit'
    disabled={editedTask !== null}
    >Sumbit</button>
    </form>
    <ul>{listItems}</ul>
    <button
    type='button'
    onClick={handleDeleteAll}
    >
      Удалить всё
    </button>
    
    {showDelete && (
      <div>
        <p>Удалить всё?</p>
        <button type='button' onClick={()=> {setTaskList([])
          setShowDelete(false)
        }}>Да</button>
        <button type='button' onClick={() => setShowDelete(false)}>Нет</button>
      </div>
    )}
      
    <Counters taskList={taskList}/>
    </>
  )
}