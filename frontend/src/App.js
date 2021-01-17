import { BrowserRouter as Router, Route } from "react-router-dom";
import ls from "local-storage";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import Welcome from "./components/user/Welcome";
import { Fragment } from "react";

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
            </div>
        </Router>
    );
}

export default App;
