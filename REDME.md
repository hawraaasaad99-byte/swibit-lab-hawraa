Swibit Lab - Backend

A robust and secure backend API built with FastAPI, featuring JWT authentication, PostgreSQL database integration, and automated CI/CD testing pipelines.

Tech Stack
* Framework: FastAPI (Python 3.11+)
* Database & ORM: PostgreSQL & SQLAlchemy
* Validation: Pydantic
* Authentication: OAuth2 with JWT (JSON Web Tokens)
* Testing & CI/CD: Pytest & GitHub Actions

Local Development Setup

Follow these steps to set up and run the project locally on your machine:
Clone the Repository
```powershell
git clone [https://github.com/hawraasaad99-byte/swibit-lab-hawraa.git](https://github.com/hawraasaad99-byte/swibit-lab-hawraa.git)
cd swibit-lab-hawraa

Create and Activate Virtual Environment:

python -m venv venv
.\venv\Scripts\Activate.ps1

Install Dependencies
Navigate into the backend directory and install the required packages:

cd backend
pip install -r requirements.txt

Run the Server
Start the FastAPI development server:

python -m uvicorn main:app --reload

Running Tests
To run the automated test suite locally using ⁠pytest⁠:

pytest 