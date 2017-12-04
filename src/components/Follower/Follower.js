import React, { Component } from "react";
import { Link } from "react-router-dom";

class Follower extends Component {
  render() {
    const image = this.props.avatar_url;
    const name = this.props.login;
    return (
      <Link
        to={`/user/${name}`}
        title={name}
        className="column is-2 is-marginless is-paddingless"
      >
        <img className="image" src={image} alt={name} />
      </Link>
    );
  }
}

export default Follower;
