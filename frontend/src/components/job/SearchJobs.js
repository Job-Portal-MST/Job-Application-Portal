import { Component, Fragment } from "react";
import ls from "local-storage";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class SearchJobs extends Component {
    constructor() {
        super();
        this.state = { key: "", jobs: [] };
    }

    componentDidMount() {
        this.updateJobs();
    }

    updateJobs = () => {
        axios
            .get("/job/search", {
                params: { key: this.state.key },
            })
            .then((res) => {
                this.setState({ jobs: res.data });
            })
            .catch((res) => {
                console.log(res);
                alert("error");
            });
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
                {/* //Title, Recruiter Name, Recruiter Ra ng, Salary, Dura on, Deadline */}
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
                                        <td>{item.title}</td>
                                        <td>{item.recruiterName}</td>
                                        <td>{item.rating}</td>
                                        <td>{item.salary}</td>
                                        <td>{item.duration}</td>
                                        <td>{new Date(item.deadline).toLocaleString()}</td>
                                        <td onClick={(e) => console.log(index)}>???</td>
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
