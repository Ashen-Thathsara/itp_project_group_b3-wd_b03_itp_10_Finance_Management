import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import './Table.css'
import swal from 'sweetalert';

import {getAllsalaries} from "./SalaryServices"
import { useNavigate } from "react-router-dom";
import MaterialTable from 'material-table';
import PrintIcon from '@material-ui/icons/Print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';



export default function SalaryReport(){
    
    const navigate = useNavigate()

    const [salaries, setSalaries] = useState([]);
    const [SalarySearch, setSearch] = useState("");

    useEffect(() => {
      getAllsalaries().then((data) => {
            console.log("data>>", data.data.existingSalary)
            setSalaries(data.data.existingSalary)
        })
    },[])


    
  /*get data from database*/
  const columns=[
    {title: "Employee Name" , field:"employeeName" , type:"string"},
    {title: "NIC" , field:"nic" , type:"string"},
    {title: "Employee Email" , field:"employeeEmail" , type:"string"},
    {title: "Salary Date" , field:"salaryDate" , type:"string"},
    {title: "Basic Salary" , field:"basicSalary" , type:"string"},
    {title: "Over Time" , field:"overTime" , type:"string"},
    {title: "Payment Amount" , field:"paymentAmount" , type:"string"},
    
]
 
/*downlord PDF function*/
  const downloadPdf = () => {
    const doc = new jsPDF()
    doc.text("Salary Details", 30, 10)
    doc.autoTable({
      theme: "grid",
      columns: columns.map(col => ({ ...col, dataKey: col.field })),
      body:salaries 
    })
    doc.save('All Salary .pdf')
  }

    


    return(
      <>
      <div>
             

{/*
  <input type="text"
   placeholder="Search.." 
   className="text111"
   name="search2"
   onChange ={(e)=>{
       setSearch(e.target.value);
   }}
   style={{border:"none",color:"black"}}
  
  
  />
<button type="submit" style={{color:"black"}}><i class="fa fa-search"></i></button>*/}

 <div className="containerPrint">

  <div class="container-fluid" style={{ marginBottom:"40px" ,marginTop:"60px" }} >
  <MaterialTable  style={{background:"#e1e5ee", marginBottom:"40px"}}
              title="All Salary Details "
              columns={columns}
              data={salaries}
              actions={[
                    {
                      icon: () => <PrintIcon />,// you can pass icon too
                      tooltip: "Export to salary Pdf",
                      onClick: () => downloadPdf(),
                      isFreeAction: true
                    }
                  ]}
              options={{
                    sorting: false,
                    search: false,
                    paging : false,
                    filtering : false,
                    actionsColumnIndex: -1}}/>      
  </div>
  </div>
  </div>
      </>
    )
}

