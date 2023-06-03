import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface User {
    id: number;
    username: string;
    avatar: string;
    registerDate: string
}

export interface AuthContextProps {
    user: User | null;
    authTokens: string | null;
    setAuthTokens: (tokens: string | null) => void;
    setUser: (user: User | null) => void;
    loginUser: (values: { username: string; password: string }) => void;
    logoutUser: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authTokens, setAuthTokens] = useState<string | null>(
        () => localStorage.getItem('authTokens') || null
    );
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loginUser = async (values: { username: string; password: string }) => {
        const userData = {
            username: values.username,
            password: values.password,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.status === 200) {
                const data = await response.json();
                setAuthTokens(data.access);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', data.access);
                navigate('/');
            } else {
                alert(`${userData.username}`+`${userData.password}`);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login.');
        }
    };


    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens));
        }
        setLoading(false);
    }, [authTokens]);

    const contextData: AuthContextProps = {
        user,
        authTokens,
        setAuthTokens,
        setUser,
        loginUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
