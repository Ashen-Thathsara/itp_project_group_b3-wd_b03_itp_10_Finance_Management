import React, {useEffect, useState} from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./CardStyle.scss"
import salaryViewImg from "../payImg/viewsalary.png"

export default function EditPayment(props){
    
    const {state} = useLocation();
    const navigate = useNavigate()

    const [employeeName, setEmployeeName] = useState("");
    const [nic, setNIC] = useState("");
    const [employeeEmail, setEmployeeEmail] = useState("");
    const [salaryDate, setSalaryDate] = useState("");
    const [basicSalary, setBasicSalary] = useState(" ");
    const [overTime, setOverTime] = useState("");
    const [paymentAmount, setPaymentAmount] = useState("");
    
    const [editedSalaryID,setEditedSalaryID] = useState("");


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
        axios.put(`http://localhost:8000/salary/getsalary/${editedSalaryID}`, newSalary)
    

    return(



        <>
                    <div className="card" style={{marginLeft:"20%", marginTop:"70px"}}>
                        <h1 className="card__title" style={{fontWeight:"bold", fontSize:"40px" , fontFamily: '"Times New Roman", Times, serif', textAlign:"center"}}>Salary Details</h1>
                        <p className="card__description"><label style={{fontWeight:"bold", fontFamily: '"Times New Roman", Times, serif', marginLeft:"20%"}}>Employee Name: </label>   {employeeName}</p>
                        <p className="card__description"><label style={{fontWeight:"bold", fontFamily: '"Times New Roman", Times, serif', marginLeft:"20%"}}>NIC: </label>   {nic}</p>
                        <p className="card__description"><label style={{fontWeight:"bold", fontFamily: '"Times New Roman", Times, serif', marginLeft:"20%"}}>Employee Email: </label>    {employeeEmail}</p>
                        <p className="card__description"><label style={{fontWeight:"bold", fontFamily: '"Times New Roman", Times, serif', marginLeft:"20%"}}>Salary Date: </label>   {salaryDate}</p>
                        <p className="card__description"><label style={{fontWeight:"bold", fontFamily: '"Times New Roman", Times, serif', marginLeft:"20%"}}>Basic Salary: </label>  {basicSalary}</p>
                        <p className="card__description"><label style={{fontWeight:"bold", fontFamily: '"Times New Roman", Times, serif', marginLeft:"20%"}}>Over Time: </label> {overTime}</p>
                        <p className="card__description"><label style={{fontWeight:"bold", fontFamily: '"Times New Roman", Times, serif', marginLeft:"20%"}}>Payment Amount: </label>    {paymentAmount}</p>
                        <button className="card__btn" style={{backgroundColor: 'green', color:'white', fontFamily: '"Times New Roman", Times, serif', marginLeft:"40%", marginRight:"40%"}} onClick={() => {navigate("/allsalary")}}>OK</button>
                    </div>
        </>          
    )

}