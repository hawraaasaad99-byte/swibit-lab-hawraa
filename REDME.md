# Swibit Lab - Mobile & Backend Application 

A full-stack application featuring a React Native (Expo) mobile frontend, a Python FastAPI backend, a PostgreSQL database, and integrated AI assistant capabilities. Developed as part of the technical training program.

---

##  Architecture & Tech Stack

The application data flows through the following layers:
**Mobile (Expo) ➔ Backend API (FastAPI) ➔ Database (PostgreSQL) ➔ AI Assistant**

* **Frontend:** React Native, Expo
* **Backend:** Python, FastAPI, SQLAlchemy
* **Database:** PostgreSQL
* **AI:** Integrated AI assistant with citation support

--


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

swibitlab - frontend

A modern mobile application built with React Native and Expo, following modular component patterns and best practices.

Prerequisites & Local Setup
Make sure you have Node.js and npm installed, then follow these steps:

Navigate to the mobile directory:

**cd apps/mobile

Install Dependencies:

**npm install

Run the Expo Development Server:

**npx expo start (You can run the app using Expo Go on your physical device, or via an Android/iOS emulator).


swibitlab - AI

The system incorporates an AI assistant service capable of handling intelligent queries, processing context, and providing strict citations.

Evaluation Setup: Located in the eval/ directory, containing evaluation questions (questions.jsonl) and performance results (results.md).

Architecture Docs: For detailed data flow diagrams (Mobile ➔ API ➔ DB ➔ AI), check out docs/architecture.md.

