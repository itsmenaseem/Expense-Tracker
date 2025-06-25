// components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const accessToken = useSelector(state => state.auth.accessToken);
    console.log(accessToken);
    
  if (!accessToken) {
    // 🚫 Not logged in — redirect to login
    return <Navigate to="/" replace />;
  }

  // ✅ Logged in — render the route content
  return children;
}
