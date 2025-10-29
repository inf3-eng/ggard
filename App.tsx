import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import AnalysisDisplay from './components/AnalysisDisplay';
import ChatBot from './components/ChatBot';
import { analyzePlantImage, getChatResponse } from './services/geminiService';
import type { PlantAnalysis, ChatMessage } from './types';

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<PlantAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! How can I help you with your garden today?' }
  ]);
  const [isChatThinking, setIsChatThinking] = useState(false);

  const handleApiError = (err: unknown) => {
    console.error(err);
    if (err instanceof Error && err.message.includes('API Key not valid')) {
      return 'The API key configured for this application is invalid. Please contact the site administrator.';
    }
    return 'An unexpected error occurred. Please try again.';
  };

  const handleImageSelect = async (base64: string, mimeType: string) => {
    setUploadedImage(`data:${mimeType};base64,${base64}`);
    setAnalysis(null);
    setError(null);
    setIsLoading(true);
    try {
      const result = await analyzePlantImage(base64, mimeType);
      setAnalysis(result);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    const newHistory: ChatMessage[] = [...chatHistory, { role: 'user', text: message }];
    setChatHistory(newHistory);
    setIsChatThinking(true);
    try {
      const response = await getChatResponse(chatHistory, message);
      setChatHistory([...newHistory, { role: 'model', text: response }]);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setChatHistory([...newHistory, { role: 'model', text: `Sorry, I encountered an error. ${errorMessage}` }]);
    } finally {
      setIsChatThinking(false);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 pb-24">
        <Header />
        <ImageUploader 
          onImageSelect={handleImageSelect}
          isLoading={isLoading}
          uploadedImage={uploadedImage}
        />
        <AnalysisDisplay 
          analysis={analysis}
          isLoading={isLoading}
          error={error}
        />
      </main>
      <ChatBot 
        onSendMessage={handleSendMessage}
        messages={chatHistory}
        isThinking={isChatThinking}
      />
    </div>
  );
}

export default App;
