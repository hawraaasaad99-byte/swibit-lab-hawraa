import os
import requests
from app.AI.rag.retrieve import search_policies

def answer_user_query(user_query: str):
    docs = search_policies(user_query, k=3)
    context = "\n\n".join([doc.page_content for doc in docs])

    prompt = f"""You are an AI assistant for a company. Use the following context to answer the user's question accurately.
If you don't know the answer based on the context, say that you don't know.

Context:
{context}

Question: {user_query}

Answer:"""

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "codellama",
            "prompt": prompt,
            "stream": False
        },
        timeout=120
    )
    
    if response.status_code == 200:
        return response.json().get("response", "")
    else:
        raise Exception(f"Ollama error: {response.text}")