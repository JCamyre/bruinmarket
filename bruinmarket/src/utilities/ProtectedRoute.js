import { Navigate, Outlet } from "react-router-dom";
import Login from "../components/pages/Login"

const ProtectedRoute = ({allowed, alternateRoute, children}) => {
    if (!allowed) {
        return <Navigate to={alternateRoute} replace />
    }
    return <Outlet />
}

export default ProtectedRoute