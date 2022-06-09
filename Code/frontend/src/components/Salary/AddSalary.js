import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Addsal from "../payImg/addSalary.png";

export default function AddPayment(){

    const navigate = useNavigate();
    //Create State
    const [employeeName, setEmployeeName] = useState(" ");
    const [nic, setNIC] = useState(" ");
    const [employeeEmail, setEmployeeEmail] = useState(" ");
    const [salaryDate, setSalaryDate] = useState(" ");
    const [basicSalary, setBasicSalary] = useState(" ");
    const [overTime, setOverTime] = useState(" ");
    const [paymentAmount, setPaymentAmount] = useState(basicSalary + overTime);

    //Error State
    const [nicError,setNicError] = useState();
    const [employeeNameError, setEmployeeNameError] = useState(" ");
    const [employeeEmailError, setEmployeeEmailError] = useState(" ");
    const [salaryDateError, setSalaryDateError] = useState(" ");
    const [basicSalaryError, setBasicSalaryError] = useState(" ");
    const [overTimeError, setOverTimeError] = useState(" ");

    //Salary Amount Calculation
    function calculateAmount(){
        setPaymentAmount(basicSalary + overTime);
    }

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

        if(employeeName.length <= 1){
            setEmployeeNameError("Fill the Employee Name fields!")
        }else if(nic.length <= 9){
            setNicError("Input Valid NIC Number")
        }else if(employeeEmail.length <= 1){
            setEmployeeEmailError("Fill the Employee Email fields!")
        }else if(salaryDate.length <= 1){
            setSalaryDateError("Fill the Salary Date fields!")
        }else if(basicSalary.length <= 1){
            setBasicSalaryError("Fill the Basic Salary fields!")
        }else if(overTime.length <= 1){
            setOverTimeError("Fill the Over Time fields!")
        }
        else{

            axios.post("http://localhost:8000/salary/addsalary", newSalary)
            .then(res => console.log(res.data));

            swal({
                title: "Salary Successfully Added",
                icon: "success",
                button: "OK!"
            })
            .then((value) => {
                swal(window.location = '/allsalary')
            })
            
        }
    }

    const demo = () => {

        setEmployeeName("Ashen");
        setNIC("200032102624");
        setEmployeeEmail("ashen@gmail.com");
        setSalaryDate("10-08-2022");
        setBasicSalary(25000);
        setOverTime(5000);
    
    };


    return(
        <>
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <figure>
                            <div className="">
                                <img style={{width: "640px", marginTop: "30%"}} src={Addsal} alt="Add sal pic"/>
                            </div> 
                        </figure>
                    </div>
                    <div class="col-sm">
                        <div style={{width:"600px", marginTop:"50px"}}>
                            <h1 style={{color: 'black' , fontWeight: 'bold' , borderRadius: '8px', fontFamily: '"Times New Roman", Times, serif',  textAlign: 'center'}}>Employee Salary</h1>
                            <form className="container" style={{width:'700px' ,background: '#5158c05c', borderRadius: '8px', padding: '10px', color: 'black'}} onSubmit={sendSalary}>
                                <div style={{fontFamily: '"Times New Roman", Times, serif'}}>
                                        <div className="mb-3">
                                            <label for="employeeName" style={{fontWeight: 'bold'}} className="form-label">Employee Name</label>
                                            <input style={{backgroundColor: '#ffffffd4'}} type="text" className="form-control" value={employeeName} id="employeeName" onChange={(e)=>{
                                                setEmployeeName(e.target.value);
                                            }}/>
                                {employeeNameError && <p class="error-message" style={{color:'red', fontWeight:'bold'}} > {employeeNameError} </p>}
                                        </div>
                                        <div className="mb-3">
                                            <label for="nic" style={{fontWeight: 'bold'}} className="form-label">NIC</label>
                                            <input style={{backgroundColor: '#ffffffd4'}} type="text" className="form-control" value={nic} id="nic" onChange={(e)=>{
                                                setNIC(e.target.value);
                                            }}/>
                                {nicError && <p class="error-message" style={{color:'red', fontWeight:'bold'}} > {nicError} </p>}
                                        </div>
                                        <div className="mb-3">
                                            <label for="employeeEmail" style={{fontWeight: 'bold'}} className="form-label">Employee Email</label>
                                            <input style={{backgroundColor: '#ffffffd4'}} type="email" className="form-control" value={employeeEmail} id="employeeEmail" placeholder="Employee Email" onChange={(e)=>{
                                                setEmployeeEmail(e.target.value);
                                            }}/>
                                {employeeEmailError && <p class="error-message" style={{color:'red', fontWeight:'bold'}} > {employeeEmailError} </p>}
                                        </div>
                                        <div className="mb-3">
                                            <label for="salaryDate" style={{fontWeight: 'bold'}} className="form-label">Salary Date</label>
                                            <input style={{backgroundColor: '#ffffffd4'}} type="Date" className="form-control" value={salaryDate} id="salaryDate"  placeholder="salaryDate" onChange={(e)=>{
                                                setSalaryDate(e.target.value);
                                            }}/>
                                {salaryDateError && <p class="error-message" style={{color:'red', fontWeight:'bold'}} > {salaryDateError} </p>}
                                        </div>
                                        <div classNam="mb-3">
                                            <label for="basicSalary" style={{fontWeight: 'bold'}} className="form-label">Basic Salary</label>
                                            <input style={{backgroundColor: '#ffffffd4'}} type="number" className="form-control"  id="basicSalary" value={basicSalary} onChange={(e)=>{
                                                setBasicSalary(+e.target.value);
                                            }}/>
                                {basicSalaryError && <p class="error-message" style={{color:'red', fontWeight:'bold'}} > {basicSalaryError} </p>}
                                        </div>
                                        <div className="mb-3">
                                            <label for="overTime" style={{fontWeight: 'bold'}} className="form-label">Over Time</label>
                                            <input style={{backgroundColor: '#ffffffd4'}} type="number" className="form-control" id="overTime" value={overTime} onChange={(e)=>{
                                                setOverTime(+e.target.value);
                                            }}/>
                                {overTimeError && <p class="error-message" style={{color:'red', fontWeight:'bold'}} > {overTimeError} </p>}
                                        </div>
                                        <div className="mb-3">
                                            <label for="paymentAmount" style={{fontWeight: 'bold'}} className="form-label">Payment Amount</label>
                                            <input style={{backgroundColor: '#ffffffd4'}} type="number" className="form-control" id="paymentAmount" placeholder="Rs." value={paymentAmount}/>
                                        </div>
                                        
                                        <div>
                                            <button type="submit" className="btn btn-primary" onClick={calculateAmount} style={{backgroundColor: 'green'}}>Submit</button>
                                            <button type="reset" className="btn btn-primary" style={{backgroundColor: 'Red'}}>Cancel</button>
                                            <button
                                                type="button"
                                                onClick={demo}
                                                class="btn"
                                                id="Appointment-add"
                                                >
                                                Demo
                                            </button>
                                        
                                        </div>
                                </div> 
                            </form>
                        </div>
                                        
                    </div>
                </div>
            </div>
                            
        </>

    );
}
