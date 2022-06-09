import React, {useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {PayPalScriptProvider} from "@paypal/react-paypal-js"

import Header from "./components/Header";

// Payment Component
import AddPayment from "./components/Payment/AddPayment";
import AllPayments from "./components/Payment/AllPayments";
import EditPayment from "./components/Payment/EditPayment";
import CardPayment from "./components/Payment/CardPayment";


// Salary Component
import AddSalary from "./components/Salary/AddSalary";
import AllSalary from "./components/Salary/AllSalary";
import EditSalary from "./components/Salary/EditSalary";
import ViewSalary from "./components/Salary/ViewSalary";
import SalaryReport from "./components/Salary/SalaryReport";

function App(){
  useEffect(() => {}, []);
  
    return(
      <PayPalScriptProvider
      options={{"client-id":process.env.PAYPAL_CLIENT_ID}}>

        <BrowserRouter>
          <div className="container">
            <Header/>
            <Routes>
              {/**Payment Routes */}
              <Route path="/allpayment" element={<AllPayments/>}></Route>
              <Route path="/addpayment" element={<AddPayment />}></Route>
              <Route path="/updatepayment" element={<EditPayment/>}></Route>
              <Route path="/cardpayment" element={<CardPayment/>}></Route>
              

              {/**Salary Routes */}
              <Route path="/addsalary" element={<AddSalary/>}></Route>
              <Route path="/allsalary" element={<AllSalary/>}></Route>
              <Route path="/updatesalary" element={<EditSalary/>}></Route>
              <Route path="/viewsalary" element={<ViewSalary/>}></Route>
              <Route path="/reportsalary" element={<SalaryReport/>}></Route>

            </Routes>
          </div>
        </BrowserRouter>
      </PayPalScriptProvider>
    )
  
}

export default App;