import os
import requests
from app.AI.rag.retrieve import search_policies
import ollama
from app.AI.client import call_llm


async def answer_user_query(user_query: str):

    docs = search_policies(user_query, k=3)

    context = "\n\n".join(
        [doc.page_content for doc in docs]
    )

    prompt = f"""Use the following context to answer the user's question accurately.
If you don't know the answer based on the context, say that you don't know.

Context:
{context}

Question:
{user_query}

Answer:"""

    return await call_llm(
        system_prompt="You are an AI assistant for a company.",
        user_text=prompt,
        temperature=0.1
    )