import axios from "axios";

const HOST = "http://localhost:8000/salary"

export const getAllsalaries = async() => {
    try{
        const response = await axios.get(`${HOST}/readsalary`)
        return response
    }catch(error){
        console.log("Error while retrieving data",error)
        return false;
    }
}