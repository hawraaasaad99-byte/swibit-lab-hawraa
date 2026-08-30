from extractor_service import extract_task_info
import sys
from pathlib import Path

backend_dir = Path(__file__).resolve().parent.parent.parent
sys.path.append(str(backend_dir))

test_messages = [
    "Hi team, Ahmed here. Can someone please fix the login bug on the main page ASAP?",
    "Hey, this is Sarah. Quick question: when is our next sprint planning meeting?",
    "Update on the database migration: we finished phase one successfully.",
    "Please create a new task for generating the monthly financial report by Thursday. - hawraa",
    "Is the API documentation updated yet?",
    "Hey, Fatima here. We need to redesign the landing page UI as soon as possible.",
    "Status update regarding the payment gateway integration: currently delayed.",
    "Can anyone help me configure the Docker container for this project?",
    "Hey, do you remember that thing we talked about last Tuesday? Fix it whenever you can, or maybe ask someone else to look at it if they are free, also check the other thing.",
    "URGENT!!!! fix database ASAP @admin #12345 !!! ?????",
]

def run_evaluation():
    print("--- EXTRACTOR EVALUATION STARTED ---")
    success_count = 0
    total = len(test_messages)
    
    for i, msg in enumerate(test_messages, 1):
        print(f"\nTesting message {i}/{total}: \"{msg}\"")
        try:
            result = extract_task_info(msg)
            print(f"Result: {result}")
            success_count += 1
        except Exception as e:
            print(f"Failed with error: {e}")
            
    print(f"\nEvaluation complete. Success rate: {success_count}/{total}")

if __name__ == "__main__":
    run_evaluation()