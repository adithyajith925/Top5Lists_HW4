import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import api from '../api';
import { ScreenType } from '../store';

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    GUEST_VIEW: "GUEST_VIEW"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        isGuest: false
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    isGuest: false
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    isGuest: false
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    isGuest: false
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    isGuest: false
                })
            }
            case AuthActionType.GUEST_VIEW: {
                return setAuth({
                    user: null,
                    loggedIn: payload.loggedIn,
                    isGuest: payload.isGuest
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        try {
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }                
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    auth.enterGuestView = function() {
        authReducer({
            type: AuthActionType.GUEST_VIEW,
            payload: {loggedIn: true, isGuest: true}
        });
    }

    auth.exitGuestView = function() {
        authReducer({
            type: AuthActionType.GUEST_VIEW,
            payload: {loggedIn: false, isGuest: false}
        });
    }

    auth.registerUser = async function(userData, store) {
        try {
            const response = await api.registerUser(userData);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        }
        catch (err) {
            if(err.response) {
                return err.response.data.errorMessage;
            }
        }
    }

    auth.logoutUser = async function(userData) {
        if(auth.isGuest) {
            authReducer({
                type:AuthActionType.LOGOUT_USER
            });
            return;
        }
        try {
            const response = await api.logoutUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGOUT_USER
                })
                history.push("/");
            }
        }
        catch (err) {
            console.log("oopsie broke");
        }
    }

    auth.loginUser = async function(userData, store) {
        try {
            const response = await api.loginUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs(ScreenType.HOME);
            }
        }
        catch (err) {
            return err.response.data.errorMessage;
        }
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };