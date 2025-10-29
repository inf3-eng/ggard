
export interface PlantAnalysis {
  plantName: string;
  careInstructions: {
    watering: string;
    sunlight: string;
    soil: string;
  };
  currentCondition: string;
  nextSteps: string[];
  estimatedPriceAED: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
