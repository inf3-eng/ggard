
import React from 'react';
import type { PlantAnalysis } from '../types';

interface AnalysisDisplayProps {
  analysis: PlantAnalysis | null;
  isLoading: boolean;
  error: string | null;
}

const SkeletonLoader: React.FC = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-8 bg-gray-300 rounded-md w-1/2"></div>
    <div className="space-y-4">
      <div className="h-6 bg-gray-300 rounded-md w-1/4"></div>
      <div className="h-4 bg-gray-300 rounded-md w-full"></div>
      <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
    </div>
    <div className="space-y-4">
      <div className="h-6 bg-gray-300 rounded-md w-1/3"></div>
      <div className="h-4 bg-gray-300 rounded-md w-full"></div>
    </div>
    <div className="space-y-4">
      <div className="h-6 bg-gray-300 rounded-md w-1/3"></div>
      <div className="h-4 bg-gray-300 rounded-md w-2/3"></div>
    </div>
  </div>
);

const CareIcon: React.FC<{ type: 'watering' | 'sunlight' | 'soil' }> = ({ type }) => {
    const icons = {
        watering: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V5m0 14v-2.143M4.929 4.929L6.343 6.343m11.314 11.314l-1.414-1.414M4.929 19.071l1.414-1.414M17.657 6.343l-1.414 1.414" /></svg>
        ),
        sunlight: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" /></svg>
        ),
        soil: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M4 17v4m-2-2h4m13-14v4m-2-2h4m-2 12v4m-2-2h4" /></svg>
        ),
    };

    const iconPaths = {
        watering: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.5C8.686 6.5 6 9.186 6 12.5c0 3.866 6 8.5 6 8.5s6-4.634 6-8.5C18 9.186 15.314 6.5 12 6.5z" />,
        sunlight: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />,
        soil: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2z" />,
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {iconPaths[type]}
        </svg>
    )
}


const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
        <SkeletonLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-8 rounded-lg" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8 space-y-8">
      <h2 className="text-3xl font-bold text-center text-green-800">{analysis.plantName}</h2>

      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Care Instructions</h3>
        <div className="space-y-4">
            <div className="flex items-start gap-4">
                <CareIcon type="watering" />
                <div>
                    <h4 className="font-bold">Watering</h4>
                    <p className="text-gray-600">{analysis.careInstructions.watering}</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <CareIcon type="sunlight" />
                <div>
                    <h4 className="font-bold">Sunlight</h4>
                    <p className="text-gray-600">{analysis.careInstructions.sunlight}</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <CareIcon type="soil" />
                <div>
                    <h4 className="font-bold">Soil</h4>
                    <p className="text-gray-600">{analysis.careInstructions.soil}</p>
                </div>
            </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">Current Condition</h3>
        <p className="text-gray-600">{analysis.currentCondition}</p>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-yellow-700 mb-3">Recommended Next Steps</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          {analysis.nextSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
      
       <div className="bg-purple-50 p-6 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-purple-700 mb-1">Estimated Price in Dubai</h3>
        <p className="text-2xl font-bold text-purple-800">{analysis.estimatedPriceAED}</p>
      </div>
    </div>
  );
};

export default AnalysisDisplay;
