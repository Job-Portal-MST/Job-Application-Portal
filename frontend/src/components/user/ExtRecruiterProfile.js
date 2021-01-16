import React, { Component, Fragment } from "react";
import axios from "axios";
import ls from "local-storage";
import "bootstrap/dist/css/bootstrap.min.css";

class ExtRecruiterProfile extends Component {
    onChange = (e) => {
        this.props.parOnChange(e.target.id, e.target.value);
    };
    render() {
        return (
            <Fragment>
                <div className="form-group">
                    <label>Bio: </label>
                    <input
                        id="bio"
                        value={this.props.user.bio}
                        type="text"
                        className="form-control"
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Contact: </label>
                    <input
                        id="contact"
                        value={this.props.user.contact}
                        type="text"
                        className="form-control"
                        onChange={this.onChange}
                    />
                </div>
            </Fragment>
        );
    }
}

export default ExtRecruiterProfile;
