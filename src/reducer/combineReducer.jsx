import reducer from "./reducer"
import rulesreducer from "./rulesreducer"
 
import { combineReducers } from "redux";
const allReducer = combineReducers({
    reducer:reducer,
    rulesreducer:rulesreducer,
  
});
export default allReducer;
