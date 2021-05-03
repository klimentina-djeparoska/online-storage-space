export const AUTHENTICATION_LOGIN = 'AUTHENTICATION_LOGIN';
export const AUTHENTICATION_LOGIN_SUCCESS = 'AUTHENTICATION_LOGIN_SUCCESS';
export const AUTHENTICATION_LOGIN_FAILURE = 'AUTHENTICATION_LOGIN_FAILURE';
export const AUTHENTICATION_LOGOUT = 'AUTHENTICATION_LOGOUT';

export const authenticationLoginSuccess = (session, currentUser) => ({
    type: AUTHENTICATION_LOGIN_SUCCESS,
    session,
    currentUser,
});

export const authenticationLoginFailure = (error) => ({
    type: AUTHENTICATION_LOGIN_FAILURE,
    error,
});

export const logout = () => ({
    type: AUTHENTICATION_LOGOUT,
});
