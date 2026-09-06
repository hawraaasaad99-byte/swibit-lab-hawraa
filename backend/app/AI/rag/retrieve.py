from pathlib import Path
from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings

CHROMA_DIR = Path(__file__).parent.parent.parent.parent/ "chroma_db"

def search_policies(query: str, k: int = 2):
    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    
    vector_store = Chroma(
        persist_directory=str(CHROMA_DIR),
        embedding_function=embeddings
    )
    
    results = vector_store.similarity_search(query, k=k)
    return results