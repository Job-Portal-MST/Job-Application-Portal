import { Component, Fragment } from "react";
import ls from "local-storage";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Rating } from "@material-ui/lab";

class AcceptedApps extends Component {
    constructor() {
        super();
        this.state = { list: [] };
    }

    componentDidMount() {
        axios
            .get("/application/accepted", {
                params: { email: ls.get("email") },
            })
            .then((res) => {
                this.setState({ list: res.data });
            })
            .catch((res) => {
                console.log(res);
                alert("error");
            });
    }

    configureSection = () => {
        const sortBy = (cmp) => (e) => {
            e.preventDefault();
            this.setState({ list: this.state.list.sort(cmp) });
        };
        return (
            <div>
                <button
                    style={{ margin: "2px" }}
                    className="btn btn-sm btn-info"
                    onClick={sortBy((a, b) =>
                        a.user.name.toUpperCase() < b.user.name.toUpperCase() ? -1 : 1
                    )}
                >
                    Sort by name
                </button>
                <button
                    style={{ margin: "2px" }}
                    className="btn btn-sm btn-info"
                    onClick={sortBy((a, b) =>
                        a.user.name.toUpperCase() > b.user.name.toUpperCase() ? -1 : 1
                    )}
                >
                    Sort by name(rev)
                </button>
                <button
                    style={{ margin: "2px" }}
                    className="btn btn-sm btn-info"
                    onClick={sortBy((a, b) =>
                        a.job.title.toUpperCase() < b.job.title.toUpperCase() ? -1 : 1
                    )}
                >
                    Sort by Job title
                </button>
                <button
                    style={{ margin: "2px" }}
                    className="btn btn-sm btn-info"
                    onClick={sortBy((a, b) =>
                        a.job.title.toUpperCase() > b.job.title.toUpperCase() ? -1 : 1
                    )}
                >
                    Sort by Job title(rev)
                </button>
                <button
                    style={{ margin: "2px" }}
                    className="btn btn-sm btn-info"
                    onClick={sortBy((a, b) =>
                        new Date(a.job.postingDate) < new Date(b.job.postingDate) ? -1 : 1
                    )}
                >
                    Sort by date of joining
                </button>
                <button
                    style={{ margin: "2px" }}
                    className="btn btn-sm btn-info"
                    onClick={sortBy((a, b) =>
                        new Date(a.job.postingDate) > new Date(b.job.postingDate) ? -1 : 1
                    )}
                >
                    Sort by date of joining(rev)
                </button>
            </div>
        );
    };

    rateUser = (user) => (e, newValue) => {};

    createCard = (user, job) => {
        return (
            <div
                className="row"
                style={{
                    borderColor: "black",
                    border: "10px",
                    backgroundColor: "#eee",
                    margin: "auto",
                    marginTop: "25px",
                    width: "50%",
                    borderRadius: "10px",
                    padding: "10px",
                }}
            >
                <div style={{ width: "75%", margin: "auto" }}>
                    <b>Name: </b> {user.name} <br />
                    <b>Date of joining: </b>
                    {new Date(job.postingDate).toLocaleDateString("ca")}
                    <br />
                    <b>Job type: </b> {job.type} <br />
                    <b>Job title: </b> {job.title} <br />
                    <br />
                    <b>Rate applicant: </b>
                    <Rating
                        value={user.rating}
                        // onChange={this.rateUser(app)}
                    />
                    <br />
                </div>
            </div>
        );
    };

    render() {
        return (
            <Fragment>
                <h1>Your Accepted Applicants</h1>
                <div style={{ alignItems: "center" }}>{this.configureSection()}</div>
                <div className="container">
                    {this.state.list.map((item) => this.createCard(item.user, item.job))}
                </div>
            </Fragment>
        );
    }
}

export default AcceptedApps;
