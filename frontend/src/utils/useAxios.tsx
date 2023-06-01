import axios, { AxiosInstance } from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { useContext } from 'react';
import AuthContext, { AuthContextProps } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const baseURL = 'http://127.0.0.1:8000';

const useAxios = (): AxiosInstance => {
    const authContext = useContext(AuthContext);
    const { authTokens, setUser, setAuthTokens } = authContext || ({} as AuthContextProps);
    const navigate = useNavigate();

    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${authTokens?.toString()}` },
    });

    axiosInstance.interceptors.request.use(async (req) => {
        const user = jwt_decode(authTokens?.toString() || '') as { exp: number };
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return req;

        try {
            const response = await axios.post(`${baseURL}/api/token/refresh`, {
                refresh: authTokens?.toString(),
            });

            localStorage.setItem('authTokens', JSON.stringify(response.data));

            setAuthTokens && setAuthTokens(response.data);
            setUser && setUser(jwt_decode(response.data.access));

            req.headers.Authorization = `Bearer ${response.data.access}`;
            return req;
        } catch (error) {
            console.error('Token refresh error:', error);
            navigate('/login');
            throw error;
        }
    });

    return axiosInstance;
};

export default useAxios;
