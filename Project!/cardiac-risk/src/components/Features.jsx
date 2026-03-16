import { FaBrain, FaHeartbeat, FaShieldAlt, FaChartLine } from "react-icons/fa"

function Features() {
  const features = [
    {
      icon: <FaBrain />,
      title: "AI Analysis",
      desc: "Advanced neural network processing your cardiac health data.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Risk Scoring",
      desc: "Instant personalized heart disease risk calculation.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Data",
      desc: "Enterprise-level encryption & HIPAA-compliant security.",
    },
    {
      icon: <FaChartLine />,
      title: "Actionable Insights",
      desc: "Clear medical recommendations based on your profile.",
    },
  ]

  return (
    <section
      id="features"
      className="scroll-mt-24 py-20 px-6 md:px-20 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Advanced Medical AI Features
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl shadow-md 
              hover:shadow-xl transition duration-300"
            >
              <div className="w-14 h-14 flex items-center justify-center 
                rounded-xl bg-blue-100 text-blue-600 text-xl">
                {item.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-3 text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features