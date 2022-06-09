
import React, {useState} from 'react';
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js"
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

 const PaypalCheckoutButton = (props) => {
    const {newPayment} = props;
    const navigate = useNavigate()

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = (orderId) => {
        setPaidFor(true);
    }

    if(paidFor){
        navigate("/allpayment")
        swal("Thank You for purchasing from ComfortZone!", "", "success")
    }

    if(error){
        alert(error);
    }
    return(
        <PayPalScriptProvider>
            <PayPalButtons

                onClick={(data, actions) => {
                    const hasAlreadyBoughtCourse = false;
                    if(hasAlreadyBoughtCourse){
                        setError("You Already bough this course");
                        return actions.reject();
                    }else{
                        return actions.resolve();
                    }
                }}
                createOrder = {(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: newPayment.description,
                                amount: {
                                    value: newPayment.amount,
                                },
                            },
                        ],
                    });
                }}
                onApprove = { async (data, action) => {
                    const order = await action.order.capture();
                    console.log("order", order);

                    handleApprove(data.orderID);
                }}
                onCancel={() => {}}
                onError={(err) => {
                    setError(err);
                    console.log("PayPal Checkout onError", err);
                }}

            />
        </PayPalScriptProvider>
    )
}

export default PaypalCheckoutButton