import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4 text-default">
                Workers Social Network
              </h1>
              <p className="lead">
                Create a Worker's Profile/Portfolio, share Posts, and get
                connected to other Workers
              </p>
              <hr />
              <Link to="/register" className="btn btn-lg btn-info mr-2">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-lg btn-success ml-4">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
