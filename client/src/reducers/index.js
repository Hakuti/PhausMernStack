import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorsReducers from "./errorsReducers";


export default combineReducers({
    auth: authReducers,
    errors: errorsReducers
})