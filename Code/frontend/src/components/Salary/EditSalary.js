import React, {useEffect, useState} from "react";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

import "./CardStyle.scss"
import UpdateSal from "../payImg/updatesalary.png"

export default function EditPayment(){
    const {state} = useLocation();
    const navigate = useNavigate()

    const [employeeName, setEmployeeName] = useState("");
    const [nic, setNIC] = useState("");
    const [employeeEmail, setEmployeeEmail] = useState("");
    const [salaryDate, setSalaryDate] = useState("");
    const [basicSalary, setBasicSalary] = useState(" ");
    const [overTime, setOverTime] = useState("");
    const [paymentAmount, setPaymentAmount] = useState(basicSalary + overTime);
    
    const [editedSalaryID,setEditedSalaryID] = useState("");

    

    function calculateAmount(){
        setPaymentAmount(basicSalary + overTime);
    }

    useEffect(() =>{
        setEmployeeName(state.salaries.employeeName)
        setNIC(state.salaries.nic)
        setEmployeeEmail(state.salaries.employeeEmail)
        setSalaryDate(state.salaries.salaryDate)
        setBasicSalary(state.salaries.basicSalary)
        setOverTime(state.salaries.overTime)
        setPaymentAmount(state.salaries.paymentAmount)
        setEditedSalaryID(state.salaries._id);
        console.log(state.salaries);
    },[])

    function sendSalary(e){
        e.preventDefault();

        const newSalary = {
            employeeName,
            nic,
            employeeEmail,
            salaryDate,
            basicSalary,
            overTime,
            paymentAmount
        }
        
        

        
        /*url*/
        axios.put(`http://localhost:8000/salary/updatesalary/${editedSalaryID}`, newSalary).then(() =>{
            navigate('/allsalary')
            swal({
                title: "Salary Update Successfully!",
                text: " ",
                icon: "success",
                button: "OK",
              });
        }).catch((err) =>{
            alert(err)
            console.log(err);
        })
    }

    return(
        <>
            <div class="container">
            <h1 style={{color: 'black' , fontWeight: 'bold' ,padding:'20px', borderRadius: '8px', fontFamily: '"Times New Roman", Times, serif',  textAlign: 'center', marginTop:"15px"}}>Update Salary</h1>
            
                
                    <div className="bodyImg">
                        
                        <div className="salaryimg">
                        
                            <form onSubmit={sendSalary}>
                                <div className="card" style={{padding:'1px', marginLeft:"20%"}}>
                            
                                    <div className="card__body"  >
                                        <h2 className="card__title">{employeeName}</h2>
                                        <p className="card__description"><label style={{fontWeight:"bold", marginLeft:"25%"}}>NIC: </label>   <input style={{backgroundColor:'white'}} value={nic}  onChange={(e)=>{
                                    setNIC(e.target.value);}}/></p>
                                        <p className="card__description"><label style={{fontWeight:"bold", marginLeft:"25%"}}>Employee Email: </label>    <input style={{backgroundColor:'white'}} value={employeeEmail} onChange={(e)=>{
                                    setEmployeeEmail(e.target.value);}}/></p>
                                        <p className="card__description"><label style={{fontWeight:"bold", marginLeft:"25%"}}>Salary Date: </label>   <input type="date" style={{backgroundColor:'white'}} value={salaryDate} onChange={(e)=>{
                                    setSalaryDate(e.target.value);}}/></p>
                                        <p className="card__description"><label style={{fontWeight:"bold", marginLeft:"25%"}}>Basic Salary: </label>  <input style={{backgroundColor:'white'}} value={basicSalary} onChange={(e)=>{
                                    setBasicSalary(+e.target.value);}}/></p>
                                        <p className="card__description"><label style={{fontWeight:"bold", marginLeft:"25%"}}>Over Time: </label> <input style={{backgroundColor:'white'}} value={overTime} onChange={(e)=>{
                                    setOverTime(+e.target.value);}}/></p>
                                        <p className="card__description"><label style={{fontWeight:"bold", marginLeft:"25%"}}>Payment Amount: </label>  <input style={{backgroundColor:'white'}} value={paymentAmount}/></p>
                                    </div>
                                    <button className="card__btn" style={{padding:"4px 10px", borderRadius:"8px", marginLeft:"40%", marginRight:"50%" , fontWeight:"bold"}} onClick={calculateAmount}>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>

        </>          
    )

}