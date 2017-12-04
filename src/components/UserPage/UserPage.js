import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "react-svg-spinner";

import Followers from "../Followers";

import { Redirect } from "react-router-dom";

import {
  fetchUserDataRequest,
  fetchTokenOwnerRequest
} from "../../actions/users";

import { logout } from "../../actions/auth";
import {
  getUserImage,
  getUserName,
  getUserNickname,
  getUserFollowersCount,
  getUserPubReposCount,
  getIsFetching,
  getIsFetched,
  getError
} from "../../reducers/users";

import { getIsAuthorized } from "../../reducers/auth";

import { getToken } from "../../reducers/auth";

export class UserPage extends Component {
  componentDidMount() {
    const { fetchUserDataRequest, fetchTokenOwnerRequest, token } = this.props;
    const userName = this.props.match.params.name;
    if (!userName || userName === "me") {
      fetchTokenOwnerRequest(token);
    } else {
      fetchUserDataRequest(userName);
    }
  }
  componentWillReceiveProps(nextProps) {
    const userName = this.props.match.params.name;
    const newUserName = nextProps.match.params.name;
    const { fetchUserDataRequest } = this.props;
    if (newUserName !== userName) {
      fetchUserDataRequest(newUserName);
    }
  }
  logout = () => {
    const { logout } = this.props;
    logout();
  };
  renderContent = () => {
    const {
      userImage,
      userName,
      userNickname,
      userFollowersCount,
      userPubReposCount,
      isFetching,
      isFetched,
      error
    } = this.props;

    if (userNickname && this.props.match.params.name !== userNickname) {
      return <Redirect to={`/user/${userNickname}`} />;
    }
    if (isFetching) {
      return <Spinner size="64px" color="fuchsia" gap={5} />;
    } else if (!isFetching && isFetched && !userName) {
      return <p className="error">there is no user with this name</p>;
    } else if (!isFetching && isFetched && userName) {
      return (
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src={userImage} alt="Avatar" />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">{userName}</p>
                <p className="subtitle is-6">{userNickname}</p>
              </div>
            </div>
            <div className="content">
              <ul>
                <li>Followers: {userFollowersCount}</li>
                <li>Repos: {userPubReposCount}</li>
              </ul>
              <Followers login={userNickname} />
            </div>
          </div>
        </div>
      );
    } else if (error) {
      return <p>{error}</p>;
    }
  };
  render() {
    const { isAuthorized } = this.props;
    return (
      <div>
        {isAuthorized ? (
          <button
            onClick={this.logout}
            className="button logout is-danger is-pulled-right"
          >
            Log Out
          </button>
        ) : (
          <Redirect to="/login" />
        )}
        <div className="columns is-centered is-marginless">
          <div className="column is-4">{this.renderContent()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userImage: getUserImage(state),
    userName: getUserName(state),
    userNickname: getUserNickname(state),
    userFollowersCount: getUserFollowersCount(state),
    userPubReposCount: getUserPubReposCount(state),
    isFetching: getIsFetching(state),
    isFetched: getIsFetched(state),
    error: getError(state),
    token: getToken(state),
    isAuthorized: getIsAuthorized(state)
  };
};

const mapDispatchToProps = {
  fetchUserDataRequest,
  fetchTokenOwnerRequest,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
