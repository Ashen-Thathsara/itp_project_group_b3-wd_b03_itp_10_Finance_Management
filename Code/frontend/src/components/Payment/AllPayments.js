import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import '../Payment/Table.css'
import swal from 'sweetalert';
import paymenttableImg from "../payImg/paymenttableimg.jpg" 
import {getAllpayments} from "./PaymentServices"
import { useNavigate } from "react-router-dom";


export default function AllPayments(){
    
    const navigate = useNavigate()

    const [payments, setPayments] = useState([]);
    const [PaymentSearch, setSearch] = useState("");

    useEffect(() => {
        getAllpayments().then((data) => {
            console.log("data>>", data.data.existingPayments)
            setPayments(data.data.existingPayments)
        })
    },[])

    const onDelete = (payid) =>{
        
      swal({

        title: "Do you wants to Delete?" ,
        text: "Once deleted, you will not be able to recover this Payment Details!",
        icon: "warning",
        buttons: true,
        dangerMode: true,

      }).then((willDelete) => {

        if (willDelete) {
          swal("Your Payment Details has been deleted!", {
          icon: "success",
        });
          axios.delete(`http://localhost:8000/payment/deletepayment/${payid}`)
          swal(window.location = '/allpayment')
        } else {
        swal("Your Payment Details is safe!");
        }
      
      });
        
    };


    return(
      <>
      <div>
      <h1 style={{color: 'black' , fontWeight: 'bold' , borderRadius: '8px', fontFamily: '"Times New Roman", Times, serif',  textAlign: 'center'}}>Payment Table</h1>
        <input type="text" placeholder="Search.." name="search2" onChange={(e) =>{setSearch(e.target.value)}}style={{borderRadius:"5px", 
        marginTop:"10px",marginBottom:"20px",
        width:"40%",marginLeft:"767px",
        boxShadow:" 3px 3px 3px rgba(150, 168, 156)",backgroundColor:"white"}}/>
          <div>
            <table class="rwd-table" id="paymentstable">
              <thead>
              <tr>
                <th>No.</th>
                <th>RecieptNo</th>
                <th>CustCode</th>
                <th>FullName</th>
                <th>Email</th>
                <th>Quntity</th>
                <th>PayDate</th>
                <th>UnitPrice</th>
                <th>PayMethod</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
                {payments && payments.filter(value =>{
                  if(PaymentSearch === ""){
                    return value;
                  }else if (value.fullName.toLowerCase().includes(PaymentSearch.toLowerCase())
                  ){
                    return value
                  }
                  else if (value.customerCode.toLowerCase().includes(PaymentSearch.toLowerCase())
                  ){
                    return value
                  }
                }).map((payments,index) => {
                  return(
                    <tr>
                      <td>{index + 1}</td>
                      <td>{payments.recieptNo}</td>
                      <td>{payments.customerCode}</td>
                      <td>{payments.fullName}</td>
                      <td>{payments.email}</td>
                      <td>{payments.quntity}</td>
                      <td>{payments.paymentDate}</td>
                      <td>{payments.unitPrice}</td>
                      <td>{payments.paymentMethod}</td>
                      <td>{payments.amount}</td>
                      <td>
                        <a className='btn btn-warning' href='#' style={{fontSize:"13px"}} onClick={() => {navigate("/updatepayment",{
                            state:{payments},
                        })}}>
                          <i className='fas fa-edit'></i>&nbsp;Edit
                        </a>
                        &nbsp;
                        <a className='btn btn-danger' style={{fontSize:"13px"}} onClick={() => onDelete(payments._id)}>
                        <i class="fa-solid fa-trash-can"></i>&nbsp;Delete
                        </a>
                        &nbsp;
                        <a className='btn btn-primary' style={{fontSize:"13px"}} href='#' onClick={() => {navigate("/cardpayment",{
                            state:{payments},
                        })}}>
                          <i class="fas fa-dollar"></i>
                          &nbsp;CardPayment
                        </a>
                      </td>
                    </tr>
                  );
                })}
              
              </tbody>
            </table>
          </div>
        <div className=''>
        
          <button className='btn btn-success'><a href='/addpayment' style={{textDecoration:'none', color:'white', fontWeight: 'bold'}}>Add New Payment</a></button>
    
        </div>
        </div>
      </>
    )
}

