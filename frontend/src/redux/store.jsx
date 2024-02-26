import { configureStore } from "@reduxjs/toolkit"
import { thunk } from 'redux-thunk'
import { combineReducers} from "redux"
import { userReducer } from "./user/userReducer";

const reducer = combineReducers({
   
    user: userReducer,
    
})

let initialState = {}

const store = configureStore({
    reducer: reducer   ,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store;
