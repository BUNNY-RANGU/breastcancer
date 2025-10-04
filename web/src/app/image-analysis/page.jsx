'use client';
import { useState, useCallback } from 'react';
import useUpload from '@/utils/useUpload';

export default function ImageAnalysisPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [upload, { loading: uploadLoading }] = useUpload();

  const handleFileSelect = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setAnalysis(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const analyzeImage = useCallback(async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      setError(null);

      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target.result;

        try {
          const response = await fetch('/integrations/gpt-vision/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messages: [
                {
                  role: 'user',
                  content: [
                    {
                      type: 'text',
                      text: `You are a medical AI assistant specializing in breast cancer analysis. Please analyze this medical image for signs of hemorrhagic intracranial metastases from breast cancer. 

                      Please provide:
                      1. A detailed description of what you observe in the image
                      2. Any potential signs of hemorrhagic intracranial metastases
                      3. Risk assessment (Low, Moderate, High)
                      4. Possible causes and contributing factors
                      5. Recommended next steps for medical evaluation
                      
                      Important: This is for educational purposes only and should not replace professional medical diagnosis.`
                    },
                    {
                      type: 'image_url',
                      image_url: {
                        url: base64Image
                      }
                    }
                  ]
                }
              ]
            })
          });

          if (!response.ok) {
            throw new Error(`Analysis failed: ${response.status} ${response.statusText}`);
          }

          const result = await response.json();
          const analysisText = result.choices[0].message.content;
          
          // Parse the analysis into structured format
          const sections = analysisText.split('\n\n');
          setAnalysis({
            fullText: analysisText,
            sections: sections
          });

        } catch (analysisError) {
          console.error('Analysis error:', analysisError);
          setError('Failed to analyze the image. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      reader.readAsDataURL(selectedFile);
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred during analysis.');
      setLoading(false);
    }
  }, [selectedFile]);

  const resetAnalysis = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setAnalysis(null);
    setError(null);
  };

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
          <h1 className="text-4xl font-bold text-pink-800 mb-4">AI Image Analysis</h1>
          <p className="text-lg text-pink-700">
            Upload medical images for AI-powered analysis of hemorrhagic intracranial metastases
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-center space-x-8">
            <a href="/" className="text-pink-600 hover:text-pink-800 font-medium">Home</a>
            <a href="/about" className="text-pink-600 hover:text-pink-800 font-medium">About</a>
            <a href="/prediction" className="text-pink-600 hover:text-pink-800 font-medium">Prediction</a>
            <a href="/image-analysis" className="text-pink-600 hover:text-pink-800 font-medium border-b-2 border-pink-600">Image Analysis</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Information Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-pink-800 mb-4">About Hemorrhagic Intracranial Metastases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-pink-700 mb-3">What are they?</h3>
              <p className="text-gray-600 mb-4">
                Hemorrhagic intracranial metastases are brain tumors that have spread from breast cancer 
                and are characterized by bleeding within the tumor. These metastases can cause serious 
                neurological symptoms and require immediate medical attention.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-pink-700 mb-3">Common Causes</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Advanced breast cancer spread</li>
                <li>• Tumor blood vessel rupture</li>
                <li>• Anticoagulation therapy</li>
                <li>• Tumor necrosis</li>
                <li>• Rapid tumor growth</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-pink-800 mb-6">Upload Medical Image</h2>
          
          {!imagePreview ? (
            <div className="border-2 border-dashed border-pink-300 rounded-lg p-12 text-center">
              <div className="text-pink-600 text-6xl mb-4">📁</div>
              <h3 className="text-xl font-semibold text-pink-800 mb-2">Choose Medical Image</h3>
              <p className="text-gray-600 mb-6">
                Upload CT, MRI, or other medical images for AI analysis
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer inline-block"
              >
                Select Image
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supported formats: PNG, JPEG, WEBP, GIF
              </p>
            </div>
          ) : (
            <div>
              {/* Image Preview */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-pink-800 mb-3">Selected Image:</h3>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <img 
                    src={imagePreview} 
                    alt="Selected medical image" 
                    className="max-w-full h-auto max-h-96 mx-auto rounded"
                  />
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    {selectedFile?.name}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center mb-6">
                <button
                  onClick={analyzeImage}
                  disabled={loading || uploadLoading}
                  className="bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 text-white px-8 py-3 rounded-lg font-semibold"
                >
                  {loading ? 'Analyzing...' : 'Analyze Image'}
                </button>
                <button
                  onClick={resetAnalysis}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold"
                >
                  Upload New Image
                </button>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Analysis Results */}
              {analysis && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">AI Analysis Results</h3>
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {analysis.fullText}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Important Disclaimer */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Medical Disclaimer:</strong> This AI analysis is for educational and research purposes only. 
                  It should not be used as a substitute for professional medical diagnosis, treatment, or advice. 
                  Always consult with qualified healthcare professionals for medical decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-pink-800 mb-6">Understanding the Analysis</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-pink-700 mb-3">What the AI looks for:</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Hyperdense lesions indicating bleeding</li>
                <li>• Mass effect and brain tissue displacement</li>
                <li>• Edema surrounding the lesion</li>
                <li>• Multiple lesions suggesting metastases</li>
                <li>• Midline shift and increased pressure</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-pink-700 mb-3">Next Steps:</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Consult with a neurologist or oncologist</li>
                <li>• Consider additional imaging studies</li>
                <li>• Discuss treatment options</li>
                <li>• Monitor for neurological symptoms</li>
                <li>• Plan multidisciplinary care approach</li>
              </ul>
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