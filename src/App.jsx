import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, getAllErrors, getAllStatus, fetchUsers, deleteUsers } from './userData/userSlice';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";


function App() {
  const dispatch = useDispatch()

  const viewUsersData = useSelector(selectUsers)
  const viewErrors = useSelector(getAllErrors)
  const viewStatus = useSelector(getAllStatus)

// console.log(viewUsersData)
  useEffect(() => {
    if (viewStatus === 'idle') {
      dispatch(fetchUsers())
    }
  }, [viewStatus, dispatch])

  const handleDelete = (id) => {
    dispatch(deleteUsers(id))
    window.location.reload()
  } 

  let content;

  if (viewStatus === 'loading') {
    content = <p>Loading...</p>
    console.log('loading')
  } else if (viewStatus === 'succeeded') {
    content = (
      <table className='table table-bordered w-100'>
        <thead className='w-100'>
         <tr>
          {viewUsersData && viewUsersData.length > 0 && Object.keys(viewUsersData[10]).map((a, b) => {
           return <th key={b} scope='col' className='ps-2'>{a}</th>
          })}
          <td className='fw-bold'>Action</td>
           </tr>
        </thead>
        <tbody>
          {viewUsersData.map(data => (
            <tr key={data.id}>
              <th scope='row'>{data.id}</th>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>
                <button type='' className='btn btn-light border-0'><Link to={`/editUser/${data.id}`}><FontAwesomeIcon icon={faEdit} /></Link></button>
                <button type='' className='btn btn-light border-0 shadow-none focus-visible ring-0' onClick={() => handleDelete(data.id)}> <FontAwesomeIcon className='bg-warning' icon={faTrashAlt} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )
    console.log('succeeded')
  } else if (viewStatus === 'failed') {
    content = <p>error</p>
    console.log('error')
  }

  return (
    <div className='container mt-5'>
      <div className='container-fluid d-flex justify-content-end py-2'>
      <button type='' className='btn btn-primary'><Link to='/addusers' className='text-light text-decoration-none fw-bold'>ADD</Link></button>
      </div>
     {content}
    </div>
  )
}

export default App

//npm i json-server (to install json server)
//json-server --watch db.json --port 3030 (to run json server)
//Set-ExecutionPolicy Bypass -Scope CurrentUser
