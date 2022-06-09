import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Addpay from "../payImg/addpayment.png";

export default function AddPayment(){

    const [payments, setPayments] = useState([]);

    const navigate = useNavigate()

    //Create State
    const [recieptNo, setRecieptNo] = useState(" ");
    const [customerCode, setCustomerCode] = useState(" ");
    const [fullName, setFullName] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [quntity, setQty] = useState(" ");
    const [paymentDate, setPaymentDate] = useState(" ");
    const [unitPrice, setUnitPrice] = useState(" ");
    const [paymentMethod, setPaymentMethod] = useState(" ");
    const [amount, setAmount] = useState(quntity * unitPrice);

    //Create Errot State
    const [recieptNoError, setRecieptNoError] = useState('')
    const [customerCodeError, setCustomerCodeError] = useState('')
    const [fullNameError, setFullNameError] = useState(" ");
    const [emailError, setEmailError] = useState(" ");
    const [quntityError, setQtyError] = useState(" ");
    const [paymentDateError, setPaymentDateError] = useState(" ");
    const [unitPriceError, setUnitPriceError] = useState(" ");
    const [paymentMethodError, setPaymentMethodError] = useState(" ");

    //Amount Calculation
    function calculateAmount(){
        setAmount(quntity * unitPrice);
    }

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

        if(recieptNo.length <= 4){
            setRecieptNoError("Input Valid Reciept Number!")
        }else if(customerCode.length <= 4){
            setCustomerCodeError("Input Valid Customer Code!")
        }else if(fullNameError.length <= 1){
            setFullNameError("Fill the Name fields!")
        }else if(emailError.length <= 1){
            setEmailError("Fill the Email fields!")
        }else if(quntityError.length <= 1){
            setQtyError("Fill the Quntity fields!")
        }else if(paymentDateError.length <= 1){
            setPaymentDateError("Fill the Payment Date fields!")
        }else if(unitPriceError.length <= 1){
            setUnitPriceError("Fill the Unit Price fields!")
        }else if(paymentMethodError.length <= 1){
            setPaymentMethodError("Fill the Payment Method fields!")
        }
        else{
        
            axios.post("http://localhost:8000/payment/addpayment", newPayment).then(()=>{
                navigate(`/allpayment`)
                swal({
                    title: "Payment Added!",
                    text: "  ",
                    icon: "success",
                    button: "OK",
                });



            }).catch((err)=>{
                alert(err)
                console.log(err);
            })
        }
    }

    const demo = () => {

        setRecieptNo("CZ600");
        setCustomerCode("CC600");
        setFullName("Ashen Thathsara");
        setEmail("ashen@gmail.com");
        setQty(20);
        setPaymentDate("19-05-2022");
        setUnitPrice(50000);
        setPaymentMethod("Card");
    
    };

    return(
        <>


                    <div style={{width:"600px", marginTop:"50px", marginLeft:"20%"}}>
                        <h1 style={{color: 'black' , fontWeight: 'bold' , borderRadius: '8px', fontFamily: '"Times New Roman", Times, serif',  textAlign: 'center'}}>Customer Payment</h1>
                        <form className="container" style={{width:'700px' ,background: '#1d20d880', borderRadius: '8px', padding: '10px', color: 'black', fontFamily: '"Times New Roman", Times, serif'}} onSubmit={sendPayment}>
                            <div style={{fontFamily: '"Times New Roman", Times, serif'}}>
                                    <div className="mb-3">
                                        <label for="recieptNo" style={{fontWeight: 'bold'}} className="form-label">Reciept No</label>
                                        <input style={{backgroundColor: '#ffffffd4', width:"90%", marginLeft:"5%"}} type="text" value={recieptNo} placeholder="CZ" className="form-control" id="recieptNo" onChange={(e)=>{
                                            setRecieptNo(e.target.value);
                                        }}/>
                            {recieptNoError && <p class="error-message" style={{color:'red', fontWeight:'bold'}} > {recieptNoError} </p>}
                                    </div>
                                    <div className="mb-3">
                                        <label for="customerCode" style={{fontWeight: 'bold'}} className="form-label">Customer Code</label>
                                        <input style={{backgroundColor: '#ffffffd4', width:"90%", marginLeft:"5%"}} type="text" value={customerCode} placeholder="CC" className="form-control" id="customerCode" onChange={(e)=>{
                                            setCustomerCode(e.target.value);
                                        }}/>
                                    </div>
                            {customerCodeError && <p class="error-message" style={{color:'red', fontWeight:'bold'}} > {customerCodeError} </p>}
                                    <div className="mb-3">
                                        <label for="fullName" style={{fontWeight: 'bold'}} className="form-label">Full Name</label>
                                        <input style={{backgroundColor: '#ffffffd4', width:"90%", marginLeft:"5%"}} type="text" value={fullName} className="form-control" id="fullName"  placeholder="Customer Full Name" onChange={(e)=>{
                                            setFullName(e.target.value);
                                        }}/>
                            {fullNameError && <p class="error-message" style={{color:'red', fontWeight:'bold'}} > {fullNameError} </p>}
                                    </div>
                                    <div className="mb-3">
                                        <label for="email" style={{fontWeight: 'bold'}} className="form-label">Email</label>
                                        <input style={{backgroundColor: '#ffffffd4', width:"90%", marginLeft:"5%"}} type="email" value={email} className="form-control" id="email"  placeholder="Email" onChange={(e)=>{
                                            setEmail(e.target.value);
                                        }}/>
                            {emailError && <p class="error-message" style={{color:'red', fontWeight:'bold'}} > {emailError} </p>}
                                    </div>
                                    <div classNam="mb-3">
                                        <label for="quntity" style={{fontWeight: 'bold'}} className="form-label">Quntity</label>
                                        <input style={{backgroundColor: '#ffffffd4', width:"90%", marginLeft:"5%"}} type="number" value={quntity} className="form-control"  id="quntity" onChange={(e)=>{
                                            setQty(e.target.value);
                                        }}/>
                            {quntityError && <p class="error-message" style={{color:'red', fontWeight:'bold'}} > {quntityError} </p>}
                                    </div>
                                    <div className="mb-3">
                                        <label for="paymentDate" style={{fontWeight: 'bold'}} className="form-label">Payment Date</label>
                                        <input style={{backgroundColor: '#ffffffd4', width:"90%", marginLeft:"5%"}} type="date" value={paymentDate} className="form-control"  id="paymentDate" onChange={(e)=>{
                                            setPaymentDate(e.target.value);
                                        }}/>
                            {paymentDateError && <p class="error-message" style={{color:'red', fontWeight:'bold'}} > {paymentDateError} </p>}
                                    </div>
                                    <div className="mb-3">
                                        <label for="unitprice" style={{fontWeight: 'bold'}} className="form-label">Unit Price</label>
                                        <input style={{backgroundColor: '#ffffffd4', width:"90%", marginLeft:"5%"}} type="number" value={unitPrice} className="form-control" id="uitprice"  placeholder="Rs." onChange={(e)=>{
                                            setUnitPrice(e.target.value);
                                        }}/>
                            {unitPriceError && <p class="error-message" style={{color:'red', fontWeight:'bold'}} > {unitPriceError} </p>}
                                    </div>

                                    <div className="mb-3">
                                        <label for="amount" style={{fontWeight: 'bold'}} className="form-label">Amount</label>
                                        <input style={{backgroundColor: '#ffffffd4', width:"90%", marginLeft:"5%"}} type="number" className="form-control" id="amount" disabled placeholder="Rs." value={amount} />
                                    </div>

                                    <div>
                                    <label for="paymentMethod" style={{fontWeight: 'bold'}} className="form-label">Payment Method</label>
                                    <select style={{backgroundColor: '#ffffffd4', width:"90%", marginLeft:"5%"}} className="form-select" value={paymentMethod} onChange={(e)=>{
                                            setPaymentMethod(e.target.value);
                                        }}>
                            {paymentMethodError && <p class="error-message" style={{color:'red', fontWeight:'bold'}} > {paymentMethodError} </p>}
                                        <option selected style={{fontWeight: 'bold', color: 'black'}}>Select Payment Method</option>
                                        <option style={{backgroundColor: '#ffffffd4', width:"90%", marginLeft:"5%", color:'black'}} value="Cash" >Cash</option>
                                        <option style={{backgroundColor: '#ffffffd4', width:"90%", marginLeft:"5%", color:'black'}} value="Card" >Card</option>
                                    </select>
                                    </div>
                                    <br/>
                                    

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
                        
        </>

    );
}
