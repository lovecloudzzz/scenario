import axios, { AxiosInstance } from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { useContext, useEffect } from 'react';
import AuthContext, { AuthContextProps } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const baseURL = 'http://127.0.0.1:8000';

const useAxios = (): AxiosInstance => {
    const authContext = useContext(AuthContext);
    const { authTokens, setUser, setAuthTokens, logoutUser } = authContext || ({} as AuthContextProps);
    const navigate = useNavigate();

    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${authTokens?.toString()}` },
    });

    const refreshTokens = async () => {
        try {
            const response = await axios.post(`${baseURL}/api/token/refresh`, {
                refresh: authTokens?.toString(),
            });

            localStorage.setItem('authTokens', JSON.stringify(response.data));

            setAuthTokens && setAuthTokens(response.data);
            setUser && setUser(jwt_decode(response.data.access));

            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        } catch (error) {
            console.error('Token refresh error:', error);
            navigate('/login');
            logoutUser(); // Вызов logoutUser при ошибке обновления токенов
            throw error;
        }
    };


    useEffect(() => {
        const checkAndRefreshTokens = async () => {
            if (!authTokens) return;

            const user = jwt_decode(authTokens?.toString() || '') as { exp: number };
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

            if (isExpired) {
                await refreshTokens();
            }
        };

        checkAndRefreshTokens();
    }, [authTokens, refreshTokens]);

    axiosInstance.interceptors.request.use(async (req) => {
        const user = jwt_decode(authTokens?.toString() || '') as { exp: number };
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (isExpired) {
            await refreshTokens();
        }

        return req;
    });

    return axiosInstance;
};

export default useAxios;
