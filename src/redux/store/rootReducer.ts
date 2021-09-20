import { combineReducers } from "redux";

import reducers from "../reducers";

const rootReducer = combineReducers({
  reducer: reducers,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>