import React, { Component } from "react";
import axios from "axios";
import ls from "local-storage";
import "bootstrap/dist/css/bootstrap.min.css";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
        };
    }
    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            email: this.state.email,
            password: this.state.password,
        };
        axios
            .post("/user/login", loginData)
            .then((res) => {
                ls.set("logged-in", "true");
                ls.set("email", res.data.user.email);
                ls.set("isRecruiter", res.data.user.isRecruiter);
                window.location = "/";
            })
            .catch((res) => {
                alert("Invalid credentials!");
            });
    };
    render() {
        return (
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input
                            id="email"
                            type="text"
                            className="form-control"
                            onChange={this.onChange}
                        />
                        <br />
                        <label>Password: </label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            onChange={this.onChange}
                        />
                        <br />
                        <div className="">
                            <button className="btn btn-primary" type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default Login;
