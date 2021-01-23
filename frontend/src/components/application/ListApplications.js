import { Component, Fragment } from "react";
import ls from "local-storage";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const cellStyle = { textAlign: "center", verticalAlign: "middle" };

class ListApplications extends Component {
    constructor() {
        super();
        this.state = {
            job: { title: "" },
            appList: [],
        };
    }
    componentDidMount() {
        const jobid = new URLSearchParams(this.props.location.search).get("jobid");
        axios
            .get("/job", { params: { jobid } })
            .then((res) => {
                this.setState({ job: res.data[0] });
            })
            .catch((res) => {
                console.log(res);
                alert("error");
            });
        axios
            .get("/application/ofjob", {
                params: { jobid },
            })
            .then((res) => {
                this.setState({ appList: res.data });
            })
            .catch((res) => {
                console.log(res);
                alert(res);
            });
    }

    createCard = (user, app, job = this.state.job) => {
        let skills = "";
        user.skills.map((skill) => {
            skills += skill + ", ";
        });
        skills = skills.slice(0, -2);
        let bt1 = <Fragment></Fragment>;
        if (app.status === "applied") {
            bt1 = (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        axios
                            .post("/application/shortlist", { appId: app._id })
                            .then((res) => window.location.reload())
                            .catch((res) => {
                                console.log(res);
                                alert("error");
                            });
                    }}
                >
                    Shortlist
                </button>
            );
        } else if (app.status === "shortlisted") {
            bt1 = (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        axios
                            .post("/application/accept", { appId: app._id })
                            .then((res) => window.location.reload())
                            .catch((res) => {
                                console.log(res);
                                alert("error");
                            });
                    }}
                >
                    Accept
                </button>
            );
        }
        let bt2 = <Fragment></Fragment>;
        if (app.status != "rejected" && app.status != "accepted") {
            bt2 = (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        axios
                            .post("/application/reject", { appId: app._id })
                            .then((res) => window.location.reload())
                            .catch((res) => {
                                console.log(res);
                                alert("error");
                            });
                    }}
                >
                    Reject
                </button>
            );
        }
        return (
            <div
                className="col-4"
                style={{
                    backgroundColor: "#eee",
                    margin: "auto",
                    borderRadius: "10px",
                    padding: "10px",
                }}
            >
                <p>
                    <b>Name: </b>
                    {user.name}
                    <br />
                    <b>Skills: </b>
                    {skills}
                    <br />
                    <b>Date of Application: </b>
                    {new Date(app.dop).toLocaleString("ca")}
                    <br />
                    <b>Education: </b>
                    <ul>
                        {user.ed.map((item) => {
                            return (
                                <li>
                                    {item.insti}({item.startYear}-{item.endYear})
                                </li>
                            );
                        })}
                    </ul>
                    <b>SOP: </b> {app.bio} <br />
                    <b>Application Status: </b> {app.status} <br />
                    {bt1}
                    {bt2}
                </p>
            </div>
        );
    };

    render() {
        return (
            <Fragment>
                <h1>Job({this.state.job.title}) Applications</h1>
                <br />
                <div className="containeer">
                    <div className="row">
                        {this.state.appList.map((item, index) => this.createCard(item.user, item))}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ListApplications;
