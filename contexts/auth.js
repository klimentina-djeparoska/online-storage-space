// eslint-disable-next-line no-use-before-define
import React, {
    createContext, useState, useContext, useEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Auth } from '@aws-amplify/auth';
import { authenticationLoginSuccess, authenticationLoginFailure } from '../actions/authentication';

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        async function loadUser() {
            try {
                const session = await Auth.currentSession();
                const currentUser = await Auth.currentAuthenticatedUser();
                dispatch(authenticationLoginSuccess(session, currentUser));
                // console.log('Context current user', currentUser, session);
                if (currentUser) {
                    setUser(currentUser);
                }
                setLoading(false);
            } catch (err) {
                console.log('current user error', err);
                dispatch(authenticationLoginFailure(err));
                setUser(null);
                setLoading(false);
            }
        }
        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export function PrivateRoute(Component) {
    return (temp) => {
        const userState = useSelector((state) => state.authentication);
        const router = useRouter();

        if (userState.error && !userState.isAuthenticating) {
            router.push('/login');
        }

        // eslint-disable-next-line prefer-rest-params
        return (<Component {...temp}/>);
    };
}

export default function useAuth() {
    const context = useContext(AuthContext);

    return context;
}
