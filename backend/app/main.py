from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.routers import users, tasks
from app.core.database import Base, engine
from app.core.logging import logger
from fastapi.middleware.cors import CORSMiddleware
from app.api.assistant import router as assistant_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    logger.info("application starting")
    yield
    

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(tasks.router)
app.include_router(assistant_router, prefix="/api")

@app.get("/health")
def health():
    return {"status": "healthy"}
