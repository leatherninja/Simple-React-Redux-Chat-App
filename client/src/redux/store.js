import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import chatReducer from "./reducers/chatReducer";



const rootReducer = combineReducers({
   chat: chatReducer, 
});


const store = createStore(rootReducer, applyMiddleware(thunk));


export default store;