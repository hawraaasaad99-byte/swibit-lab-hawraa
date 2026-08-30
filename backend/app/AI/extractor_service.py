import json
from pathlib import Path
from pydantic import BaseModel, Field
from typing import Optional, Literal
import ollama

class TaskExtraction(BaseModel):
    requester_name: Optional[str] = Field(None, description="Name of the requester or null")
    request_type: Literal["new_task", "update", "question"] = Field(..., description="Type of the request")
    urgency: Literal["low", "medium", "high"] = Field(..., description="Urgency level")
    task_title_guess: Optional[str] = Field(None, description="Short guessed title for the task")

def load_prompt() -> str:
    prompt_path = Path(__file__).parent / "prompts" / "extractor.md"
    return prompt_path.read_text(encoding="utf-8")

def extract_task_info(message: str) -> dict:
    system_prompt = load_prompt()
    
    response = ollama.chat(
        model='codellama',
        messages=[
            {'role': 'system', 'content': system_prompt},
            {'role': 'user', 'content': message}
        ],
        options={'temperature': 0.1}
    )
    
    content = response['message']['content'].strip()
    
    if content.startswith("```json"):
        content = content[7:]
    if content.endswith("```"):
        content = content[:-3]
    content = content.strip()
    
    parsed_data = json.loads(content)
    validated_data = TaskExtraction(**parsed_data)
    return validated_data.dict()