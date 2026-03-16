import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"
import axios from "axios"

function Register() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

const handleRegister = async () => {

  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill all fields")
    return
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match")
    return
  }

  const userData = {
    name: name,
    email: email,
    password: password
  }

  try {

    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      userData
    )

    alert(response.data)

    navigate("/login")

  } catch (error) {

    console.log(error)
    alert("Registration failed")

  }
}

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#dcefff] via-[#c9e6ff] to-[#b6dcff] relative overflow-hidden">

      <div className="absolute w-[600px] h-[600px] bg-blue-400/30 
      rounded-full blur-[150px]"></div>

      <div className="relative z-10 w-full max-w-md 
      bg-white/70 backdrop-blur-xl 
      rounded-3xl shadow-xl p-10">

        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Your Account
        </h2>

        <p className="text-center text-gray-600 mt-2 mb-8">
          Start your AI-powered heart health journey
        </p>

        {/* Name */}
        <div className="relative mb-5">
          <FaUser className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-12 py-3 rounded-full 
            bg-white/60 border border-gray-200 
            focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div className="relative mb-5">
          <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 py-3 rounded-full 
            bg-white/60 border border-gray-200 
            focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="relative mb-5">
          <FaLock className="absolute left-4 top-4 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 py-3 rounded-full 
            bg-white/60 border border-gray-200 
            focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Confirm Password */}
        <div className="relative mb-5">
          <FaLock className="absolute left-4 top-4 text-gray-400" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full pl-12 py-3 rounded-full 
            bg-white/60 border border-gray-200 
            focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full py-3 rounded-full 
          bg-gradient-to-r from-blue-500 to-blue-700 
          text-white font-semibold shadow-lg 
          hover:scale-[1.02] transition duration-300"
        >
          Create Account
        </button>

        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register