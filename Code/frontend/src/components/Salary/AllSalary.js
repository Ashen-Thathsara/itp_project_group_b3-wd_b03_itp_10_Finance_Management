import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import './Table.css'
import swal from 'sweetalert';

import {getAllsalaries} from "./SalaryServices"
import { useNavigate } from "react-router-dom";


export default function AllSalary(){
    
    const navigate = useNavigate()

    const [salaries, setSalaries] = useState([]);
    const [SalarySearch, setSearch] = useState("");

    useEffect(() => {
      getAllsalaries().then((data) => {
            console.log("data>>", data.data.existingSalary)
            setSalaries(data.data.existingSalary)
        })
    },[])

    const onDelete = (salaryid) =>{


      swal({

        title: "Do you wants to Delete?",
        text: "Once deleted, you will not be able to recover this Salary Details!",
        icon: "warning",
        buttons: true,
        dangerMode: true,

      }).then((willDelete) => {

        if (willDelete) {
          swal("Your salary details has been deleted!", {
          icon: "success",
        });
          axios.delete(`http://localhost:8000/salary/deletesalary/${salaryid}`)
          swal(window.location = '/allsalary')
        } else {
        swal("Your salary details is safe!");
        }
      
      });

      
        
    };


    return(
      <>
      <div >
      <h1 style={{color: 'black' , fontWeight: 'bold' , borderRadius: '8px', fontFamily: '"Times New Roman", Times, serif',  textAlign: 'center'}}>Employee Salary Table</h1>
      <input type="text" placeholder="Search.." name="search2"  onChange={(e) =>{setSearch(e.target.value)}}style={{borderRadius:"5px", 
        marginTop:"10px",marginBottom:"20px",
        width:"40%",marginLeft:"767px",
        boxShadow:" 3px 3px 3px rgba(150, 168, 156)",backgroundColor:"white"}}/>
        
          <table class="rwd-table" id="paymentstable">
            <thead>
            <tr>
              <th>No.</th>
              <th>EmployeeName</th>
              <th>NIC</th>
              <th>EmployeeEmail</th>
              <th>SalaryDate</th>
              <th>BasicSalary</th>
              <th>OverTime</th>
              <th>PaymentAmount</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
              {salaries && salaries.filter(value =>{
                if(SalarySearch === ""){
                  return value;
                }else if (value.employeeName.toLowerCase().includes(SalarySearch.toLowerCase())
                ){
                  return value
                }
                else if (value.nic.toLowerCase().includes(SalarySearch.toLowerCase())
                ){
                  return value
                }
              }).map((salaries,index) => {
                return(
                  <tr>
                    <td>{index + 1}</td>
                    <td>{salaries.employeeName}</td>
                    <td>{salaries.nic}</td>
                    <td>{salaries.employeeEmail}</td>
                    <td>{salaries.salaryDate}</td>
                    <td>{salaries.basicSalary}</td>
                    <td>{salaries.overTime}</td>
                    <td>{salaries.paymentAmount}</td>
                    <td>
                      <a className='btn btn-warning' href='#' style={{fontSize:"13px"}} onClick={() => {navigate("/updatesalary",{
                          state:{salaries},
                      })}}>
                        <i className='fas fa-edit'></i>&nbsp;Edit
                      </a>
                      &nbsp;
                      <a className='btn btn-danger' style={{fontSize:"13px"}}  onClick={() => onDelete(salaries._id)}>
                      <i class="fa-solid fa-trash-can"></i>&nbsp;Delete
                      </a>
                      &nbsp;
                      <a className='btn btn-primary' href='#' style={{fontSize:"13px"}}  onClick={() => {navigate("/viewsalary",{
                          state:{salaries},
                      })}}>
                        <i class="fas fa-eye"></i>
                        &nbsp;View
                      </a>
                    </td>
                  </tr>
                );
              })}
            
            </tbody>
          </table>

        <div className='' style={{marginTop:"8px"}}>
        
          <button className='btn btn-success'><a href='/addsalary' style={{textDecoration:'none', color:'white', fontWeight: 'bold'}}>Add New Salary</a></button>
          <button type="submit" className="btn btn-primary" style={{marginLeft:"5px",backgroundColor: 'blue', fontWeight: 'bold'}} onClick={() => {navigate("/reportsalary")}}>Report</button>
          
        </div>
        </div>
      </>
    )
}

