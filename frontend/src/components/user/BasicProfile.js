import React, { Component, Fragment } from "react";
import axios from "axios";
import ls from "local-storage";
import "bootstrap/dist/css/bootstrap.min.css";

class BasicProfile extends Component {
    onChange = (e) => {
        this.props.parOnChange(e.target.id, e.target.value);
    };
    render() {
        return (
            <Fragment>
                <div className="form-group">
                    <label>Name: </label>
                    <input
                        id="name"
                        type="text"
                        className="form-control"
                        onChange={this.onChange}
                        value={this.props.user.name}
                    />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input
                        id="email"
                        type="text"
                        className="form-control"
                        onChange={this.onChange}
                        value={this.props.email}
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        onChange={this.onChange}
                        value={this.props.user.password}
                    />
                </div>
            </Fragment>
        );
    }
}

export default BasicProfile;
