import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch
from app.main import app

client = TestClient(app)

@patch("app.api.assistant.classify_message")
def test_mock_classify_success(mock_classify):
    mock_classify.return_value = {
        "category": "support",
        "priority": "medium",
        "summary": "This is a test summary.",
        "suggested_action": "Check the documentation."
    }

    response = client.post("/api/assistant/classify", json={"text": "Is the API updated?"})
    assert response.status_code == 200
    data = response.json()
    assert data["category"] == "support"
    assert "summary" in data


@patch("app.api.assistant.classify_message")
def test_classify_llm_error(mock_classify):
    mock_classify.side_effect = Exception("LLM service down")
    response = client.post("/api/assistant/classify", json={"text": "Test error handling"})
    assert response.status_code == 500  

def test_classify_invalid_input():
    response = client.post("/api/assistant/classify", json={})
    assert response.status_code == 500