import axios from "axios";

const HOST = "http://localhost:8000/payment"

export const getAllpayments = async() => {
    try{
        const response = await axios.get(`${HOST}/readpayment`)
        return response
    }catch(error){
        console.log("Error while retrieving data",error)
        return false;
    }
}