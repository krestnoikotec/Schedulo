import { combineReducers } from "redux";
import userSlice from "@/redux/slices/UserSlice";

const rootReducer = combineReducers({
  user: userSlice,
});

export default rootReducer;
