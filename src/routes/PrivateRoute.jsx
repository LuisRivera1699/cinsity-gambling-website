import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PrivateRoute = ({children}) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthContext();


    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return children;
}

export default PrivateRoute;