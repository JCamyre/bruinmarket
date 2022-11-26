import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({allowed, alternateRoute, children}) => {
    if (!allowed) {
        return <Navigate to={alternateRoute} replace />
    }
    return <Outlet />
}

export default ProtectedRoute