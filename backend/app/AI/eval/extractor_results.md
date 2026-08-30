Exercise 02: Structured Extractor Results

Overview


Tested the AI structured extractor prompt on 10 diverse task-related messages (including edge cases and complex inputs) to extract  
felds: requester_name, request_type, urgency, and task_title_guess.


Evaluation Results

Total Messages Tested: 10
Final Success Rate: 10/10 (All validated successfully via Pydantic schema)

Failure Cases & Prompt Iterations (Troubleshooting)


Failure Case 1: Over-generalization and Messy Titles (Message #9)
Problem: When given a vague and conversational message ("Hey, do you remember that thing we talked about last Tuesday?..."), the model got confused and copied long conversational clauses into the requester_name and task_title_guess fields instead of a proper name or short title.
Fix: Refined the prompt by adding strict rules: requester_name must be an explicit human name (otherwise null), and task_title_guess must be restricted to a short, concise phrase (maximum 3 to 6 words).


Failure Case 2: Over-conservatism and Null Fields (Messages #3 & #10)
Problem: After applying strict anti-hallucination rules, the model became overly cautious and started returning null or failing validation on mandatory fields like urgency, or failing to generate clear task titles for obvious messages.
Fix: Balanced the prompt instructions by explicitly stating that mandatory fields (like urgency) can never be null, while guiding the model to do its best to summarize clear task descriptions without hallucinating missing data.


Final Prompt Used 
You are an AI data extraction assistant. Your job is to analyze task-related messages and extract specific information into a strict JSON object.

Extract the following fields:
- "requester_name": The exact human name explicitly mentioned in the message text. If no name is explicitly written, return null. Never invent or guess a name.
- "request_type": Must be one of ["new_task", "update", "question"].
- "urgency": Must be one of ["low", "medium", "high"]. This field is mandatory and can never be null.
- "task_title_guess": A short, concise guessed title summarizing the task or main subject (maximum 3 to 6 words). Try your best to provide a title if the message discusses a task or update. If it's purely a vague question with no clear subject, use null.

Respond ONLY with a valid JSON object matching the requested fields, with no extra text or markdown formatting.

Testing message 1/10: "Hi team, Ahmed here. Can someone please fix the login bug on the main page ASAP?"
Result: {'requester_name': 'Ahmed', 'request_type': 'update', 'urgency': 'medium', 'task_title_guess': None}

Testing message 2/10: "Hey, this is Sarah. Quick question: when is our next sprint planning meeting?"
Result: {'requester_name': 'Sarah', 'request_type': 'question', 'urgency': 'low', 'task_title_guess': None}

Testing message 3/10: "Update on the database migration: we finished phase one successfully."
Result: {'requester_name': 'null', 'request_type': 'update', 'urgency': 'low', 'task_title_guess': 'null'}

Testing message 4/10: "Please create a new task for generating the monthly financial report by Thursday. - hawraa"
Result: {'requester_name': 'hawraa', 'request_type': 'new_task', 'urgency': 'medium', 'task_title_guess': 'Generate monthly financial report'}

Testing message 5/10: "Is the API documentation updated yet?"
Failed with error: 1 validation error for TaskExtraction
urgency
  Input should be 'low', 'medium' or 'high' [type=literal_error, input_value=None, input_type=NoneType]
    For further information visit https://errors.pydantic.dev/2.13/v/literal_error

Testing message 6/10: "Hey, Fatima here. We need to redesign the landing page UI as soon as possible."
Result: {'requester_name': 'Fatima', 'request_type': 'update', 'urgency': 'high', 'task_title_guess': None}

Testing message 7/10: "Status update regarding the payment gateway integration: currently delayed."
Result: {'requester_name': None, 'request_type': 'update', 'urgency': 'medium', 'task_title_guess': None}

Testing message 8/10: "Can anyone help me configure the Docker container for this project?"
Failed with error: 1 validation error for TaskExtraction
urgency
  Input should be 'low', 'medium' or 'high' [type=literal_error, input_value=None, input_type=NoneType]
    For further information visit https://errors.pydantic.dev/2.13/v/literal_error

Testing message 9/10: "Hey, do you remember that thing we talked about last Tuesday? Fix it whenever you can, or maybe ask someone else to look at it if they are free, also check the other thing."
Result: {'requester_name': None, 'request_type': 'update', 'urgency': 'medium', 'task_title_guess': None}

Testing message 10/10: "URGENT!!!! fix database ASAP @admin #12345 !!! ?????"
Result: {'requester_name': 'admin', 'request_type': 'update', 'urgency': 'high', 'task_title_guess': None}

Evaluation complete. Success rate: 8/10
(venv) PS C:\Users\BEST LAPTOP\Desktop\swibit-lab-hawraa\backend> python -u app/AI/test_extractor.py
--- EXTRACTOR EVALUATION STARTED ---

Testing message 1/10: "Hi team, Ahmed here. Can someone please fix the login bug on the main page ASAP?"
Result: {'requester_name': 'Ahmed', 'request_type': 'update', 'urgency': 'high', 'task_title_guess': 'Fix login bug on main page'}

Testing message 2/10: "Hey, this is Sarah. Quick question: when is our next sprint planning meeting?"
Result: {'requester_name': 'Sarah', 'request_type': 'question', 'urgency': 'low', 'task_title_guess': None}

Testing message 3/10: "Update on the database migration: we finished phase one successfully."
Result: {'requester_name': 'null', 'request_type': 'update', 'urgency': 'low', 'task_title_guess': 'null'}

Testing message 4/10: "Please create a new task for generating the monthly financial report by Thursday. - hawraa"
Result: {'requester_name': 'Hawraa', 'request_type': 'new_task', 'urgency': 'high', 'task_title_guess': 'Generate monthly financial report'}

Testing message 5/10: "Is the API documentation updated yet?"
Result: {'requester_name': None, 'request_type': 'question', 'urgency': 'low', 'task_title_guess': None}

Testing message 6/10: "Hey, Fatima here. We need to redesign the landing page UI as soon as possible."
Result: {'requester_name': 'Fatima', 'request_type': 'update', 'urgency': 'high', 'task_title_guess': 'Redesign landing page UI'}

Testing message 7/10: "Status update regarding the payment gateway integration: currently delayed."
Result: {'requester_name': None, 'request_type': 'update', 'urgency': 'medium', 'task_title_guess': None}

Testing message 8/10: "Can anyone help me configure the Docker container for this project?"
Result: {'requester_name': None, 'request_type': 'question', 'urgency': 'low', 'task_title_guess': None}

Testing message 9/10: "Hey, do you remember that thing we talked about last Tuesday? Fix it whenever you can, or maybe ask someone else to look at it if they are free, also check the other thing."
Result: {'requester_name': None, 'request_type': 'update', 'urgency': 'medium', 'task_title_guess': None}

Testing message 10/10: "URGENT!!!! fix database ASAP @admin #12345 !!! ?????"
Result: {'requester_name': 'admin', 'request_type': 'update', 'urgency': 'high', 'task_title_guess': None}

Evaluation complete. Success rate: 10/10
(venv) PS C:\Users\BEST LAPTOP\Desktop\swibit-lab-hawraa\backend> python -u app/AI/test_extractor.py
--- EXTRACTOR EVALUATION STARTED ---

Testing message 1/10: "Hi team, Ahmed here. Can someone please fix the login bug on the main page ASAP?"
Result: {'requester_name': 'Ahmed', 'request_type': 'update', 'urgency': 'medium', 'task_title_guess': 'Fix login bug on main page'}

Testing message 2/10: "Hey, this is Sarah. Quick question: when is our next sprint planning meeting?"
Result: {'requester_name': 'Sarah', 'request_type': 'question', 'urgency': 'low', 'task_title_guess': None}

Testing message 3/10: "Update on the database migration: we finished phase one successfully."
Result: {'requester_name': None, 'request_type': 'update', 'urgency': 'low', 'task_title_guess': 'database migration'}

Testing message 4/10: "Please create a new task for generating the monthly financial report by Thursday. - hawraa"
Result: {'requester_name': 'Hawraa', 'request_type': 'new_task', 'urgency': 'medium', 'task_title_guess': 'Generate monthly financial report'}

Testing message 5/10: "Is the API documentation updated yet?"
Result: {'requester_name': None, 'request_type': 'question', 'urgency': 'low', 'task_title_guess': None}

Testing message 6/10: "Hey, Fatima here. We need to redesign the landing page UI as soon as possible."
Result: {'requester_name': 'Fatima', 'request_type': 'update', 'urgency': 'high', 'task_title_guess': 'landing page UI redesign'}

Testing message 7/10: "Status update regarding the payment gateway integration: currently delayed."
Result: {'requester_name': None, 'request_type': 'update', 'urgency': 'medium', 'task_title_guess': 'payment gateway integration'}

Testing message 8/10: "Can anyone help me configure the Docker container for this project?"
Result: {'requester_name': None, 'request_type': 'question', 'urgency': 'low', 'task_title_guess': None}

Testing message 9/10: "Hey, do you remember that thing we talked about last Tuesday? Fix it whenever you can, or maybe ask someone else to look at it if they are free, also check the other thing."
Result: {'requester_name': None, 'request_type': 'update', 'urgency': 'medium', 'task_title_guess': None}

Testing message 10/10: "URGENT!!!! fix database ASAP @admin #12345 !!! ?????"
Result: {'requester_name': 'admin', 'request_type': 'update', 'urgency': 'high', 'task_title_guess': None}