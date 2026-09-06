
from pathlib import Path
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings
from langchain_core.documents import Document

DOCS_DIR = Path(__file__).parent.parent.parent.parent.parent / "docs" / "policies"
CHROMA_DIR = Path(__file__).parent.parent.parent.parent / "chroma_db"

def ingest_policies():
    if not DOCS_DIR.exists():
        return

    documents = []
    for file_path in DOCS_DIR.glob("*.md"):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            documents.append(Document(page_content=content, metadata={"source": file_path.name}))

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=600,
        chunk_overlap=80,
        separators=["\n## ", "\n### ", "\n", " ", ""]
    )
    
    chunks = text_splitter.split_documents(documents)

    embeddings = OllamaEmbeddings(model="nomic-embed-text")

    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=str(CHROMA_DIR)
    )
    print("Ingestion completed successfully using Ollama!")

if __name__ == "__main__":
    ingest_policies()