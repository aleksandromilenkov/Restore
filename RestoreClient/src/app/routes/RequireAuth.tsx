import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserInfoQuery } from "../../features/account/accountApi"
import { LinearProgress } from "@mui/material";

const RequireAuth = () => {
    const {data:user, isLoading} = useUserInfoQuery();
    const location = useLocation();
    if(isLoading) return <LinearProgress/>
    if(!user) return <Navigate to={"/login"} state={{from: location}}/>
  return (
    <Outlet/>
  )
}
export default RequireAuth