// Mock AI service for demo purposes when OpenAI API is not available

export const mockChatResponses = {
  greetings: [
    'नमस्ते! मैं AgriSphere AI हूं। मैं आपकी खेती में कैसे मदद कर सकता हूं?',
    'Hello! I am AgriSphere AI. How can I help you with farming today?',
    'मैं आपकी कृषि संबंधी समस्याओं का समाधान कर सकता हूं।'
  ],
  
  disease: [
    'फसल में रोग की पहचान के लिए, कृपया पत्ती या पौधे की तस्वीर अपलोड करें। मैं रोग की पहचान करके उपचार सुझाऊंगा।',
    'For disease identification, please upload a clear image of the affected plant part. I can detect diseases with 95% accuracy.',
    'मैं पत्ती, तना, फल और मिट्टी की तस्वीरों का विश्लेषण कर सकता हूं।'
  ],
  
  weather: [
    'मौसम की जानकारी के लिए मैं आपको सिंचाई, बुआई और कटाई का सही समय बता सकता हूं।',
    'I can provide weather-based farming advice including irrigation timing and crop protection.',
    'बारिश, तापमान और आर्द्रता के आधार पर फसल की देखभाल की सलाह दे सकता हूं।'
  ],
  
  fertilizer: [
    'खाद और उर्वरक के लिए: नाइट्रोजन, फास्फोरस, पोटाश की मात्रा मिट्टी परीक्षण के आधार पर तय करें।',
    'For fertilizer recommendations, soil testing is essential. NPK ratio depends on crop type and soil condition.',
    'जैविक खाद का उपयोग करें - गोबर की खाद, कंपोस्ट, वर्मी कंपोस्ट बेहतर विकल्प हैं।'
  ],
  
  irrigation: [
    'सिंचाई के लिए मिट्टी की नमी जांचें। ड्रिप इरिगेशन से 40% पानी की बचत होती है।',
    'Check soil moisture before irrigation. Drip irrigation saves 40% water and increases yield.',
    'फसल की अवस्था के अनुसार पानी दें - फूल आने और दाना भरने के समय अधिक पानी चाहिए।'
  ],
  
  market: [
    'बाजार की कीमत जानने के लिए eNAM पोर्टल देखें। सीधे खरीदारों से संपर्क करके बेहतर दाम मिल सकते हैं।',
    'Check market prices on eNAM portal. Direct selling to buyers can increase income by 30%.',
    'फसल की गुणवत्ता बनाए रखें और सही समय पर बेचें।'
  ],
  
  default: [
    'मैं आपकी कृषि संबंधी किसी भी समस्या में मदद कर सकता हूं। रोग, मौसम, खाद, सिंचाई के बारे में पूछें।',
    'I can help with crop diseases, weather advice, fertilizer recommendations, and market information.',
    'कृषि तकनीक, सरकारी योजनाओं और नई खेती के तरीकों के बारे में भी जानकारी दे सकता हूं।'
  ]
};

export const mockDiseaseAnalysis = {
  wheat_disease: {
    disease: 'Wheat Rust (गेहूं का रतुआ रोग)',
    severity: 7,
    treatment: 'Propiconazole 25% EC @ 1ml/liter पानी में मिलाकर छिड़काव करें। 15 दिन बाद दोहराएं।',
    prevention: 'प्रतिरोधी किस्मों का उपयोग करें। खेत में जल निकासी की व्यवस्था रखें।',
    confidence: 94
  },
  
  tomato_disease: {
    disease: 'Tomato Blight (टमाटर का झुलसा रोग)',
    severity: 6,
    treatment: 'Mancozeb 75% WP @ 2gm/liter या Copper Oxychloride @ 3gm/liter छिड़काव करें।',
    prevention: 'पौधों के बीच उचित दूरी रखें। ड्रिप सिंचाई का उपयोग करें।',
    confidence: 91
  },
  
  cotton_pest: {
    disease: 'Cotton Bollworm (कपास का सुंडी)',
    severity: 8,
    treatment: 'Bt spray या Emamectin Benzoate 5% SG @ 0.5gm/liter छिड़काव करें।',
    prevention: 'Pheromone traps लगाएं। नीम का तेल का छिड़काव करें।',
    confidence: 89
  },
  
  default: {
    disease: 'Nutrient Deficiency (पोषक तत्वों की कमी)',
    severity: 4,
    treatment: 'संतुलित NPK उर्वरक का उपयोग करें। मिट्टी परीक्षण कराएं।',
    prevention: 'नियमित रूप से जैविक खाद का उपयोग करें। फसल चक्र अपनाएं।',
    confidence: 85
  }
};

export const getRandomResponse = (category: keyof typeof mockChatResponses): string => {
  const responses = mockChatResponses[category];
  return responses[Math.floor(Math.random() * responses.length)];
};

export const getMockDiseaseAnalysis = (imageType: string = 'default') => {
  const analysisKey = imageType.toLowerCase().includes('wheat') ? 'wheat_disease' :
                     imageType.toLowerCase().includes('tomato') ? 'tomato_disease' :
                     imageType.toLowerCase().includes('cotton') ? 'cotton_pest' :
                     'default';
  
  return mockDiseaseAnalysis[analysisKey as keyof typeof mockDiseaseAnalysis];
};

export const mockChatWithAI = async (message: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('नमस्ते')) {
    return getRandomResponse('greetings');
  } else if (lowerMessage.includes('disease') || lowerMessage.includes('रोग') || lowerMessage.includes('बीमारी')) {
    return getRandomResponse('disease');
  } else if (lowerMessage.includes('weather') || lowerMessage.includes('मौसम') || lowerMessage.includes('बारिश')) {
    return getRandomResponse('weather');
  } else if (lowerMessage.includes('fertilizer') || lowerMessage.includes('खाद') || lowerMessage.includes('उर्वरक')) {
    return getRandomResponse('fertilizer');
  } else if (lowerMessage.includes('water') || lowerMessage.includes('irrigation') || lowerMessage.includes('पानी') || lowerMessage.includes('सिंचाई')) {
    return getRandomResponse('irrigation');
  } else if (lowerMessage.includes('market') || lowerMessage.includes('price') || lowerMessage.includes('बाजार') || lowerMessage.includes('कीमत')) {
    return getRandomResponse('market');
  } else {
    return getRandomResponse('default');
  }
};