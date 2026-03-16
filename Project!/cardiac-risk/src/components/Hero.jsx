import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import heartImage from "../assets/heart1.png"

function Hero() {

  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleCheckRisk = () => {

    if(user){
      navigate("/dashboard/predict")
    }
    else{
      navigate("/login")
    }

  }

  return (

    <section
      id="home"
      className="mt-16 relative overflow-hidden 
      bg-gradient-to-r 
      from-[#eaf4ff] via-[#e3f2ff] to-[#d6ecff] 
      py-24 px-6 md:px-20 scroll-mt-24"
    >

      {/* Soft Background Glow */}

      <div className="absolute top-1/2 left-1/2 
        w-[600px] h-[600px] 
        bg-blue-400/30 rounded-full 
        blur-[160px] 
        -translate-x-1/2 -translate-y-1/2">
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 items-center gap-12">

        {/* LEFT CONTENT */}

        <div>

          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Predict Heart Disease Risk with AI
          </h1>

          <p className="mt-6 text-gray-600 text-lg max-w-lg">
            Leverage advanced artificial intelligence for early detection
            and personalized insights into your cardiac health.
          </p>

          <div className="mt-8 flex gap-4">

            {/* CHECK RISK BUTTON */}

            <button
              onClick={handleCheckRisk}
              className="bg-blue-600 text-white px-8 py-3 rounded-full 
              shadow-md hover:bg-blue-700 transition duration-300"
            >
              Check Your Risk Now
            </button>

            <button
              className="border border-gray-300 text-gray-700 
              px-8 py-3 rounded-full hover:bg-white transition duration-300"
            >
              Learn More
            </button>

          </div>

        </div>

        {/* RIGHT IMAGE */}

        <div className="flex justify-center relative">

          <div className="absolute w-[450px] h-[450px] 
            bg-blue-500/20 rounded-full blur-[120px]">
          </div>

          <img
            src={heartImage}
            alt="AI Heart"
            className="relative w-[420px] drop-shadow-2xl"
          />

        </div>

      </div>

    </section>

  )

}

export default Hero