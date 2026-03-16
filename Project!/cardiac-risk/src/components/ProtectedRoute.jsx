import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function ProtectedRoute({ children }) {

  const { user, loading } = useContext(AuthContext)

  // jab tak localStorage check ho raha hai
  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute