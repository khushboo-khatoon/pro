import doctorImage from "../assets/image.png"

function WhyChooseUs() {
  const points = [
    "99% Accuracy Rate",
    "Validated Clinical Models",
    "Personalized Recommendations",
    "Secure & Private",
    "Fast Results",
  ]

  return (
    <section
      id="why"
      className="scroll-mt-24 py-24 px-6 md:px-20 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

        {/* Left Side */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-10">
            Why Choose Us
          </h2>

          <ul className="space-y-6">
            {points.map((item, index) => (
              <li key={index} className="flex items-center gap-4">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700 text-lg font-medium">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Image */}
        <div className="flex justify-center relative">
          
          {/* Soft Glow */}
          <div className="absolute w-[450px] h-[450px] bg-blue-300 opacity-30 rounded-full blur-[120px]"></div>

          <img
            src={doctorImage}
            alt="Doctor AI"
            className="relative rounded-3xl shadow-2xl w-full max-w-md animate-[float_6s_ease-in-out_infinite]"
          />
        </div>

      </div>
    </section>
  )
}

export default WhyChooseUs