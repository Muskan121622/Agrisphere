import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

# 1. Load Environment & Key
original_cwd = os.getcwd()
env_path = os.path.join(original_cwd, '.env')
print(f"DEBUG: Loading .env from {env_path}")
load_dotenv(env_path)

API_KEY = os.getenv("GOOGLE_GEMINI_VISION_API_KEY") or os.getenv("GEMINI_API_KEY")

# Manual fallback if dotenv fails (matching your server logic)
if not API_KEY and os.path.exists(env_path):
    print("DEBUG: Manual .env parsing...")
    try:
        with open(env_path, 'r', encoding='utf-8', errors='ignore') as f:
            for line in f:
                if "GOOGLE_GEMINI_VISION_API_KEY" in line or "GEMINI_API_KEY" in line:
                    parts = line.split('=')
                    if len(parts) > 1:
                        API_KEY = parts[1].strip().strip('"').strip("'")
                        break
    except Exception as e:
        print(f"Error parsing .env: {e}")

if not API_KEY:
    print("CRITICAL: No API Key found.")
    # Fallback from user prompt
    API_KEY = "AIzaSyAv2YCKvg3n4fRxH6xD7Cqi3m5Vy0kx__I"
    print(f"Using fallback key: {API_KEY[:10]}...")

genai.configure(api_key=API_KEY)

# 2. Test Models
models_to_test = ['gemini-1.5-flash', 'gemini-pro', 'gemini-1.5-pro-latest']

print(f"\n--- Testing AI Models with Key: {API_KEY[:10]}... ---")

files_working = False

for model_name in models_to_test:
    print(f"\nTesting Model: {model_name}")
    try:
        model = genai.GenerativeModel(model_name)
        response = model.generate_content("Reply with exactly one word: Working")
        print(f"SUCCESS: {model_name} responded: {response.text}")
        if "Working" in response.text:
            files_working = True
            
            # 3. Test Actual Payload if basic test passes
            print(f"Testing Complex Query with {model_name}...")
            prompt = """
            Return valid JSON only.
            { "mandis": [{"name": "Test Mandi", "price": 100}] }
            """
            json_resp = model.generate_content(prompt)
            print(f"Complex Response: {json_resp.text}")
            
            break # Stop after first success
            
    except Exception as e:
        print(f"FAILED: {model_name} Error: {e}")

if not files_working:
    print("\nALL MODELS FAILED. Please check your API Key quota or permissions.")
else:
    print("\nAt least one model is working!")
