import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Employee() {


  const [data, setData] = useState([]);

  useEffect(()=> {
    axios.get('http://localhost:8081/getEmployees')
    .then(res => {
      if(res.data.Status === "Success") {
        console.log(res.data.Result)
        setData(res.data.Result)
      }
      else {
        alert("Error")
      }
    })
    .catch(err => console.log(err))
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:8081/delete/'+id)
      .then(res => {
        if(res.data.Status === "Success") {
          window.location.reload(true);
        }
        else {
          alert("eror")
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center'>
        <h3>Employee List</h3>
      </div>
      <Link to="/create" className='btn btn-success'>Add Employee</Link>
    <div className='mt-3'>  
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Email</th>
          <th>Salary</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((employee, index)=> {
         return  <tr key={index}>
            <td>{employee.name}</td>
            <td>{
              <img src={`http://localhost:8081/images/`+employee.image} alt="" className='employee_image'/>
              }</td>
            <td>{employee.email}</td>
            <td>{employee.salary}</td>
            <td>{employee.address}</td>
            <td>
              <Link to={`/employeeEdit/`+employee.id} className='btn btn-primary btn-sme me-2'>edit</Link>
              <button onClick={e => handleDelete(employee.id)}   className='btn btn-sm btn-danger'>delete</button>
            </td>
         </tr>
        })}  
      </tbody>
    </table>
    </div> 
    </div> 
  )
}

export default Employee