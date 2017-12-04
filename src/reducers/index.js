import { combineReducers } from "redux";
import users from "./users";
import network from "./network";
import followers from "./followers";
import auth from "./auth";

export default combineReducers({ auth, network, followers, users });
