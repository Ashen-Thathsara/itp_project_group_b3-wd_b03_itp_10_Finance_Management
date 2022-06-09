import React, {useEffect, useState} from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./paypal.css";
import PaypalCheckoutButton from "./PaypalCheckoutButton";
import swal from 'sweetalert';
import jsPDF from "jspdf";
import imgData from '../payImg/logo.png';

export default function CardPayment(){
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
    const [amount, setAmount] = useState("");
    const [editedPaymentID,setEditedPaymentID] = useState("");
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

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
        axios.put(`http://localhost:8000/payment/getpayment/${editedPaymentID}`, newPayment)


        const jsPdfGenerator = ()=>{
            var doc = new jsPDF('p', 'pt');
    
            doc.addImage(imgData, 'png', 60, 40, 200, 0)
    
            doc.rect(45, 45, doc.internal.pageSize.width - 95, doc.internal.pageSize.height - 95, 'S');
               
                doc.setFontSize(12)
                doc.text(385, 110, '"Comfort Zone"')
                doc.text(385, 125, 'New Kandy Road, Malabe')
                doc.text(385, 140, '+94 777 555 551')
                doc.text(385, 155, '+94 777 666 552')
                doc.text(385, 170, 'comfortzone@sltnet.lk')
                doc.setFontSize(21)
                doc.setTextColor(255,0,0)
                doc.text(200, 250, 'Payment Details Report')
                doc.line(198, 255, 398, 255)
                doc.setFontSize(17)
                doc.setTextColor(0,0,0)
                doc.text(120, 330, 'Payment Details')
                doc.setFontSize(13)
                doc.text(120, 380, 'Full Name :')
                doc.text(120, 410, 'Email :')
                doc.text(120, 440, 'Reciept No :')
                doc.text(120, 470, 'Customer Code :')
                doc.text(120, 500, 'Quntity :')
                doc.text(120, 530, 'Unit Price :')
                doc.text(120, 560, 'Amount :')
                doc.text(420, 640, 'Certified By :')
                doc.text(420, 660, 'Payment Admin')
                doc.setFontSize(12)
                doc.text(380,380, state.payments.fullName)
                doc.text(380,410, state.payments.email)
                doc.text(380,440, state.payments.recieptNo)
                doc.text(380,470, state.payments.customerCode)
                doc.text(380,500,`${state.payments.quntity}`)
                doc.text(380,530, `${state.payments.unitPrice}`)
                doc.text(380,560, `${state.payments.amount}`)
                doc.setFontSize(11)
                doc.setTextColor(255,0,0)
                doc.text(80, 720, '* The given details were generated on ' + `${date}`)
    
                doc.save(state.payments.fullName + ' Report.pdf')
        }
    

    return(
        <>

                    <div className="" style={{fontFamily:'"Times New Roman", Times, serif', border:"2px solid", borderRadius:"10px", width: "60%", marginLeft:"20%", marginTop:"20px"}}>
                        <div className="checkout" style={{marginTop:"30px"}}>
                            <h1 style={{fontWeight:"bold", textAlign:"center"}}>PayPal Checkout</h1>
                            <p className="checkout-title" style={{fontWeight:"bold", textAlign:"center", color:"black"}}>
                                Comfort Furniture ShowRoom
                            </p>
                            <p className="checkout-description" style={{fontWeight:"bold", textAlign:"center", color:"black"}}>
                                We keep your Transactions Reliable and Secure
                            </p>
                            <br></br>
                            <div className="">
                                <div style={{marginLeft:"36%", lineHeight:"25%", marginTop:"8px", fontSize:"18px", fontWeight:"bold"}}>
                                    <p>{fullName}</p>
                                    <p>{email}</p>
                                    <p>{recieptNo}</p>
                                    <p>{customerCode}</p>
                                    <p>{quntity}</p>
                                    <p>{unitPrice}</p>
                                    <p>{paymentDate}</p>
                                </div>
                            </div>
                            <br></br>


                            <p className="checkout-title" style={{fontWeight:"bold", textAlign:"center"}}>Amount</p>
                            <h1 className="checkout-price" style={{fontWeight:"bold", textAlign:"center"}}>$ {amount}</h1>
                            <div className="separator"></div> 

                            <div class="container">
                                <div class="row">
                                    <div class="col-sm">
                                        <button className="" style={{backgroundColor:"red", padding:"4px 50px", borderRadius:"8px", marginLeft:"50%", marginTop:"10%", fontWeight:"bold"}} onClick={() => {navigate("/allpayment")
                                    swal("Payment Rejected!", "", "warning")}}>REJECT</button>
                                    <button className="" onClick={()=>jsPdfGenerator()} style={{backgroundColor:"green", padding:"4px 14px", marginLeft:"50%", marginTop:"3%", borderRadius:"8px", color:"black", fontWeight:"bold"}}>Generate Report<i class="fa-solid fa-print"></i></button>
                                    </div>
                                    <div class="col-sm">
                                        <div className="paypal">
                                            <p className="checkout-title">PAY WITH PAYPAL</p>
                                            <div className="paypal-button-container">
                                                <PaypalCheckoutButton newPayment={newPayment} />
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

                           
                            
                        </div>
                    </div>

        
        </>          
    )

}