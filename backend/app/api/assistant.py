from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.AI.classifier_service import classify_message, MessageClassification
from app.AI.rag.answer import answer_user_query
from app.AI.rag.retrieve import search_policies

router = APIRouter()

class AskRequest(BaseModel):
    question: str

class AskResponse(BaseModel):
    answer: str
    citations: List[str]

@router.post("/assistant/classify", response_model=MessageClassification)
async def classify_endpoint(body: dict) -> MessageClassification:
    try:
        user_message = body.get("text", "")
        if not user_message:
            raise HTTPException(status_code=400, detail="Text field is required")
        
        result_dict = classify_message(user_message)
        return MessageClassification(**result_dict)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/assistant/ask", response_model=AskResponse)
def ask_assistant(payload: AskRequest):
    try:
        query = payload.question
        answer = answer_user_query(query)
        docs = search_policies(query)
        citations = []
        for doc in docs:
            source = doc.metadata.get("source", "unknown_policy.md")
            if source not in citations:
                citations.append(source)
                
        return {
            "answer": answer,
            "citations": citations
        }
    except Exception as e:
        print(f"error details:{repr(e)}")
        raise HTTPException(status_code=500, detail=str(e))