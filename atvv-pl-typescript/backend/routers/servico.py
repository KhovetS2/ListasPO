from fastapi import APIRouter, Depends, HTTPException
from database import schemas
from sqlalchemy.orm import Session
from models import servico_crud
from database.database import get_db
from typing import Annotated, Optional

router = APIRouter(tags=["Servico"])


## Pedidos De Evidencia rotas


@router.get("/servico/{id}", response_model=Optional[schemas.Servico])
async def get_servico(
    id: int,
    db: Session = Depends(get_db),
):
    return servico_crud.get_servico(id=id, db=db)

@router.get("/servico", response_model=Optional[list[schemas.Servico]])
async def get_all_servico(
    db: Session = Depends(get_db),
):
    return servico_crud.get_all_servico( db=db)


@router.post("/servico/", response_model=Optional[schemas.Servico])
async def create_servico(
    servico: schemas.ServicoCreate,
    db: Session = Depends(get_db),
):
    return servico_crud.create_servico(
        db=db, servico=servico
    )


@router.put("/servico/", response_model=Optional[schemas.Servico])
async def update_servico(
    servico: schemas.Servico,
    db: Session = Depends(get_db),
):
    return servico_crud.update_servico(
        servico=servico, db=db
    )



@router.delete("/servico/{id}")
async def delete_servico(
    id: int,
    db: Session = Depends(get_db),
):
    return servico_crud.delete_servico(id=id, db=db)
