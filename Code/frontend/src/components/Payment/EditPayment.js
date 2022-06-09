import React, {useEffect, useState} from "react";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

export default function EditPayment(){
    const {state} = useLocation();
    const navigate = useNavigate()

    const [recieptNo, setRecieptNo] = useState("");
    const [customerCode, setCustomerCode] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [quntity, setQty] = useState("");
    const [paymentDate, setPaymentDate] = useState("");
    const [unitPrice, setUnitPrice] = useState(" ");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [amount, setAmount] = useState(quntity * unitPrice);
    const [editedPaymentID,setEditedPaymentID] = useState("");



    function calculateAmount(){
        setAmount(quntity * unitPrice);
    }

    useEffect(() =>{
        setRecieptNo(state.payments.recieptNo)
        setCustomerCode(state.payments.customerCode)
        setFullName(state.payments.fullName)
        setEmail(state.payments.email)
        setQty(state.payments.quntity)
        setPaymentDate(state.payments.paymentDate)
        setUnitPrice(state.payments.unitPrice)
        setPaymentMethod(state.payments.paymentMethod)
        setAmount(state.payments.amount)
        setEditedPaymentID(state.payments._id);
        console.log(state.payments);
    },[])

    function sendPayment(e){
        e.preventDefault();

        const newPayment = {
            recieptNo,
            customerCode,
            fullName,
            email,
            quntity,
            paymentDate,
            unitPrice,
            paymentMethod,
            amount
        }
        
        

        /*url*/
        axios.put(`http://localhost:8000/payment/updatepayment/${editedPaymentID}`, newPayment).then(() =>{
            navigate(`/allpayment`)
            swal({
                title: "Payment Update Successfully!",
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
        <div>
        <h1 style={{color: 'black' , fontWeight: 'bold' , borderRadius: '8px', fontFamily: '"Times New Roman", Times, serif',  textAlign: 'center'}}>Update Payment</h1>
        <form  className="container" style={{width:'700px' ,background: '#5460ca9f', borderRadius: '8px', padding: '10px', color: 'black', fontFamily: '"Times New Roman", Times, serif'}} onSubmit={sendPayment}>
            <div style={{border:"2px" ,border: '2px', borderRadius: '5px',padding: '5px'}} className="mb-3">
                <label for="recieptNo" className="form-label" style={{fontWeight: 'bold'}}>Reciept No</label>
                <input style={{borderBottom: '6px ', backgroundColor: '#ffffff9b', fontWeight:"bold"}} type="text" className="form-control" required id="recieptNo" autoComplete="off" value={recieptNo} 
                onChange={(e)=>{
                    setRecieptNo(e.target.value);}}
                />
            </div>
            <div style={{border:"2px" ,border: '2px', borderRadius: '5px',padding: '5px'}} className="mb-3">
                <label for="customerCode" className="form-label" style={{fontWeight: 'bold'}}>Customer Code</label>
                <input style={{borderBottom: '6px', backgroundColor: '#ffffff9b', fontWeight:"bold"}} type="text" className="form-control" required id="customerCode" autoComplete="off" value={customerCode} 
                onChange={(e)=>{
                    setCustomerCode(e.target.value);}}
                />
            </div>
            <div style={{border:"2px" ,border: '2px', borderRadius: '5px',padding: '5px'}} className="mb-3">
                <label for="fullName" className="form-label" style={{fontWeight: 'bold'}}>Full Name</label>
                <input style={{borderBottom: '6px' , backgroundColor: '#ffffff9b', fontWeight:"bold"}} type="text" className="form-control" required id="fullName" placeholder="Customer Full Name" autoComplete="off" value={fullName}
                onChange={(e)=>{
                    setFullName(e.target.value);}}
                />
            </div>
            <div style={{border:"2px" ,border: '2px', borderRadius: '5px',padding: '5px'}} className="mb-3">
                <label for="email" className="form-label" style={{fontWeight: 'bold'}}>Email</label>
                <input style={{borderBottom: '6px', backgroundColor: '#ffffff9b', fontWeight:"bold"}} type="email" className="form-control" required id="email" placeholder="Email" autoComplete="off" value={email} onChange={(e)=>{
                    setEmail(e.target.value);}}
                />
            </div>
            <div style={{border:"2px" ,border: '2px', borderRadius: '5px',padding: '5px'}} classNam="mb-3">
                <label for="quntity" className="form-label" style={{fontWeight: 'bold'}}>Quntity</label>
                <input style={{borderBottom: '6px', backgroundColor: '#ffffff9b', fontWeight:"bold"}} type="number" className="form-control" required id="quntity" autoComplete="off" value={quntity} onChange={(e)=>{
                    setQty(e.target.value);}}
                />
            </div>
            <div style={{border:"2px" ,border: '2px', borderRadius: '5px',padding: '5px'}} className="mb-3">
                <label for="paymentDate" className="form-label" style={{fontWeight: 'bold'}}>Payment Date</label>
                <input style={{borderBottom: '6px', backgroundColor: '#ffffff9b', fontWeight:"bold"}} type="date" className="form-control" required id="paymentDate" autoComplete="off" value={paymentDate} onChange={(e)=>{
                    setPaymentDate(e.target.value);}}
                />
            </div>
            <div style={{border:"2px" ,border: '2px', borderRadius: '5px',padding: '5px'}} className="mb-3">
                <label for="unitPrice" className="form-label" style={{fontWeight: 'bold'}}>Unit Price</label>
                <input style={{borderBottom: '6px', backgroundColor: '#ffffff9b', fontWeight:"bold"}} type="number" className="form-control" required id="unitPrice" placeholder="Rs." autoComplete="off" value={unitPrice} onChange={(e)=>{
                    setUnitPrice(e.target.value);}}
                />
            </div>
            <div style={{border:"2px" ,border: '2px', borderRadius: '5px',padding: '5px'}}>
            <label for="paymentMethod" className="form-label" style={{fontWeight: 'bold'}}>Payment Method</label>
            <select style={{borderBottom: '6px', backgroundColor: '#ffffff9b', fontWeight:"bold"}} className="form-select" autoComplete="off" value={paymentMethod} onChange={(e)=>{
                    setPaymentMethod(e.target.value);}}
                >
                <option selected style={{fontWeight: 'bold', backgroundColor: '#ffffff9b', fontWeight:"bold"}}>Select Payment Method</option>
                <option style={{fontWeight: 'bold', backgroundColor: '#ffffff9b', fontWeight:"bold"}} value="Cash">Cash</option>
                <option style={{fontWeight: 'bold', backgroundColor: '#ffffff9b', fontWeight:"bold"}} value="Card">Card</option>
            </select>
            </div>
            <br/>
            <div style={{border:"2px" ,border: '2px', borderRadius: '5px',padding: '5px'}} className="mb-3">
                <label for="amount" className="form-label" style={{fontWeight: 'bold'}}>Amount</label>
                <input style={{borderBottom: '6px', backgroundColor: '#ffffff9b', fontWeight:"bold"}}  className="form-control" id="amount" required placeholder="Rs." autoComplete="off" value={amount} 
                />
            </div>
            
            <div className="">
                    <button type="submit" onClick={calculateAmount} style={{backgroundColor:"Green", padding:"4px 50px", borderRadius:"8px", fontWeight:"bold", borderColor:"green"}} className="btn btn-primary">Update</button>
                    <button type="submit" className="btn btn-primary" style={{backgroundColor:"red", padding:"4px 50px", borderRadius:"8px", marginLeft:"3%", fontWeight:"bold", color:"white", borderColor:"red"}} onClick={() => {navigate("/allpayment")
                                    swal("Payment Update Rejected!", "", "warning")}}>Cancel</button>
            </div>
        </form>
        </div>
        </>          
    )

}