import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

interface AuthProps {
    children: React.ReactElement
}

export type AuthContextType = {
    user: {
        id: number,
        email: string
    },
    login: (data: object) => Promise<void>,
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProps) => {
    const [user, setUser] = useLocalStorage("user", null)
    const navigate = useNavigate();

    const login = async (data: object) => {
        setUser(data)
        navigate("/admin", { replace: true })
    }

    const logout = () => {
        setUser(null);
        navigate("/login", { replace: true })
    }

    const value = useMemo(() => ({
        user,
        login,
        logout
    }),
        [user]
    )

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext) as AuthContextType;
}

