export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fce7f3' }}>
      {/* Header with ribbon background */}
      <div 
        className="relative bg-cover bg-center py-20 px-6"
        style={{
          backgroundImage: `linear-gradient(rgba(251, 207, 232, 0.8), rgba(251, 207, 232, 0.8)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"><path d="M0,100 Q300,50 600,100 T1200,100 L1200,300 Q900,250 600,300 T0,300 Z" fill="%23ec4899" opacity="0.3"/><path d="M0,150 Q300,100 600,150 T1200,150 L1200,350 Q900,300 600,350 T0,350 Z" fill="%23ec4899" opacity="0.2"/></svg>')`
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-pink-800 mb-6">
            Breast Cancer Awareness & Prediction
          </h1>
          <p className="text-xl text-pink-700 mb-8 max-w-2xl mx-auto">
            Early detection saves lives. Use our advanced prediction tools and learn more about breast cancer awareness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/prediction" 
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Prediction Test
            </a>
            <a 
              href="/image-analysis" 
              className="bg-white hover:bg-pink-50 text-pink-600 border-2 border-pink-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Image Analysis
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-center space-x-8">
            <a href="/" className="text-pink-600 hover:text-pink-800 font-medium border-b-2 border-pink-600">
              Home
            </a>
            <a href="/about" className="text-pink-600 hover:text-pink-800 font-medium">
              About
            </a>
            <a href="/prediction" className="text-pink-600 hover:text-pink-800 font-medium">
              Prediction
            </a>
            <a href="/image-analysis" className="text-pink-600 hover:text-pink-800 font-medium">
              Image Analysis
            </a>
            <a href="/doctors" className="text-pink-600 hover:text-pink-800 font-medium">
              Doctors
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature Cards */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-pink-500">
            <div className="text-pink-600 text-4xl mb-4">🎗️</div>
            <h3 className="text-xl font-bold text-pink-800 mb-3">Awareness</h3>
            <p className="text-gray-600">
              Learn about breast cancer symptoms, risk factors, and prevention methods.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-pink-500">
            <div className="text-pink-600 text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-pink-800 mb-3">Prediction</h3>
            <p className="text-gray-600">
              Take our questionnaire to assess your risk level based on various factors.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-pink-500">
            <div className="text-pink-600 text-4xl mb-4">🖼️</div>
            <h3 className="text-xl font-bold text-pink-800 mb-3">Image Analysis</h3>
            <p className="text-gray-600">
              Upload medical images for AI-powered analysis and insights.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-pink-500">
            <div className="text-pink-600 text-4xl mb-4">👩‍⚕️</div>
            <h3 className="text-xl font-bold text-pink-800 mb-3">Expert Doctors</h3>
            <p className="text-gray-600">
              Book appointments with our specialized breast cancer experts.
            </p>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-pink-800 mb-6 text-center">
            Why Early Detection Matters
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-pink-700 mb-3">Statistics</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 1 in 8 women will develop breast cancer</li>
                <li>• Early detection increases survival rates to 99%</li>
                <li>• Regular screening saves thousands of lives annually</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-pink-700 mb-3">Our Mission</h3>
              <p className="text-gray-600">
                We provide accessible tools and information to help individuals assess their risk 
                and understand breast cancer better. Our AI-powered analysis tools are designed 
                to support medical professionals and raise awareness.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-pink-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="mb-2">Breast Cancer Awareness & Prediction Platform</p>
          <p className="text-pink-200 text-sm">
            This tool is for educational purposes only. Always consult with healthcare professionals.
          </p>
        </div>
      </footer>
    </div>
  );
}