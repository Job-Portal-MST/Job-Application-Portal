import { BrowserRouter as Router, Route } from "react-router-dom";
import ls from "local-storage";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import Welcome from "./components/user/Welcome";
import CreateJob from "./components/job/CreateJob";
import ListJobs from "./components/job/ListJobs";
import JobEdit from "./components/job/JobEdit";
import SearchJobs from "./components/job/SearchJobs";
import ApplyJob from "./components/job/ApplyJob";

function App() {
    return (
        <Router>
            <div className="container">
                <Navbar />
                <br />
                <Route path="/" exact component={Welcome} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/createJob" exact component={CreateJob} />
                <Route path="/myListings" exact component={ListJobs} />
                <Route path="/jobedit" exact component={JobEdit} />
                <Route path="/jobsearch" exact component={SearchJobs} />
                <Route path="/jobapply" exact component={ApplyJob} />
            </div>
        </Router>
    );
}

export default App;
