import { FaRegEdit, FaBrain, FaFileMedicalAlt } from "react-icons/fa"

function HowItWorks() {
  const steps = [
    {
      icon: <FaRegEdit />,
      title: "Enter Health Data",
      desc: "Enter your data input for over health data.",
    },
    {
      icon: <FaBrain />,
      title: "AI Analysis",
      desc: "AI analyzes cloud processing on AI analysis.",
      highlight: true,
    },
    {
      icon: <FaFileMedicalAlt />,
      title: "Get Risk Report",
      desc: "Get risk, personalized reports and dashboard.",
    },
  ]

  return (
    <section
      id="how"
      className="scroll-mt-24 py-20 px-6 md:px-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-4xl font-bold text-gray-900 mb-14">
          How It Works
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">

          {steps.map((step, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 
              shadow-md hover:shadow-xl 
              transition duration-300 
              ${
                step.highlight
                  ? "border border-blue-200"
                  : ""
              }`}
            >
              {/* Icon */}
              <div
                className={`w-20 h-20 mx-auto flex items-center justify-center 
                rounded-2xl text-3xl 
                ${
                  step.highlight
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default HowItWorks