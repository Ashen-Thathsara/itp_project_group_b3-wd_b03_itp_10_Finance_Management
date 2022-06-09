import React from "react";
import {Link} from 'react-router-dom';
import "./HeaderStyle.css"

function Header(){
    return(
        <div>


            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <div className="navbar-brand" style={{color:"black", fontFamily: '"Times New Roman", Times', fontWeight:"bold"}}><b><h1>COMFORT ZONE</h1></b></div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="topnav">
                        <Link to="/">Home</Link>
                        <Link to="/allpayment">Payments Details</Link>
                        <Link to="/allsalary">Salary Details</Link>
                        <Link to="/addpayment">Add Payment</Link>
                        <Link to="/addsalary">Add Salary</Link>
                    </div>
                    </div>
                </div>
            </nav>


            {/**---------------------------------------------------------------------------------------------------- */}
            {/*
                <nav className="navbar navbar-expand-lg navbar-light bg-light" >
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#"  style={{color:"red"}}>Navbar</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <a className="nav-link" aria-current="page" href="/allpayment">All Payments</a>
                                <a className="nav-link" href="/addpayment">Add Payment</a>
                                <a className="nav-link" href="/allsalary">All Salary</a>
                                <a className="nav-link" href="/addsalary">Add Salary</a>
                                <a className="nav-link disabled">Disabled</a>
                            </div>
                        </div>
                    </div>
                </nav>
                */}
            </div>
    )
}

export default Header;