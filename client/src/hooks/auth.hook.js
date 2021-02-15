import {useCallback, useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [expiresIn, setExpiresIn] = useState(null);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);

        const {exp} = jwt_decode(jwtToken);
        const expTime = moment.unix(exp)
            .format('x');
        const now = moment()
            .format('x');
        setExpiresIn(moment(expTime - now));

        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jwtToken
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.userId);
        }
    }, [login]);

    return {
        login,
        logout,
        token,
        userId,
        expiresIn
    };
};
