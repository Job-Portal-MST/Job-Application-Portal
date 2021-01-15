import React, { Component, Fragment } from "react";
import axios from "axios";
import ls from "local-storage";
import "bootstrap/dist/css/bootstrap.min.css";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            isRecruiter: false,
            // for recruiter
            contact: "",
            bio: "",
            ////////////////
            // for applicant
            ed: [],
            skills: [],
            applyCnt: 0,
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const newUserData = this.state;
        axios
            .post("/user/register", newUserData)
            .then((res) => {
                ls.set("logged-in", "true");
                ls.set("email", res.data.user.email);
                ls.set("isRecruiter", res.data.user.isRecruiter);
                window.location = "/";
            })
            .catch((res) => {
                console.log(res);
                alert("Error:" + res.data.error);
            });
    };

    handleEdChange = (idx, key, val) => {
        this.setState({
            ed: this.state.ed.map((edItem, edIndex) => {
                return edIndex === idx ? { ...edItem, [key]: val } : edItem;
            }),
        });
    };

    handleEdDelete = (idx) => {
        this.setState({
            ed: this.state.ed.filter((item, index) => index !== idx),
        });
    };

    render() {
        return (
            <div className="container">
                <h1>Register</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input
                            id="email"
                            type="text"
                            className="form-control"
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>User Type : </label>
                        <div className="dropdown">
                            <select id="isRecruiter" onChange={this.onChange}>
                                <option className="dropdown-item" value="false">
                                    Applicant
                                </option>
                                <option className="dropdown-item" value="true">
                                    Recruiter
                                </option>
                            </select>
                        </div>
                    </div>
                    <Fragment>
                        {this.state.isRecruiter === "true" ? (
                            <Fragment>
                                <div className="form-group">
                                    <label>Bio: </label>
                                    <input
                                        id="bio"
                                        type="text"
                                        className="form-control"
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Contact: </label>
                                    <input
                                        id="Contact"
                                        type="text"
                                        className="form-control"
                                        onChange={this.onChange}
                                    />
                                </div>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <div className="form-group">
                                    <label>Skills: </label>
                                    <button
                                        style={{ margin: "4px" }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.setState({
                                                skills: [...this.state.skills, ""],
                                            });
                                        }}
                                    >
                                        Add
                                    </button>
                                    {this.state.skills.map((skItem, skIndex) => {
                                        return (
                                            <div>
                                                <input
                                                    value={skItem}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            skills: this.state.skills.map(
                                                                (item, idx) => {
                                                                    return idx === skIndex
                                                                        ? e.target.value
                                                                        : item;
                                                                }
                                                            ),
                                                        });
                                                    }}
                                                />

                                                <button
                                                    style={{ display: "inline", marginLeft: "5px" }}
                                                    onClick={(e) => {
                                                        this.setState({
                                                            skills: this.state.skills.filter(
                                                                (item, idx) => idx !== skIndex
                                                            ),
                                                        });
                                                    }}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="form-group">
                                    <label>Educational Details: </label>
                                    <button
                                        style={{ margin: "4px" }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.setState({
                                                ed: [
                                                    ...this.state.ed,
                                                    {
                                                        insti: "",
                                                        startYear: "",
                                                        endYear: "",
                                                    },
                                                ],
                                            });
                                        }}
                                    >
                                        Add
                                    </button>
                                    {this.state.ed.map((edItem, edIndex) => {
                                        return (
                                            <div>
                                                <label style={{ margin: "4px" }}>
                                                    Institue Name:
                                                </label>
                                                <input
                                                    value={edItem.insti}
                                                    onChange={(e) => {
                                                        this.handleEdChange(
                                                            edIndex,
                                                            "insti",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                                <label style={{ margin: "4px" }}>Start Year</label>
                                                <input
                                                    value={edItem.startYear}
                                                    onChange={(e) => {
                                                        this.handleEdChange(
                                                            edIndex,
                                                            "startYear",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                                <label style={{ margin: "4px" }}>End Year</label>
                                                <input
                                                    value={edItem.endYear}
                                                    onChange={(e) => {
                                                        this.handleEdChange(
                                                            edIndex,
                                                            "endYear",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                                <button
                                                    style={{ display: "inline", marginLeft: "5px" }}
                                                    onClick={(e) => {
                                                        this.handleEdDelete(edIndex);
                                                    }}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Fragment>
                        )}
                    </Fragment>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default Register;
