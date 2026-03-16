import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"

import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"

function Login() {

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please fill all fields")
      return
    }

    try {

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: email,
          password: password
        }
      )

      const userData = {
        name: response.data.name,
        email: response.data.email
      }

      login(userData)

      navigate("/dashboard")

    } catch (error) {

      alert("Invalid email or password")

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#dcefff] via-[#c9e6ff] to-[#b6dcff] relative overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[600px] h-[600px] bg-blue-400/30 
      rounded-full blur-[150px]"></div>

      <div className="relative z-10 w-full max-w-md 
      bg-white/70 backdrop-blur-xl 
      rounded-3xl shadow-xl p-10">

        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>

        <p className="text-center text-gray-600 mt-2 mb-8">
          Login to access your AI cardiac dashboard
        </p>

        {/* Email */}
        <div className="relative mb-5">

          <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full 
            bg-white/60 border border-gray-200 
            focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

        </div>

        {/* Password */}
        <div className="relative mb-4">

          <FaLock className="absolute left-4 top-4 text-gray-400" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-12 py-3 rounded-full 
            bg-white/60 border border-gray-200 
            focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-gray-400"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-full 
          bg-gradient-to-r from-blue-500 to-blue-700 
          text-white font-semibold shadow-lg 
          hover:scale-[1.02] transition duration-300"
        >
          Sign In Securely
        </button>

        <p className="text-center text-sm mt-6 text-gray-600">
          New to CardioAI?{" "}
          <a href="/register" className="text-blue-600 font-medium">
            Register Now
          </a>
        </p>

      </div>

    </div>

  )
}

export default Login