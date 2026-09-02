# Code Review and Deployment Standards

## 1. Pull Request Guidelines and Quality Assurance
- **Peer Reviews:** Every code change committed to our backend repositories (built with Python, FastAPI, SQLAlchemy, and PostgreSQL) or AI pipeline modules must pass automated Pytest testing suites successfully and receive at least one formal approval from a senior peer or tech lead.
- **Conventional Commits:** Commit messages must strictly follow conventional commit standards (e.g., `feat(rag): add chroma vector similarity search`, `fix(api): resolve pydantic validation error`) to maintain a clean and traceable git history.

## 2. Secrets Management and Environment Security
Hardcoding API keys, database connection strings, JWT secrets, or LLM provider tokens directly into source code files is classified as a critical security violation. All sensitive credentials must be injected dynamically via secure environment variables (`.env`) or secret managers. Automated static analysis tools scan all commits for leaked secrets prior to merging.