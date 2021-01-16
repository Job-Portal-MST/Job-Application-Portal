import React, { Component, Fragment } from "react";
import axios from "axios";
import ls from "local-storage";
import "bootstrap/dist/css/bootstrap.min.css";

class ExtApplicantProfile extends Component {
    constructor(props) {
        super(props);
    }
    onChange = (e) => {
        this.props.parOnChange(e.target.id, e.target.value);
    };
    render() {
        return (
            <Fragment>
                <div className="form-group">
                    <label>Skills: </label>
                    <button
                        style={{ margin: "4px" }}
                        onClick={(e) => {
                            e.preventDefault();
                            this.props.handleArrayAdd("skills", "");
                        }}
                    >
                        Add
                    </button>
                    {this.props.user.skills.map((skItem, skIndex) => {
                        return (
                            <div>
                                <input
                                    value={skItem}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        this.props.handleArrayChange(
                                            "skills",
                                            skIndex,
                                            e.target.value
                                        );
                                    }}
                                />

                                <button
                                    style={{ display: "inline", marginLeft: "5px" }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.props.handleArrayDelete("skills", skIndex);
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
                            this.props.handleArrayAdd("ed", {
                                insti: "",
                                startYear: "",
                                endYear: "",
                            });
                        }}
                    >
                        Add
                    </button>
                    {this.props.user.ed.map((edItem, edIndex) => {
                        return (
                            <div>
                                <label style={{ margin: "4px" }}>Institue Name:</label>
                                <input
                                    value={edItem.insti}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        this.props.handleArrayChange("ed", edIndex, {
                                            ...edItem,
                                            insti: e.target.value,
                                        });
                                    }}
                                />
                                <label style={{ margin: "4px" }}>Start Year</label>
                                <input
                                    value={edItem.startYear}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        this.props.handleArrayChange("ed", edIndex, {
                                            ...edItem,
                                            startYear: e.target.value,
                                        });
                                    }}
                                />
                                <label style={{ margin: "4px" }}>End Year</label>
                                <input
                                    value={edItem.endYear}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        this.props.handleArrayChange("ed", edIndex, {
                                            ...edItem,
                                            endYear: e.target.value,
                                        });
                                    }}
                                />
                                <button
                                    style={{ display: "inline", marginLeft: "5px" }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.props.handleArrayDelete("ed", edIndex);
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        );
                    })}
                </div>
            </Fragment>
        );
    }
}

export default ExtApplicantProfile;
