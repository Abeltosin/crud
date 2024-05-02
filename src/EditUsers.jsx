import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editUsers, selectUsers } from './userData/userSlice'
import { useParams } from 'react-router-dom'

const EditUsers = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const updateUser = useSelector(selectUsers)
    const actualUser = Array.isArray(updateUser) ? updateUser.find(user => String(user.id) === id) : null
    const [name, setName] = useState(actualUser ? actualUser.name : '')
    const [email, setEmail] = useState(actualUser ? actualUser.email : '')

    const [showToast, setShowToast] = useState(false);

    const dispatchUsers = () => {
        const sure = window.confirm('Are you sure you want to make changes?')
        if (sure) {
        dispatch(editUsers({ id: id, name: name, email: email}))
        setShowToast(true);
        }
    }
  return (
    <div className='ms-2'>
      <h3>Add Users</h3>
      <label htmlFor="">Name</label> <br />
      <input value={name} type="text" onChange={e => {
        setName(e.target.value)
      }}placeholder='Enter Name' /> <br /> <br />

    <label htmlFor="">Email</label> <br />
      <input value={email} type="text" onChange={e => {
        setEmail(e.target.value)
      }} placeholder='Enter Email' /> <br /> <br />
      <button className='btn btn-primary text-light' onClick={dispatchUsers}>Update User</button>
       {/* Toast notification */}
       <div className={`toast show position-fixed ${showToast ? 'd-block' : 'd-none'}`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <strong className="me-auto">Success</strong>
          <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
        </div>
        <div className="toast-body">
          User updated successfully!
        </div>
      </div>
    </div>
  )
}

export default EditUsers
