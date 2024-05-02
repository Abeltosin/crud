import React, { useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { addUsers } from './userData/userSlice'
import { nanoid } from '@reduxjs/toolkit'

const AddUsers = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const dispatchUsers = () => {
        dispatch(addUsers({id: nanoid(), name: name, email: email}))
    }
  return (
    <div className='ms-2'>
      <h3>Add Users</h3>
      <label htmlFor="">Name</label> <br />
      <input type="text" onChange={e => {
        setName(e.target.value)
      }}placeholder='Enter Name' /> <br /> <br />

    <label htmlFor="">Email</label> <br />
      <input type="text" onChange={e => {
        setEmail(e.target.value)
      }} placeholder='Enter Email' /> <br /> <br />
      <button className='btn btn-primary text-light' onClick={dispatchUsers}>Add User</button>
    </div>
  )
}

export default AddUsers
