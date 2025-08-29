import { useEffect } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const loading = useSelector((state) => state.loaderReducer.loading);
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(!loading && !isAuthenticated) navigate('/login');
  },[isAuthenticated, loading]);
  
  return children;
}

export default ProtectedRoute;
