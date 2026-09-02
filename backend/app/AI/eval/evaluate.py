import json
import os
import requests

QUESTIONS_FILE = "eval/questions.jsonl"
RESULTS_FILE = "eval/results.md"
API_URL = "http://localhost:8000/api/assistant/ask"

def run_evaluation():
    if not os.path.exists("eval"):
        os.makedirs("eval")

    total_questions = 0
    passed_questions = 0
    results_log = []

    with open(QUESTIONS_FILE, "r", encoding="utf-8") as f:
        for line in f:
            if not line.strip():
                continue
            data = json.loads(line)
            question = data["question"]
            expected_keyword = data["expected_keyword"].lower()
            print(f"evaluating:{question}...")

            total_questions += 1
            try:
                response = requests.post(API_URL, json={"question": question}, timeout=120)
                if response.status_code == 200:
                    res_data = response.json()
                    answer = res_data.get("answer", "").lower()
                    
                    if expected_keyword in answer:
                        passed_questions += 1
                        status = "PASS"
                    else:
                        status = "FAIL"
                else:
                    status = "ERROR (API)"
                    answer = f"Status Code: {response.status_code}"
            except Exception as e:
                status = "ERROR (Exception)"
                answer = str(e)

            results_log.append({
                "question": question,
                "status": status,
                "answer": answer
            })

    pass_rate = (passed_questions / total_questions) * 100 if total_questions > 0 else 0

    with open(RESULTS_FILE, "w", encoding="utf-8") as out:
        out.write("# RAG Evaluation Results\n\n")
        out.write(f"**Total Questions:** {total_questions}\n")
        out.write(f"**Passed:** {passed_questions}\n")
        out.write(f"**Pass Rate:** {pass_rate:.2f}%\n\n")
        out.write("---\n\n## Details\n\n")
        out.write("| Status | Question | Answer Snippet |\n")
        out.write("| :--- | :--- | :--- |\n")
        for item in results_log:
            snippet = item["answer"].replace("\n", " ")[:100] + "..."
            out.write(f"| **{item['status']}** | {item['question']} | {snippet} |\n")

if __name__ == "__main__":
    run_evaluation()