import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.warn('⚠️ VITE_OPENAI_API_KEY is missing. AI features will use fallback responses.');
}

const openai = new OpenAI({
  apiKey: apiKey || 'dummy_key_to_prevent_initialization_error',
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    'OpenAI-Beta': 'assistants=v1'
  }
});

export const analyzeImage = async (imageBase64: string, analysisType: 'disease' | 'soil' | 'pest' = 'disease') => {
  try {
    const prompt = getAnalysisPrompt(analysisType);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
    });

    return response.choices[0]?.message?.content || "Analysis failed";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return "Error analyzing image. Please check your API key.";
  }
};

export const chatWithAI = async (message: string, context: string = 'general') => {
  try {
    const systemPrompt = getSystemPrompt(context);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || "Sorry, I couldn't process your request.";
  } catch (error) {
    console.error('OpenAI Chat Error:', error);

    // Fallback responses for demo
    const fallbackResponses = {
      'hi': 'Hello! I am AgriSphere AI. How can I help you with farming today? / नमस्ते! मैं AgriSphere AI हूं। आज मैं आपकी खेती में कैसे मदद कर सकता हूं?',
      'hello': 'Hello! I am your agricultural assistant. Ask me about crops, diseases, or farming techniques.',
      'disease': 'For disease detection, please upload an image of your crop. I can identify diseases and suggest treatments.',
      'weather': 'Weather conditions are important for farming. I can help you plan based on weather forecasts.',
      'default': 'I am AgriSphere AI, your farming assistant. I can help with crop diseases, weather advice, and farming techniques. / मैं AgriSphere AI हूं, आपका कृषि सहायक। मैं फसल रोग, मौसम सलाह और खेती तकनीकों में मदद कर सकता हूं।'
    };

    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
      return fallbackResponses.hi;
    } else if (lowerMessage.includes('disease') || lowerMessage.includes('रोग')) {
      return fallbackResponses.disease;
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('मौसम')) {
      return fallbackResponses.weather;
    } else {
      return fallbackResponses.default;
    }
  }
};

export const translateToHindi = async (text: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a translator. Translate the given agricultural advice to Hindi. Keep technical terms in both Hindi and English for clarity."
        },
        { role: "user", content: `Translate this to Hindi: ${text}` }
      ],
      max_tokens: 200,
    });

    return response.choices[0]?.message?.content || text;
  } catch (error) {
    console.error('Translation Error:', error);

    // Simple fallback translations
    const translations: { [key: string]: string } = {
      'Hello! I am AgriSphere AI. How can I help you with farming today?': 'नमस्ते! मैं AgriSphere AI हूं। आज मैं आपकी खेती में कैसे मदद कर सकता हूं?',
      'I am your agricultural assistant.': 'मैं आपका कृषि सहायक हूं।',
      'For disease detection, please upload an image': 'रोग की पहचान के लिए, कृपया अपनी फसल की तस्वीर अपलोड करें',
      'Weather conditions are important for farming': 'मौसम की स्थिति खेती के लिए महत्वपूर्ण है'
    };

    return translations[text] || text;
  }
};

const getAnalysisPrompt = (type: string) => {
  switch (type) {
    case 'disease':
      return `Analyze this crop image for diseases, pests, and health issues. Provide:
1. Disease/pest identification
2. Severity level (1-10)
3. Treatment recommendations
4. Prevention tips
Format as JSON with fields: disease, severity, treatment, prevention`;

    case 'soil':
      return `Analyze this soil image for texture, health, and nutrient indicators. Provide:
1. Soil type assessment
2. Health indicators
3. Nutrient recommendations
4. Improvement suggestions
Format as JSON with fields: soilType, health, nutrients, improvements`;

    case 'pest':
      return `Identify pests in this crop image. Provide:
1. Pest identification
2. Damage assessment
3. Treatment methods
4. Organic alternatives
Format as JSON with fields: pest, damage, treatment, organic`;

    default:
      return "Analyze this agricultural image and provide detailed insights.";
  }
};

const getSystemPrompt = (context: string) => {
  const basePrompt = `You are AgriSphere AI, an expert agricultural assistant helping Indian farmers. 
Provide practical, actionable advice in simple language. Include costs in Indian Rupees when relevant.`;

  switch (context) {
    case 'disease':
      return `${basePrompt} Focus on crop disease diagnosis, treatment, and prevention.`;
    case 'weather':
      return `${basePrompt} Provide weather-related farming advice and risk management.`;
    case 'market':
      return `${basePrompt} Help with market prices, selling strategies, and crop planning.`;
    case 'general':
    default:
      return `${basePrompt} Answer any farming-related questions with expertise.`;
  }
};

export default openai;