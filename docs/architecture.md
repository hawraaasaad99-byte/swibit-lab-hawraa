# System Architecture

This document outlines the high-level architecture, component interactions, and data flow of the Swibit Lab application.

## Data Flow Diagram

The following Mermaid diagram illustrates the request and data lifecycle moving from the user interface down to the database and AI layers:

```mermaid
graph LR
    A[Mobile App <br> React Native / Expo] -->|API Requests / UI Actions| B[Backend API <br> Python / FastAPI]
    B -->|SQLAlchemy ORM / CRUD| C[(Database <br> PostgreSQL)]
    B -->|Prompt & Context Processing| D[AI Assistant Service]
    D -->|Citations & Responses| B
    B -->|JSON Response| A


Architecture Components
Mobile Frontend (apps/mobile):

Built using React Native and Expo.

Structured with modular and reusable UI components to ensure clean separation of concerns and maintainability.

Communicates with the backend via HTTP/REST API endpoints.


Backend API (backend/):

Built with Python and FastAPI.

Handles business logic, user authentication, data validation, and routing.

Manages communication with both the relational database and external/internal AI services.



Database Layer (PostgreSQL):

Relational database storing application records, user data, tasks, and transactional logs.

Connected securely via SQLAlchemy models defined in the backend.



AI Assistant Integration:

Processes user queries, retrieves context, and formats outputs with strict citation requirements and fallback handling.    