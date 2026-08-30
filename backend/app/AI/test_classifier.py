
from classifier_service import classify_message  
import sys
from pathlib import Path

backend_dir = Path(__file__).resolve().parent
sys.path.append(str(backend_dir))

test_messages = [ 
    "I want to reset my password, I forgot it.", 
    "My last invoice has an incorrect charge of $50.", 
    "I'd like to upgrade my subscription plan to Enterprise.", 
    "Your service has crashed three times today, this is unacceptable!",
     "Hi, can you tell me what features are included in the free tier?",
     "Can I pay my yearly bill using cryptocurrency like Bitcoin?", 
     "Your app deleted all my project files after the update, fix this immediately!",
     "How do I add a new team member to my workspace?", 
     "Do you offer discounts for non-profit educational organizations?", 
    "The login button is completely invisible on my mobile screen."  

    ]
def run_evaluation():
     print("--- SCRIPT STARTED AND EVALUATION RUNNING ---")
     success_count = 0 
     total = len(test_messages)
     for i, msg in enumerate(test_messages, 1):
      print(f"\nTesting message {i}/{total}: {msg}")
      try:
          result = classify_message(msg)
          print(f"Result: {result}")
          success_count += 1
      except Exception as e:
        print(f"Failed with error: {e}")
        
     print(f"\nEvaluation complete. Success rate: {success_count}/{total}")
if __name__ == "__main__":
   run_evaluation()
   