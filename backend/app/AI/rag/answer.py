import os
import requests
from app.AI.rag.retrieve import search_policies
import ollama

def answer_user_query(user_query: str):
    docs = search_policies(user_query, k=3)
    context = "\n\n".join([doc.page_content for doc in docs])



    prompt = f"""You are an AI assistant for a company. Use the following context to answer the user's question accurately.
If you don't know the answer based on the context, say that you don't know.


Context:
{context}

Question: {user_query}

Answer:"""
    
   

    response = ollama.chat(
        model = 'codellama',
        messages =[
            {'role':'user','content':prompt}
        ],
        options = {
            'temperature':0.1,
             'num_predict':256
        }
    )   
       
    
    
    return response['message']['content']