import React, { Component } from "react";
import { Link } from "react-router-dom";
import ls from "local-storage";
import "bootstrap/dist/css/bootstrap.min.css";

class NavBar extends Component {
    onLogoutClick = (e) => {
        e.preventDefault();
        ls.set("logged-in", "false");
        ls.set("email", "");
        ls.set("isRecruiter", "");
        window.location = "/";
    };

    createNavbarItems = () => {
        let items = [];
        if (ls.get("logged-in") !== "true") {
            items.push(
                <li className="navbar-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
            );
            items.push(
                <li className="navbar-item">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>
            );
        } else {
            items.push(
                <li className="navbar-item">
                    <Link to="/" className="nav-link" onClick={this.onLogoutClick}>
                        Logout
                    </Link>
                </li>
            );
        }
        return items;
    };
    render() {
        const navbarItems = this.createNavbarItems();
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <Link to="/" className="navbar-brand">
                        HOME
                    </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav ml-auto">{navbarItems}</ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavBar;
