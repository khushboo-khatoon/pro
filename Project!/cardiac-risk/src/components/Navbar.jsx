import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaHeartbeat, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-24 py-4 flex items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white shadow-sm">
            <FaHeartbeat size={18} />
          </div>

          <span className="font-semibold text-gray-800 text-lg">
            CardioAI
          </span>
        </Link>

        {/* Center Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-600 mx-auto">
          <a href="#home" className="hover:text-blue-600 transition">Home</a>
          <a href="#features" className="hover:text-blue-600 transition">Features</a>
          <a href="#how" className="hover:text-blue-600 transition">Technology</a>
          <a href="#why" className="hover:text-blue-600 transition">Why Us</a>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-5 ml-auto">

          {user ? (
            <>
              <span className="text-gray-700 text-sm">
                Hello, <b>{user.name}</b>
              </span>

              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 shadow-sm"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition duration-300"
              >
                <FaSignOutAlt size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-6 py-2 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 shadow-sm"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;