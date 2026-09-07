
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("LLM_API_KEY", "ollama"),
    base_url=os.getenv(
        "LLM_BASE_URL",
        "http://localhost:11434/v1"
    ),
)

async def call_llm(
    system_prompt: str,
    user_text: str,
    temperature: float = 0.1
) -> str:

    response = client.chat.completions.create(
        model="codellama",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_text}
        ],
        temperature=temperature
    )

    return response.choices[0].message.content