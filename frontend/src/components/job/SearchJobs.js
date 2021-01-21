import { Component, Fragment } from "react";
import ls from "local-storage";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class SearchJobs extends Component {
    constructor() {
        super();
        this.state = { key: "", jobs: [] };
    }

    createApplyButton = (job) => {
        if (job.applied === "yes") {
            return <button>Applied</button>;
        } else if (job.appliedCnt >= job.maxApplicant) {
            return <button>Full</button>;
        } else {
            return <button>Apply</button>;
        }
    };

    componentDidMount() {
        this.updateJobs();
    }

    updateJobs = () => {
        axios
            .get("/job/search", {
                params: { key: this.state.key },
            })
            .then((res) => {
                let jobList = res.data;
                axios
                    .get("/application", { params: { email: ls.get("email") } })
                    .then((res) => {
                        const myAppList = res.data;
                        for (const job of jobList) {
                            let tmp = myAppList.filter((app) => app.jobid === job._id);
                            if (tmp.length > 0) job.applied = "yes";
                            else job.applied = "no";
                        }
                        this.setState({ jobs: jobList });
                    })
                    .catch((err) => {
                        console.log(err);
                        alert("error");
                    });
            })
            .catch((res) => {
                alert(res.response.data.error);
            });
    };

    applyJob = (index) => (e) => {
        e.preventDefault();
        let url = new URLSearchParams({
            jobid: this.state.jobs[index]._id,
        });
        url = "/jobapply/?" + url.toString();
        window.location = url;
    };

    render() {
        return (
            <div className="container">
                <h1>Search jobs</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.updateJobs();
                    }}
                >
                    <div className="form-group">
                        <label>search by title: </label>
                        <input
                            id="key"
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                                e.preventDefault();
                                this.setState({ key: e.target.value });
                            }}
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                this.updateJobs();
                            }}
                        >
                            Go
                        </button>
                    </div>
                </form>

                <div className="container">
                    <table className="table table-hover responsive bordered">
                        <thead className="thead-dark">
                            <tr key="head">
                                <th scope="col">Title</th>
                                <th scope="col">Recruiter</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Salary</th>
                                <th scope="col">Duration</th>
                                <th scope="col">Deadline</th>
                                <th scope="col"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.jobs.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td onClick={this.applyJob(index)}>{item.title}</td>
                                        <td onClick={this.applyJob(index)}>{item.recruiterName}</td>
                                        <td onClick={this.applyJob(index)}>{item.rating}</td>
                                        <td onClick={this.applyJob(index)}>{item.salary}</td>
                                        <td onClick={this.applyJob(index)}>{item.duration}</td>
                                        <td onClick={this.applyJob(index)}>
                                            {new Date(item.deadline).toLocaleString()}
                                        </td>
                                        <td onClick={(e) => console.log(index)}>
                                            {this.createApplyButton(item)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default SearchJobs;
