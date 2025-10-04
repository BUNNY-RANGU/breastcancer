export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fce7f3' }}>
      {/* Header */}
      <div 
        className="relative bg-cover bg-center py-16 px-6"
        style={{
          backgroundImage: `linear-gradient(rgba(251, 207, 232, 0.8), rgba(251, 207, 232, 0.8)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"><path d="M0,100 Q300,50 600,100 T1200,100 L1200,300 Q900,250 600,300 T0,300 Z" fill="%23ec4899" opacity="0.3"/><path d="M0,150 Q300,100 600,150 T1200,150 L1200,350 Q900,300 600,350 T0,350 Z" fill="%23ec4899" opacity="0.2"/></svg>')`
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-pink-800 mb-4">About Us</h1>
          <p className="text-lg text-pink-700">
            Dedicated to breast cancer awareness and early detection
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-center space-x-8">
            <a href="/" className="text-pink-600 hover:text-pink-800 font-medium">
              Home
            </a>
            <a href="/about" className="text-pink-600 hover:text-pink-800 font-medium border-b-2 border-pink-600">
              About
            </a>
            <a href="/prediction" className="text-pink-600 hover:text-pink-800 font-medium">
              Prediction
            </a>
            <a href="/image-analysis" className="text-pink-600 hover:text-pink-800 font-medium">
              Image Analysis
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-pink-800 mb-6">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            We are committed to raising awareness about breast cancer and providing accessible tools 
            for early detection. Our platform combines advanced technology with educational resources 
            to empower individuals in their health journey.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Through our prediction questionnaire and AI-powered image analysis, we aim to support 
            healthcare professionals and individuals in making informed decisions about breast health.
          </p>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-pink-800 mb-6">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-pink-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-pink-600">👩‍⚕️</span>
              </div>
              <h3 className="text-xl font-semibold text-pink-800 mb-2">Dr. Sarah Johnson</h3>
              <p className="text-gray-600">Lead Oncologist</p>
              <p className="text-sm text-gray-500 mt-2">
                Specializing in breast cancer research with 15+ years of experience
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-pink-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-pink-600">👨‍💻</span>
              </div>
              <h3 className="text-xl font-semibold text-pink-800 mb-2">Michael Chen</h3>
              <p className="text-gray-600">AI Research Engineer</p>
              <p className="text-sm text-gray-500 mt-2">
                Expert in machine learning and medical image analysis
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-pink-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-pink-600">👩‍🔬</span>
              </div>
              <h3 className="text-xl font-semibold text-pink-800 mb-2">Dr. Emily Rodriguez</h3>
              <p className="text-gray-600">Medical Data Scientist</p>
              <p className="text-sm text-gray-500 mt-2">
                Focused on predictive modeling and risk assessment
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-pink-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-pink-600">👨‍⚕️</span>
              </div>
              <h3 className="text-xl font-semibold text-pink-800 mb-2">Dr. James Wilson</h3>
              <p className="text-gray-600">Radiologist</p>
              <p className="text-sm text-gray-500 mt-2">
                Specialist in breast imaging and diagnostic techniques
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-pink-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-pink-600">👩‍💼</span>
              </div>
              <h3 className="text-xl font-semibold text-pink-800 mb-2">Lisa Thompson</h3>
              <p className="text-gray-600">Patient Advocate</p>
              <p className="text-sm text-gray-500 mt-2">
                Breast cancer survivor and awareness coordinator
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-pink-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-pink-600">👨‍🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-pink-800 mb-2">Dr. Robert Kim</h3>
              <p className="text-gray-600">Research Director</p>
              <p className="text-sm text-gray-500 mt-2">
                Leading clinical trials and treatment innovations
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-pink-800 mb-6">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-pink-700 mb-3">🎯 Accuracy</h3>
              <p className="text-gray-600">
                We strive for the highest accuracy in our prediction models and analysis tools, 
                continuously improving through research and validation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-pink-700 mb-3">🤝 Accessibility</h3>
              <p className="text-gray-600">
                Making breast cancer awareness and screening tools accessible to everyone, 
                regardless of their background or location.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-pink-700 mb-3">🔒 Privacy</h3>
              <p className="text-gray-600">
                Protecting user data and maintaining strict confidentiality in all our 
                analysis and prediction services.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-pink-700 mb-3">💡 Innovation</h3>
              <p className="text-gray-600">
                Leveraging cutting-edge AI and machine learning technologies to advance 
                breast cancer detection and prevention.
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