import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL
} from './userTypes'

import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.token}`
            },
        }
        
        const { data } = await axios.post(`http://localhost:8080/api/user/login`, { email, password }, config)
        localStorage.setItem('token', data.token);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
};

// Register user

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.token}`
            },
            
        }
        
        const { data } = await axios.post(`http://localhost:8080/api/signup`, userData, config)
        localStorage.setItem('token', data.token);

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Logout user
export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('token');

        dispatch({
            type: LOGOUT_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}


  
  
