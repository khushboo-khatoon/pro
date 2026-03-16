function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* Logo + About */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">
            AI Cardiac Risk
          </h3>
          <p className="text-sm">
            AI-based healthcare system for early prediction of heart disease
            using advanced machine learning algorithms.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Features</li>
            <li className="hover:text-white cursor-pointer">Technology</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <p className="text-sm">Email: support@aicardiac.com</p>
          <p className="text-sm mt-2">Phone: +91 9876543210</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6">
        © 2026 AI-Based Cardiac Risk Prediction System. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer