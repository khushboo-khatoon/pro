import { useContext } from "react"
import { useNavigate, Link, Outlet } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

import { FaHome, FaHeartbeat, FaHistory, FaFileAlt, FaSignOutAlt } from "react-icons/fa"

function DashboardLayout() {

  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (

    <div className="flex min-h-screen bg-gray-100">

      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">

        <div>

          <h1 className="text-2xl font-bold text-blue-600 mb-10">
            CardioAI
          </h1>

          <nav className="space-y-4">

            <Link
              to="/dashboard"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
            >
              <FaHome /> Dashboard
            </Link>

            <Link
              to="/dashboard/predict"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
            >
              <FaHeartbeat /> Predict Risk
            </Link>

            <Link
              to="/dashboard/history"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
            >
              <FaHistory /> History
            </Link>

            <Link
              to="/dashboard/report"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
            >
              <FaFileAlt /> Reports
            </Link>

          </nav>

        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-600 hover:text-red-500"
        >
          <FaSignOutAlt /> Logout
        </button>

      </aside>

      <div className="flex-1 p-8">

        <div className="flex justify-end mb-8">
          <p className="text-gray-600">
             Welcome, <span className="font-semibold">{user?.name}</span>
          </p>
        </div>

        <Outlet />

      </div>

    </div>

  )
}

export default DashboardLayout