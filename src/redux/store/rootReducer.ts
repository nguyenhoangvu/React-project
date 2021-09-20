import { combineReducers } from "redux";

import reducer from "../reducers";

const rootReducer = combineReducers({
  reducer: reducer,
});

export default rootReducer;
