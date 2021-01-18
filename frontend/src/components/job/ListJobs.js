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
                console.log(res);
                alert("error");
            });
    }

    createTableRow = (title, dop, applCnt, maxApplCnt) => {
        return (
            <tr>
                <td style={cellStyle}>{title}</td>
                <td style={cellStyle}>{dop}</td>
                <td style={cellStyle}>{applCnt}</td>
                <td style={cellStyle}>{maxApplCnt}</td>
                <td style={cellStyle}>
                    <button className="btn btn-warning" style={{ margin: "10px" }}>
                        e
                    </button>
                </td>
                <td style={cellStyle}>
                    <button className="btn btn-danger" style={{ margin: "10px" }}>
                        x
                    </button>
                </td>
            </tr>
        );
    };

    render() {
        return (
            <Fragment>
                <h1>Job listings</h1>
                <table className="table table-hover responsive bordered">
                    <thead class="thead-dark">
                        <tr>
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
                            return this.createTableRow(
                                item.title,
                                new Date(item.postingDate).toDateString(),
                                0,
                                item.maxApplicant
                            );
                        })}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

export default ListJobs;
