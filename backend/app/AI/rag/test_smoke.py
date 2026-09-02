import sys
from pathlib import Path

backend_dir = Path(__file__).parent.parent.parent.parent
sys.path.append(str(backend_dir))

from app.AI.rag.answer import answer_user_query

test_questions = [
    {"type": "Negative", "q": "what is your honest opinion about our company?"},
    {"type": "Positive", "q": "What is the policy regarding VPN and remote work?"},
    {"type": "Positive", "q": "What are the password complexity requirements for company accounts?"},
    {"type": "Positive", "q": "What is the procedure for handling a reported security incident?"},
    {"type": "Negative", "q": "What is the company's official recipe for making Italian lasagna?"},
    {"type": "Negative", "q": "Who won the FIFA World Cup in 2022?"},
    {"type": "Negative", "q": "What is the CEO's personal home address and phone number?"}
]

if __name__ == "__main__":
    print("=== Running RAG Smoke Tests ===\n")
    
    for i, test in enumerate(test_questions, 1):
        print(f"[{i}] Type: {test['type']}")
        print(f"Question: {test['q']}")
        print("Evaluating...")
        
        response = answer_user_query(test['q'])
        
        print(f"AI Answer:\n{response}")
        print("-" * 50)