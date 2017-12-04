import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "react-svg-spinner";

import { fetchFollowersRequest } from "../../actions/followers";
import {
  getUserFollowers,
  getIsFetched,
  getIsFetching,
  getError
} from "../../reducers/followers";

import Follower from "../Follower";

export class Followers extends Component {
  componentDidMount() {
    const { fetchFollowersRequest, login } = this.props;

    fetchFollowersRequest(login);
  }
  renderFollowers = () => {
    const { followers, isFetched, isFetching, error } = this.props;
    if (isFetching) {
      return <Spinner height="32px" width="32px" />;
    } else if (followers && isFetched) {
      return followers.map(follower => {
        return (
          <Follower key={follower.id} login={follower.login} {...follower} />
        );
      });
    } else if (error) {
      return <p>{error}</p>;
    }
  };
  render() {
    return <div className="columns is-multiline">{this.renderFollowers()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    followers: getUserFollowers(state),
    isFetched: getIsFetched(state),
    isFetching: getIsFetching(state),
    error: getError(state)
  };
};

const mapDispatchToProps = {
  fetchFollowersRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Followers);
