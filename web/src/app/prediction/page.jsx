'use client';
import { useState } from 'react';

export default function PredictionPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [riskLevel, setRiskLevel] = useState('');

  const questions = [
    {
      id: 'age',
      question: 'What is your age?',
      type: 'select',
      options: [
        { value: 1, label: 'Under 30' },
        { value: 2, label: '30-39' },
        { value: 3, label: '40-49' },
        { value: 4, label: '50-59' },
        { value: 5, label: '60-69' },
        { value: 6, label: '70+' }
      ]
    },
    {
      id: 'family_history',
      question: 'Do you have a family history of breast or ovarian cancer?',
      type: 'select',
      options: [
        { value: 1, label: 'No family history' },
        { value: 2, label: 'One relative with breast cancer' },
        { value: 3, label: 'Multiple relatives with breast cancer' },
        { value: 4, label: 'Family history of ovarian cancer' },
        { value: 5, label: 'Both breast and ovarian cancer in family' }
      ]
    },
    {
      id: 'personal_history',
      question: 'Have you had any previous breast problems?',
      type: 'select',
      options: [
        { value: 1, label: 'No previous problems' },
        { value: 2, label: 'Benign breast lumps' },
        { value: 3, label: 'Atypical hyperplasia' },
        { value: 4, label: 'LCIS (Lobular carcinoma in situ)' },
        { value: 5, label: 'Previous breast cancer' }
      ]
    },
    {
      id: 'menstrual_history',
      question: 'At what age did you start menstruating?',
      type: 'select',
      options: [
        { value: 1, label: '15 or older' },
        { value: 2, label: '13-14' },
        { value: 3, label: '12' },
        { value: 4, label: 'Under 12' }
      ]
    },
    {
      id: 'pregnancy',
      question: 'What is your pregnancy history?',
      type: 'select',
      options: [
        { value: 1, label: 'First pregnancy before age 20' },
        { value: 2, label: 'First pregnancy between 20-24' },
        { value: 3, label: 'First pregnancy between 25-29' },
        { value: 4, label: 'First pregnancy after 30' },
        { value: 5, label: 'Never been pregnant' }
      ]
    },
    {
      id: 'breastfeeding',
      question: 'Have you breastfed?',
      type: 'select',
      options: [
        { value: 1, label: 'Breastfed for more than 12 months' },
        { value: 2, label: 'Breastfed for 6-12 months' },
        { value: 3, label: 'Breastfed for less than 6 months' },
        { value: 4, label: 'Never breastfed' }
      ]
    },
    {
      id: 'hormone_therapy',
      question: 'Have you used hormone replacement therapy?',
      type: 'select',
      options: [
        { value: 1, label: 'Never used' },
        { value: 2, label: 'Used for less than 5 years' },
        { value: 3, label: 'Used for 5-10 years' },
        { value: 4, label: 'Used for more than 10 years' }
      ]
    },
    {
      id: 'lifestyle',
      question: 'How would you describe your lifestyle?',
      type: 'select',
      options: [
        { value: 1, label: 'Very active, healthy diet, no alcohol' },
        { value: 2, label: 'Moderately active, balanced diet' },
        { value: 3, label: 'Sedentary lifestyle, occasional alcohol' },
        { value: 4, label: 'Inactive, poor diet, regular alcohol consumption' }
      ]
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateRisk();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateRisk = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const maxScore = questions.length * 5;
    const riskPercentage = (totalScore / maxScore) * 100;

    let level = '';
    let description = '';
    let recommendations = [];

    if (riskPercentage <= 30) {
      level = 'Low Risk';
      description = 'Your responses suggest a lower risk for breast cancer. Continue with regular screening as recommended by your healthcare provider.';
      recommendations = [
        'Continue regular self-examinations',
        'Follow standard screening guidelines',
        'Maintain a healthy lifestyle',
        'Stay informed about breast health'
      ];
    } else if (riskPercentage <= 60) {
      level = 'Moderate Risk';
      description = 'Your responses suggest a moderate risk for breast cancer. Consider discussing enhanced screening options with your healthcare provider.';
      recommendations = [
        'Discuss earlier or more frequent screening',
        'Consider genetic counseling if family history is present',
        'Maintain regular self-examinations',
        'Focus on lifestyle modifications'
      ];
    } else {
      level = 'Higher Risk';
      description = 'Your responses suggest a higher risk for breast cancer. It is important to discuss comprehensive screening and prevention strategies with your healthcare provider.';
      recommendations = [
        'Consult with a breast specialist',
        'Consider genetic testing',
        'Discuss enhanced screening protocols',
        'Explore risk reduction strategies'
      ];
    }

    setRiskLevel({ level, description, recommendations, percentage: Math.round(riskPercentage) });
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setRiskLevel('');
  };

  if (showResult) {
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
            <h1 className="text-4xl font-bold text-pink-800 mb-4">Your Risk Assessment Results</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex justify-center space-x-8">
              <a href="/" className="text-pink-600 hover:text-pink-800 font-medium">Home</a>
              <a href="/about" className="text-pink-600 hover:text-pink-800 font-medium">About</a>
              <a href="/prediction" className="text-pink-600 hover:text-pink-800 font-medium border-b-2 border-pink-600">Prediction</a>
              <a href="/image-analysis" className="text-pink-600 hover:text-pink-800 font-medium">Image Analysis</a>
            </div>
          </div>
        </nav>

        {/* Results */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className={`inline-block px-6 py-3 rounded-full text-white font-bold text-xl mb-4 ${
                riskLevel.level === 'Low Risk' ? 'bg-green-500' :
                riskLevel.level === 'Moderate Risk' ? 'bg-yellow-500' : 'bg-red-500'
              }`}>
                {riskLevel.level}
              </div>
              <p className="text-lg text-gray-700 mb-4">{riskLevel.description}</p>
              <div className="text-3xl font-bold text-pink-800">
                Risk Score: {riskLevel.percentage}%
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-pink-800 mb-4">Recommendations:</h3>
              <ul className="space-y-2">
                {riskLevel.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-pink-600 mr-2">•</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Important:</strong> This assessment is for educational purposes only and should not replace professional medical advice. 
                    Please consult with your healthcare provider for personalized recommendations.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={resetQuiz}
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-semibold mr-4"
              >
                Take Assessment Again
              </button>
              <a 
                href="/image-analysis"
                className="bg-white hover:bg-pink-50 text-pink-600 border-2 border-pink-600 px-8 py-3 rounded-lg font-semibold"
              >
                Try Image Analysis
              </a>
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

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

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
          <h1 className="text-4xl font-bold text-pink-800 mb-4">Breast Cancer Risk Assessment</h1>
          <p className="text-lg text-pink-700">
            Answer these questions to assess your breast cancer risk level
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-center space-x-8">
            <a href="/" className="text-pink-600 hover:text-pink-800 font-medium">Home</a>
            <a href="/about" className="text-pink-600 hover:text-pink-800 font-medium">About</a>
            <a href="/prediction" className="text-pink-600 hover:text-pink-800 font-medium border-b-2 border-pink-600">Prediction</a>
            <a href="/image-analysis" className="text-pink-600 hover:text-pink-800 font-medium">Image Analysis</a>
          </div>
        </div>
      </nav>

      {/* Quiz Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-pink-800 mb-6">{currentQ.question}</h2>
            <div className="space-y-3">
              {currentQ.options.map((option) => (
                <label 
                  key={option.value}
                  className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-pink-300 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name={currentQ.id}
                    value={option.value}
                    checked={answers[currentQ.id] === option.value}
                    onChange={() => handleAnswer(currentQ.id, option.value)}
                    className="mr-3 text-pink-600"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-700 px-6 py-3 rounded-lg font-semibold"
            >
              Previous
            </button>
            <button
              onClick={nextQuestion}
              disabled={!answers[currentQ.id]}
              className="bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold"
            >
              {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
            </button>
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