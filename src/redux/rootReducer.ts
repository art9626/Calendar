import { combineReducers } from "redux";
import { authReducer } from "./reducers/auth/authReducer";
import { eventReducer } from "./reducers/event/eventReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
});