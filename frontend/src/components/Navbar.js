import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <Link to="/" className="navbar-brand">
                    HOME
                </Link>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="navbar-item">
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
