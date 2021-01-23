import { Component, Fragment } from "react";
import ls from "local-storage";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const cellStyle = { textAlign: "center", verticalAlign: "middle" };

class ListJobs extends Component {
    constructor() {
        super();
        this.state = {
            jobs: [],
        };
    }

    componentDidMount() {
        axios
            .get("/job", {
                params: {
                    email: ls.get("email"),
                },
            })
            .then((res) => {
                this.setState({ jobs: res.data });
            })
            .catch((res) => {
                alert(res.response.data.error);
            });
    }

    onView = (index) => (e) => {
        e.preventDefault();
        let url = new URLSearchParams({
            jobid: this.state.jobs[index]._id,
        });
        url = "/listapplys/?" + url.toString();
        window.location = url;
    };

    onEdit = (index) => (e) => {
        e.preventDefault();
        let url = new URLSearchParams({
            jobid: this.state.jobs[index]._id,
        });
        url = "/jobedit/?" + url.toString();
        console.log("edit: " + url);
        window.location = url;
    };
    onCancel = (index) => (e) => {
        e.preventDefault();
        const jobid = this.state.jobs[index]._id;
        axios
            .post("/job/remove", {
                jobid,
            })
            .then((res) => {
                window.location.reload();
            })
            .catch((res) => {
                console.log(res);
                alert("error");
            });
    };

    render() {
        return (
            <Fragment>
                <h1>Job listings</h1>
                <table className="table table-hover responsive bordered">
                    <thead className="thead-dark">
                        <tr key="head">
                            <th style={cellStyle} scope="col">
                                Title
                            </th>
                            <th style={cellStyle} scope="col">
                                Date of Posting
                            </th>
                            <th style={cellStyle} scope="col">
                                No.of Applications
                            </th>
                            <th style={cellStyle} scope="col">
                                Max no.of Applications
                            </th>
                            <th style={cellStyle} scope="col">
                                Edit
                            </th>
                            <th style={cellStyle} scope="col">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.jobs.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td onClick={this.onView(index)} style={cellStyle}>
                                        {item.title}
                                    </td>
                                    <td onClick={this.onView(index)} style={cellStyle}>
                                        {new Date(item.postingDate).toDateString()}
                                    </td>
                                    <td onClick={this.onView(index)} style={cellStyle}>
                                        {item.appliedCnt}
                                    </td>
                                    <td onClick={this.onView(index)} style={cellStyle}>
                                        {item.maxApplicant}
                                    </td>
                                    <td style={cellStyle} onClick={(e) => e.preventDefault()}>
                                        <button
                                            className="btn btn-warning"
                                            style={{ margin: "10px" }}
                                            onClick={this.onEdit(index)}
                                        >
                                            e
                                        </button>
                                    </td>
                                    <td style={cellStyle}>
                                        <button
                                            className="btn btn-danger"
                                            style={{ margin: "10px" }}
                                            onClick={this.onCancel(index)}
                                        >
                                            x
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

export default ListJobs;
