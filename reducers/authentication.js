import * as actionTypes from '../actions/authentication';

const initialState = {
    isAuthenticating: true,
    session: null,
    user: null,
    attributes: null,
};

const authentication = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATION_LOGIN_SUCCESS: {
            let userAttribute = {};
            if (action.currentUser) {
                if (action.currentUser.attributes) {
                    userAttribute = {...action.currentUser.attributes};
                }
                if (action.currentUser.challengeParam && action.currentUser.challengeParam.userAttributes) {
                    userAttribute = { ...action.currentUser.challengeParam.userAttributes };
                }
            }

            //  userAttribute['custom:company'] = 'Uplift';

            return {
                ...state, session: action.session, isAuthenticating: false, user: action.currentUser, error: null, attributes: userAttribute,
            };
        }
        case actionTypes.AUTHENTICATION_LOGIN_FAILURE:
            return {
                ...state, session: null, isAuthenticating: false, user: null, error: action.error, attributes: null,
            };
        case actionTypes.AUTHENTICATION_LOGOUT:
            return {
                ...state, session: null, user: null, attributes: null,
            };
        default:
            return state;
    }
};

export default authentication;
