import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authorize } from "../../actions/auth";
import { getToken } from "../../reducers/auth";
import {
  getNetworkError,
  getIsNetworkErrorPresent
} from "../../reducers/network";

export class AuthPage extends Component {
  state = {
    queryText: ""
  };
  onChangeHandler = e => {
    this.setState({ queryText: e.target.value });
  };
  onKeyDownHandler = e => {
    const { queryText } = this.state;
    const { authorize } = this.props;
    if (e.keyCode === 13) {
      authorize(queryText);
    }
  };
  render() {
    const { token, networkError, networkErrorText } = this.props;
    const { queryText } = this.state;
    return (
      <div className="columns is-centered">
        {token && <Redirect to="/" />}
        <div className="column is-4">
          <div className="field">
            <label className="label">Enter your token</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Text input"
                value={queryText}
                onChange={this.onChangeHandler}
                onKeyDown={this.onKeyDownHandler}
              />
            </div>
            <p className="help">
              You can get it on github. Push ENTER to submit
            </p>
          </div>
          {networkError && <p className="error">{networkErrorText}</p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: getToken(state),
    networkErrorText: getNetworkError(state),
    networkError: getIsNetworkErrorPresent(state)
  };
};

const mapDispatchToProps = {
  authorize
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
