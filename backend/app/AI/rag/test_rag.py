import requests

url = "http://localhost:11434/api/generate"
payload = {
    "model": "codellama",
    "prompt": "Say hello and tell me if you are working!",
    "stream": False
}

print("Sending request to Ollama...")
try:
    response = requests.post(url, json=payload, timeout=120)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json().get('response', 'No response text')}")
except Exception as e:
    print(f"Error: {e}")