// React imports
import { Navigate } from "react-router-dom";

// Context imports
import { useAuthentication } from "../contexts/AuthenticationContext";

// Route to restrict access to anonymous users only
export function AnonymousRoute({ children }){
    const { user } = useAuthentication();

    if (user){
        return <Navigate to="/" replace />;
    }

    return children;
}

// Route to restrict access to authenticated users only
export function ProtectedRoute({ children }){
    const { user } = useAuthentication();

    if (!user){
        return <Navigate to="/account/login" replace />;
    }

    return children;
}