import './App.css'
import React from 'react'



const Profile = (props)=>{
  let isTrue = props.isTrue
  return(
    <>
    <img
    src='https://i.imgur.com/MK3eW3As.jpg'
    alt='nu hz kto'
    />
    <h1>O kak {isTrue && 'vot tak'} </h1>
    </>
  )
}

export default function App(){
  
  return(
    <>
    <div>look at them</div>
    <Profile isTrue = {true}/>
    <Profile isTrue = {false}/>
    <Profile isTrue = {true}/>
    </>
  )
}