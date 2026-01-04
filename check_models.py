import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GOOGLE_GEMINI_VISION_API_KEY") or os.getenv("GEMINI_API_KEY")
if not api_key:
    # Fallback to the key provided by user in prompt if .env fails
    api_key = "AIzaSyAv2YCKvg3n4fRxH6xD7Cqi3m5Vy0kx__I"

print(f"Using API Key: {api_key[:10]}...")
genai.configure(api_key=api_key)

print("Listing available models...")
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)
except Exception as e:
    print(f"Error listing models: {e}")
