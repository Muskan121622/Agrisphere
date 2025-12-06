#!/usr/bin/env python3
"""
Improved Voice Assistant for Agricultural Questions
Provides accurate answers in Hindi and English
"""

import json
import re
from datetime import datetime
import random

class AgriVoiceAssistant:
    def __init__(self):
        self.knowledge_base = self.load_agricultural_knowledge()
        
    def load_agricultural_knowledge(self):
        """Load comprehensive agricultural knowledge base"""
        return {
            # Crop Diseases
            "diseases": {
                "wheat_rust": {
                    "hindi": "गेहूं में रतुआ रोग",
                    "symptoms": ["पत्तियों पर नारंगी-लाल धब्बे", "पत्तियां पीली होना"],
                    "treatment": "प्रोपिकोनाजोल या टेबुकोनाजोल का छिड़काव करें",
                    "prevention": "प्रतिरोधी किस्मों का उपयोग करें"
                },
                "tomato_blight": {
                    "hindi": "टमाटर में झुलसा रोग", 
                    "symptoms": ["पत्तियों पर भूरे धब्बे", "फलों पर काले धब्बे"],
                    "treatment": "कॉपर सल्फेट या मैंकोजेब का छिड़काव करें",
                    "prevention": "उचित दूरी पर रोपाई करें"
                },
                "rice_blast": {
                    "hindi": "धान में ब्लास्ट रोग",
                    "symptoms": ["पत्तियों पर आंख के आकार के धब्बे", "बालियों का सूखना"],
                    "treatment": "ट्राइसाइक्लाजोल का छिड़काव करें",
                    "prevention": "संतुलित उर्वरक का प्रयोग करें"
                }
            },
            
            # Fertilizers and Nutrients
            "fertilizers": {
                "nitrogen_deficiency": {
                    "hindi": "नाइट्रोजन की कमी",
                    "symptoms": ["पुरानी पत्तियां पीली", "धीमी वृद्धि"],
                    "treatment": "यूरिया 2 किलो प्रति एकड़ डालें",
                    "timing": "बुआई के 20-25 दिन बाद"
                },
                "phosphorus_deficiency": {
                    "hindi": "फास्फोरस की कमी", 
                    "symptoms": ["पत्तियों का बैंगनी रंग", "जड़ों का कम विकास"],
                    "treatment": "डीएपी 1 बोरी प्रति एकड़ डालें",
                    "timing": "बुआई के समय"
                },
                "potassium_deficiency": {
                    "hindi": "पोटाश की कमी",
                    "symptoms": ["पत्तियों के किनारे जलना", "फलों का कम विकास"],
                    "treatment": "म्यूरेट ऑफ पोटाश 50 किलो प्रति एकड़",
                    "timing": "फूल आने के समय"
                }
            },
            
            # Irrigation and Water Management
            "irrigation": {
                "wheat": {
                    "hindi": "गेहूं की सिंचाई",
                    "frequency": "15-20 दिन के अंतराल पर",
                    "critical_stages": ["बुआई के बाद", "फूल आने पर", "दाना भरने पर"],
                    "water_amount": "5-6 सेमी पानी प्रति सिंचाई"
                },
                "rice": {
                    "hindi": "धान की सिंचाई",
                    "frequency": "खेत में हमेशा 2-3 सेमी पानी रखें",
                    "critical_stages": ["रोपाई के बाद", "कल्ले निकलने पर", "बाली आने पर"],
                    "water_amount": "150-200 सेमी पानी पूरे सीजन में"
                }
            },
            
            # Pest Management
            "pests": {
                "aphids": {
                    "hindi": "माहू कीट",
                    "identification": "छोटे हरे या काले कीड़े पत्तियों पर",
                    "treatment": "इमिडाक्लोप्रिड का छिड़काव करें",
                    "organic": "नीम का तेल या साबुन का घोल"
                },
                "bollworm": {
                    "hindi": "सुंडी कीट",
                    "identification": "फलों और फूलों को खाने वाली सुंडी",
                    "treatment": "बीटी या स्पिनोसैड का छिड़काव",
                    "prevention": "फेरोमोन ट्रैप लगाएं"
                }
            },
            
            # Weather and Timing
            "weather_advice": {
                "monsoon": {
                    "hindi": "बारिश के मौसम की सलाह",
                    "crops": "धान, मक्का, कपास की बुआई का समय",
                    "precautions": "जल निकासी की व्यवस्था करें"
                },
                "winter": {
                    "hindi": "सर्दी के मौसम की सलाह", 
                    "crops": "गेहूं, जौ, चना की बुआई",
                    "precautions": "पाला से बचाव करें"
                }
            }
        }
    
    def process_voice_input(self, text):
        """Process voice input and generate appropriate response"""
        text = text.lower().strip()
        
        # Detect language (simple heuristic)
        is_hindi = any(char in text for char in 'कखगघचछजझटठडढणतथदधनपफबभमयरलवशषसह')
        
        # Clean and normalize text
        text = self.normalize_text(text)
        
        # Identify query type and generate response
        response = self.generate_response(text, is_hindi)
        
        return response
    
    def normalize_text(self, text):
        """Normalize text for better matching"""
        # Remove punctuation and extra spaces
        text = re.sub(r'[^\w\s]', ' ', text)
        text = re.sub(r'\s+', ' ', text).strip()
        return text
    
    def generate_response(self, text, is_hindi=False):
        """Generate appropriate agricultural response"""
        
        # Crop information queries (check first)
        if any(word in text for word in ['kharif', 'rabi', 'खरीफ', 'रबी']) or (any(word in text for word in ['crops', 'fasal', 'फसल']) and any(word in text for word in ['kaun', 'kya', 'which', 'what'])):
            return self.handle_crop_info_query(text, is_hindi)
        
        # Disease-related queries
        elif any(word in text for word in ['rog', 'रोग', 'disease', 'bimari', 'बीमारी', 'गया', 'आ', 'करें', 'kya', 'kare']):
            return self.handle_disease_query(text, is_hindi)
        
        # Fertilizer-related queries  
        elif any(word in text for word in ['khad', 'खाद', 'fertilizer', 'urvarak', 'उर्वरक']):
            return self.handle_fertilizer_query(text, is_hindi)
        
        # Irrigation queries
        elif any(word in text for word in ['pani', 'पानी', 'water', 'sinchai', 'सिंचाई']):
            return self.handle_irrigation_query(text, is_hindi)
        
        # Pest queries
        elif any(word in text for word in ['keet', 'कीट', 'pest', 'sundi', 'सुंडी']):
            return self.handle_pest_query(text, is_hindi)
        
        # Harvest timing
        elif any(word in text for word in ['kaat', 'काट', 'harvest']):
            return self.handle_harvest_query(text, is_hindi)
        
        # Weather queries
        elif any(word in text for word in ['mausam', 'मौसम', 'weather', 'barish', 'बारिश']):
            return self.handle_weather_query(text, is_hindi)
        
        # General farming advice
        else:
            return self.handle_general_query(text, is_hindi)
    
    def handle_disease_query(self, text, is_hindi):
        """Handle disease-related queries"""
        
        # Detect crop type
        crop = self.detect_crop(text)
        
        if 'wheat' in text or 'gehun' in text or 'गेहूं' in text:
            disease_info = self.knowledge_base['diseases']['wheat_rust']
            if is_hindi:
                return {
                    'text': f"गेहूं में रतुआ रोग हो सकता है। उपचार: {disease_info['treatment']}। बचाव: {disease_info['prevention']}।",
                    'audio_text': f"गेहूं में रतुआ रोग है। प्रोपिकोनाजोल का छिड़काव करें।",
                    'solution': disease_info['treatment'],
                    'prevention': disease_info['prevention']
                }
            else:
                return {
                    'text': f"Wheat rust disease detected. Treatment: Apply propiconazole fungicide spray.",
                    'audio_text': "Wheat rust disease detected. Apply fungicide spray.",
                    'solution': "Apply propiconazole or tebuconazole spray",
                    'prevention': "Use resistant varieties"
                }
        
        elif 'tomato' in text or 'tamatar' in text or 'टमाटर' in text:
            disease_info = self.knowledge_base['diseases']['tomato_blight']
            if is_hindi:
                return {
                    'text': f"{disease_info['hindi']} हो सकता है। उपचार: {disease_info['treatment']}",
                    'audio_text': f"टमाटर में झुलसा रोग है। कॉपर सल्फेट का छिड़काव करें।",
                    'solution': disease_info['treatment'],
                    'prevention': disease_info['prevention']
                }
        
        # Generic disease response
        if is_hindi:
            return {
                'text': "फसल में रोग के लक्षण दिख रहे हैं। कृपया नजदीकी कृषि विशेषज्ञ से संपर्क करें।",
                'audio_text': "फसल में रोग है। कृषि विशेषज्ञ से सलाह लें।",
                'solution': "विशेषज्ञ से सलाह लें",
                'prevention': "नियमित निरीक्षण करें"
            }
        else:
            return {
                'text': "Disease symptoms detected in crop. Please consult agricultural expert.",
                'audio_text': "Disease detected. Consult agricultural expert.",
                'solution': "Consult expert for proper diagnosis",
                'prevention': "Regular crop monitoring"
            }
    
    def handle_fertilizer_query(self, text, is_hindi):
        """Handle fertilizer-related queries"""
        
        if any(word in text for word in ['yellow', 'peela', 'पीला', 'nitrogen']):
            fert_info = self.knowledge_base['fertilizers']['nitrogen_deficiency']
            if is_hindi:
                return {
                    'text': f"{fert_info['hindi']} हो सकती है। उपचार: {fert_info['treatment']}",
                    'audio_text': "नाइट्रोजन की कमी है। यूरिया डालें।",
                    'solution': fert_info['treatment'],
                    'timing': fert_info['timing']
                }
        
        # Generic fertilizer advice
        if is_hindi:
            return {
                'text': "मिट्टी की जांच कराकर संतुलित उर्वरक का प्रयोग करें। NPK 19:19:19 का छिड़काव करें।",
                'audio_text': "संतुलित उर्वरक का प्रयोग करें।",
                'solution': "NPK 19:19:19 @ 2kg per acre",
                'timing': "As per crop stage"
            }
        else:
            return {
                'text': "Apply balanced fertilizer based on soil test. Use NPK 19:19:19.",
                'audio_text': "Apply balanced fertilizer.",
                'solution': "NPK 19:19:19 @ 2kg per acre",
                'timing': "As per crop growth stage"
            }
    
    def handle_irrigation_query(self, text, is_hindi):
        """Handle irrigation queries"""
        
        crop = self.detect_crop(text)
        
        if crop == 'wheat':
            irr_info = self.knowledge_base['irrigation']['wheat']
            if is_hindi:
                return {
                    'text': f"{irr_info['hindi']}: {irr_info['frequency']} सिंचाई करें।",
                    'audio_text': "गेहूं में 15-20 दिन के अंतराल पर सिंचाई करें।",
                    'solution': f"Frequency: {irr_info['frequency']}",
                    'amount': irr_info['water_amount']
                }
        
        # Generic irrigation advice
        if is_hindi:
            return {
                'text': "मिट्टी की नमी देखकर सिंचाई करें। सुबह या शाम के समय पानी दें।",
                'audio_text': "मिट्टी की नमी देखकर पानी दें।",
                'solution': "Check soil moisture before irrigation",
                'timing': "Early morning or evening"
            }
        else:
            return {
                'text': "Check soil moisture before irrigation. Water in morning or evening.",
                'audio_text': "Check soil moisture before watering.",
                'solution': "Monitor soil moisture levels",
                'timing': "Early morning or evening hours"
            }
    
    def handle_pest_query(self, text, is_hindi):
        """Handle pest-related queries"""
        
        if is_hindi:
            return {
                'text': "कीट प्रकोप के लिए नीम का तेल या इमिडाक्लोप्रिड का छिड़काव करें।",
                'audio_text': "कीट के लिए नीम का तेल छिड़कें।",
                'solution': "Neem oil or Imidacloprid spray",
                'organic': "Neem oil + soap solution"
            }
        else:
            return {
                'text': "For pest control, use neem oil or imidacloprid spray.",
                'audio_text': "Use neem oil for pest control.",
                'solution': "Neem oil or chemical pesticide",
                'organic': "Organic neem oil treatment"
            }
    
    def handle_harvest_query(self, text, is_hindi):
        """Handle harvest timing queries"""
        
        crop = self.detect_crop(text)
        
        if is_hindi:
            if crop == 'wheat':
                return {
                    'text': "गेहूं की कटाई मार्च-अप्रैल में करें जब दाने सुनहरे हो जाएं।",
                    'audio_text': "गेहूं की कटाई मार्च-अप्रैल में करें।",
                    'solution': "Harvest when grains turn golden",
                    'timing': "March-April"
                }
            else:
                return {
                    'text': "फसल की कटाई तब करें जब दाने पूरी तरह पक जाएं।",
                    'audio_text': "दाने पकने पर कटाई करें।",
                    'solution': "Harvest when fully mature",
                    'timing': "Check grain maturity"
                }
        else:
            return {
                'text': "Harvest when crop reaches full maturity. Check grain moisture content.",
                'audio_text': "Harvest when crop is fully mature.",
                'solution': "Check maturity indicators",
                'timing': "Based on crop variety"
            }
    
    def handle_weather_query(self, text, is_hindi):
        """Handle weather-related queries"""
        
        if is_hindi:
            return {
                'text': "मौसम के अनुसार फसल की देखभाल करें। बारिश से पहले जल निकासी की व्यवस्था करें।",
                'audio_text': "मौसम के अनुसार फसल की देखभाल करें।",
                'solution': "Weather-based crop management",
                'precaution': "Arrange proper drainage"
            }
        else:
            return {
                'text': "Follow weather-based crop management. Ensure proper drainage before rains.",
                'audio_text': "Follow weather-based farming practices.",
                'solution': "Monitor weather forecasts",
                'precaution': "Prepare for weather changes"
            }
    
    def handle_crop_info_query(self, text, is_hindi):
        """Handle crop information queries"""
        
        if 'kharif' in text or 'खरीफ' in text:
            if is_hindi:
                return {
                    'text': "खरीफ फसलें बारिश के मौसम में उगाई जाती हैं। मुख्य खरीफ फसलें: धान, मक्का, कपास, गन्ना, ज्वार, बाजरा, अरहर, मूंग, उड़द। ये जून-जुलाई में बोई जाती हैं और अक्टूबर-नवंबर में काटी जाती हैं।",
                    'audio_text': "खरीफ फसलें धान, मक्का, कपास, गन्ना हैं। बारिश के मौसम में उगाई जाती हैं।",
                    'solution': "Kharif crops: Rice, Maize, Cotton, Sugarcane",
                    'timing': "Sowing: June-July, Harvesting: October-November"
                }
            else:
                return {
                    'text': "Kharif crops are grown during monsoon season. Main Kharif crops: Rice, Maize, Cotton, Sugarcane, Sorghum, Pearl millet, Pigeon pea, Green gram, Black gram. Sown in June-July and harvested in October-November.",
                    'audio_text': "Kharif crops include rice, maize, cotton, and sugarcane grown during monsoon.",
                    'solution': "Monsoon season crops",
                    'timing': "Sowing: June-July, Harvesting: October-November"
                }
        
        elif 'rabi' in text or 'रबी' in text:
            if is_hindi:
                return {
                    'text': "रबी फसलें सर्दी के मौसम में उगाई जाती हैं। मुख्य रबी फसलें: गेहूं, जौ, चना, मटर, सरसों, आलू, प्याज। ये अक्टूबर-दिसंबर मे��� बोई जाती हैं और मार्च-मई में काटी जाती हैं।",
                    'audio_text': "रबी फसलें गेहूं, जौ, चना, सरसों हैं। सर्दी में उगाई जाती हैं।",
                    'solution': "Rabi crops: Wheat, Barley, Gram, Mustard",
                    'timing': "Sowing: October-December, Harvesting: March-May"
                }
        
        # Generic crop info
        if is_hindi:
            return {
                'text': "फसलों के बारे में पूछें - खरीफ, रबी, या कोई विशेष फसल।",
                'audio_text': "फसलों के बारे में विस्तार से पूछें।",
                'solution': "Ask about specific crops",
                'examples': ["खरीफ फसलें", "रबी फसलें", "धान की खेती"]
            }
        else:
            return {
                'text': "Ask about crops - Kharif, Rabi, or specific crop cultivation.",
                'audio_text': "Ask about specific crop information.",
                'solution': "Crop-specific queries",
                'examples': ["Kharif crops", "Rabi crops", "Rice cultivation"]
            }
    
    def handle_general_query(self, text, is_hindi):
        """Handle general farming queries"""
        
        if is_hindi:
            return {
                'text': "मैं AgriSphere AI हूं, आपका कृषि सहायक। मैं फसल रोग, मौसम सलाह और खेती तकनीकों में मदद कर सकता हूं।",
                'audio_text': "मैं आपका कृषि सहायक हूं। कृषि संबंधी प्रश्न पूछें।",
                'solution': "Ask specific agricultural questions",
                'examples': ["फसल में रोग", "खाद की मात्रा", "सिंचाई का समय"]
            }
        else:
            return {
                'text': "I am AgriSphere AI, your farming assistant. I can help with crop diseases, weather advice, and farming techniques.",
                'audio_text': "I am your agricultural assistant. Ask farming questions.",
                'solution': "Ask specific agricultural questions",
                'examples': ["Crop diseases", "Fertilizer advice", "Irrigation timing"]
            }
    
    def detect_crop(self, text):
        """Detect crop type from text"""
        crop_keywords = {
            'wheat': ['wheat', 'gehun', 'गेहूं'],
            'rice': ['rice', 'dhan', 'धान', 'chawal', 'चावल'],
            'tomato': ['tomato', 'tamatar', 'टमाटर'],
            'potato': ['potato', 'aloo', 'आलू'],
            'cotton': ['cotton', 'kapas', 'कपास'],
            'sugarcane': ['sugarcane', 'ganna', 'गन्ना']
        }
        
        for crop, keywords in crop_keywords.items():
            if any(keyword in text for keyword in keywords):
                return crop
        
        return 'general'

# Example usage and testing
def test_voice_assistant():
    """Test the voice assistant with sample queries"""
    assistant = AgriVoiceAssistant()
    
    test_queries = [
        "गेहूं में रोग आ गया है, क्या करें?",
        "Wheat has disease, what to do?",
        "आज पानी देना चाहिए?",
        "Should I water today?",
        "फसल कब काटनी चाहिए?",
        "When should I harvest?",
        "खाद कितनी डालनी चाहिए?",
        "How much fertilizer to apply?"
    ]
    
    print("AgriSphere AI Voice Assistant Test")
    print("=" * 50)
    
    for query in test_queries:
        print(f"\nQuery: {query}")
        response = assistant.process_voice_input(query)
        print(f"Response: {response['text']}")
        print(f"Audio: {response['audio_text']}")
        if 'solution' in response:
            print(f"Solution: {response['solution']}")

if __name__ == "__main__":
    test_voice_assistant()