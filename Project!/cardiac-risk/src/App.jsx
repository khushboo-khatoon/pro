import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

import DashboardLayout from "./pages/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import Predict from "./pages/Predict"
import History from "./pages/History"
import Report from "./pages/Report"

import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >

        <Route index element={<Dashboard />} />
        <Route path="predict" element={<Predict />} />
        <Route path="history" element={<History />} />
        <Route path="report" element={<Report />} />

      </Route>

    </Routes>
  )
}

export default App