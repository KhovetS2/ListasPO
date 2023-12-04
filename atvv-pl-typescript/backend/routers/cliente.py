from fastapi import APIRouter, BackgroundTasks, Depends, File, HTTPException, UploadFile
from fastapi.responses import JSONResponse
from database import schemas
from sqlalchemy.orm import Session
from database.database import get_db
from typing import Annotated, Optional
from models import cliente_crud
#email


router = APIRouter(tags=["Clientes"])


## Evidencias rotas


@router.get("/clientes/{id}", response_model=Optional[schemas.Cliente])
async def get_cliente(
    id: int,
    db: Session = Depends(get_db),
):
    return cliente_crud.get_cliente(id=id, db=db)


@router.get("/clientes", response_model=Optional[list[schemas.Cliente]])
async def get_all_cliente(
    db: Session = Depends(get_db),
):
    return cliente_crud.get_all_cliente( db=db)


@router.post("/clientes/", response_model=Optional[schemas.Cliente])
async def create_cliente(
    cliente: schemas.ClienteCreate,
    db: Session = Depends(get_db),
):

    return cliente_crud.create_cliente(db=db, cliente=cliente)


@router.put("/clientes/", response_model=Optional[schemas.Cliente])
async def update_cliente(
    cliente: schemas.Cliente,
    db: Session = Depends(get_db),
):
    return cliente_crud.update_cliente(cliente=cliente, db=db)


@router.delete("/clientes/{id}")
async def delete_cliente(
    id: int,
    db: Session = Depends(get_db),
):
    return cliente_crud.delete_cliente(id=id, db=db)
