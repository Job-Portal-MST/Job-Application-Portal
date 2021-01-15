import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ls from "local-storage";
import "bootstrap/dist/css/bootstrap.min.css";

class NavBar extends Component {
    constructor() {
        super();
    }
    onLogoutClick = (e) => {
        e.preventDefault();
        ls.set("logged-in", "false");
        ls.set("email", "");
        ls.set("isRecruiter", "");
        window.location = "/";
    };
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <Link to="/" className="navbar-brand">
                        HOME
                    </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav ml-auto">
                            {ls.get("logged-in") === "true" ? (
                                <li className="navbar-item">
                                    <Link
                                        to="/"
                                        className="nav-link"
                                        onClick={this.onLogoutClick}
                                    >
                                        Logout
                                    </Link>
                                </li>
                            ) : (
                                <li className="navbar-item">
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavBar;
