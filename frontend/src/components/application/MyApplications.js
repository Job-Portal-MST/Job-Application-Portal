import { Component, Fragment } from "react";
import ls from "local-storage";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class MyApplications extends Component {
    constructor() {
        super();
        this.state = {
            appList: [],
        };
    }

    componentDidMount() {
        axios
            .get("/application", { params: { email: ls.get("email") } })
            .then((res) => {
                let appList = res.data;
                appList.map((app, idx) => {
                    axios
                        .get("/job", {
                            params: { jobid: app.jobid },
                        })
                        .then((res) => {
                            appList[idx].job = res.data[0];
                        })
                        .catch((res) => {
                            alert(res.response.data.error);
                        });
                });
                setTimeout(() => {
                    this.setState({ appList });
                }, 500);
            })
            .catch((res) => {
                console.log(res);
                alert("error");
            });
    }
    render() {
        return (
            <Fragment>
                <table className="table table-hover responsive bordered">
                    <thead className="thead-dark">
                        <tr key="head">
                            <th scope="col">Title</th>
                            <th scope="col">Recruiter</th>
                            <th scope="col">Date of posting</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Deadline</th>
                            <th scope="col"> Status</th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.appList.map((app, index) => {
                            return (
                                <tr key={index}>
                                    <td>{app.job.title}</td>
                                    <td>{app.job.recruiterName}</td>
                                    <td>{new Date(app.job.postingDate).toDateString()}</td>
                                    <td>{app.job.salary}</td>
                                    <td>{app.job.duration}</td>
                                    <td>{new Date(app.job.deadline).toLocaleString()}</td>
                                    <td>{app.status}</td>
                                    <td>
                                        {app.status === "accepted" ? (
                                            <button className="btn btn-sm btn-primary">Rate</button>
                                        ) : (
                                            "-"
                                        )}
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

export default MyApplications;
