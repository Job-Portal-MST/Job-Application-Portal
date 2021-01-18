import { Component, Fragment } from "react";
import ls from "local-storage";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class JobEdit extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            recruiterEmail: ls.get("email"),
            maxApplicant: 0,
            maxPositions: 0,
            postingDate: new Date(0),
            deadline: new Date(0),
            requiredSkills: [],
            type: "",
            duration: 0,
            salary: 0,
        };
    }
    componentDidMount() {
        const jobid = new URLSearchParams(this.props.location.search).get("jobid");
        axios
            .get("/job", {
                params: { jobid },
            })
            .then((res) => {
                this.setState(res.data[0]);
            })
            .catch((err) => {
                console.log(err);
                alert("error");
            });
    }
    onChange = (type) => (e) => {
        e.preventDefault();
        this.setState({
            [e.target.id]: type(e.target.value),
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/job/edit", { job: this.state })
            .then((res) => {
                alert("changes done successfully!");
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                alert("error");
            });
    };

    render() {
        return (
            <div className="container">
                <h1>Edit Job</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input
                            id="title"
                            value={this.state.title}
                            type="text"
                            className="form-control"
                            onChange={this.onChange(String)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <input
                            id="type"
                            value={this.state.type}
                            type="text"
                            className="form-control"
                            onChange={this.onChange(String)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Max Number of Applicants: </label>
                        <input
                            id="maxApplicant"
                            value={this.state.maxApplicant}
                            type="number"
                            className="form-control"
                            onChange={this.onChange(Number)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Max Number of Positions: </label>
                        <input
                            id="maxPositions"
                            value={this.state.maxPositions}
                            type="number"
                            className="form-control"
                            onChange={this.onChange(Number)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Posting Date: </label>
                        <input
                            id="postingDate"
                            value={new Date(this.state.postingDate).toLocaleDateString("en-CA")}
                            type="date"
                            className="form-control"
                            onChange={(e) => {
                                e.preventDefault();
                                const val = new Date(e.target.value);
                                this.setState({ postingDate: val });
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Deadline: </label>
                        <div className="form-group">
                            <input
                                className="form-control"
                                value={new Date(this.state.deadline).toLocaleDateString("en-CA")}
                                type="date"
                                max="9999-12-12T00:00:00.00"
                                onChange={(e) => {
                                    e.preventDefault();
                                    let deadline = new Date(this.state.deadline);
                                    const val = new Date(e.target.value);
                                    deadline.setFullYear(val.getFullYear());
                                    deadline.setMonth(val.getMonth());
                                    deadline.setDate(val.getDate());
                                    this.setState({ deadline: deadline });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="time"
                                value={new Date(this.state.deadline).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                })}
                                // value={new Date(this.state.deadline).t.substr(10)}
                                max="9999-12-12T00:00:00.00"
                                onChange={(e) => {
                                    e.preventDefault();
                                    let deadline = new Date(this.state.deadline);
                                    const val = new Date(
                                        deadline.toDateString() + " " + e.target.value
                                    );

                                    deadline.setHours(val.getHours());
                                    deadline.setMinutes(val.getMinutes());
                                    this.setState({ deadline: deadline });
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Required Skills:</label>
                        <button
                            style={{ margin: "4px" }}
                            onClick={(e) => {
                                e.preventDefault();
                                this.setState({
                                    requiredSkills: [...this.state.requiredSkills, ""],
                                });
                            }}
                        >
                            Add
                        </button>
                        {this.state.requiredSkills.map((item, index) => {
                            return (
                                <div>
                                    <input
                                        value={item}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            this.setState({
                                                requiredSkills: this.state.requiredSkills.map(
                                                    (xitem, xindex) => {
                                                        return xindex === index
                                                            ? e.target.value
                                                            : xitem;
                                                    }
                                                ),
                                            });
                                        }}
                                    />

                                    <button
                                        style={{ display: "inline", marginLeft: "5px" }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.setState({
                                                requiredSkills: this.state.requiredSkills.filter(
                                                    (xitem, xindex) => xindex !== index
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
                    <div className="row justify-content-start">
                        <div style={{ margin: "10px" }}>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <div style={{ margin: "10px" }}>
                            <button
                                className="btn btn-secondary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.location = "/";
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default JobEdit;
