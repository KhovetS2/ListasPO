from database import schemas, database
from sqlalchemy.orm import Session
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database.database import SessionLocal, engine
from routers import cliente, pet, produto, servico, compraProduto ,compraServico

database.Base.metadata.create_all(bind=engine)

app = FastAPI(version="5.0.0")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ou especifique origens específicas
    allow_credentials=["*"],
    allow_methods=["*"],  # Ou especifique métodos específicos (GET, POST, etc.)
    allow_headers=["*"],  # Ou especifique cabeçalhos específicos
)

app.include_router(cliente.router)
app.include_router(pet.router)
app.include_router(produto.router)
app.include_router(compraProduto.router)
app.include_router(compraServico.router)
app.include_router(servico.router)

