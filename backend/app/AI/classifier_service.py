import json
from pathlib import Path
from pydantic import BaseModel, Field
import ollama

class MessageClassification(BaseModel):
    category: str = Field(..., description="sales, support, billing, complaint, or general")
    priority: str = Field(..., description="low, medium, or high")
    summary: str = Field(..., description="A concise 1-sentence summary in English")
    suggested_action: str = Field(..., description="Recommended action for the support team")

def load_prompt_template() -> str:
    prompt_path = Path(__file__).resolve().parent / "prompts" / "classifier.md"
    return prompt_path.read_text(encoding="utf-8")

def classify_message(user_message: str) -> dict:
    system_prompt = load_prompt_template()
    
    full_prompt = f"""
{system_prompt}

Task: Classify the following user message and respond ONLY with a valid JSON object matching this schema:
{{
    "category": "sales | support | billing | complaint | general",
    "priority": "low | medium | high",
    "summary": "A concise 1-sentence summary in English",
    "suggested_action": "Recommended action"
}}

User Message: "{user_message}"
JSON Response:
"""

    response = ollama.chat(
        model='codellama',
        messages=[
            {'role': 'user', 'content': full_prompt},
        ],
        options={'temperature': 0.1}
    )
    
    raw_content = response['message']['content'].strip()
    
    if "```json" in raw_content:
        raw_content = raw_content.split("```json")[1].split("```")[0].strip()
    elif "```" in raw_content:
        raw_content = raw_content.split("```")[1].split("```")[0].strip()

    try:
        parsed_data = MessageClassification.model_validate_json(raw_content)
        return parsed_data.model_dump()
    except Exception as e:
        raise ValueError(f"Invalid JSON response from codellama: {e}, Raw response: {raw_content}")
