from fastapi import APIRouter, Depends, HTTPException
from database import schemas
from sqlalchemy.orm import Session
from models import produto_crud
from database.database import get_db
from typing import Annotated, Optional

router = APIRouter(tags=["Produto"])


## Pedidos De Evidencia rotas


@router.get("/produto/{id}", response_model=Optional[schemas.Produto])
async def get_produto(
    id: int,
    db: Session = Depends(get_db),
):
    return produto_crud.get_produto(id=id, db=db)

@router.get("/produto", response_model=Optional[list[schemas.Produto]])
async def get_all_produto(
    db: Session = Depends(get_db),
):
    return produto_crud.get_all_produto( db=db)


@router.post("/produto/", response_model=Optional[schemas.Produto])
async def create_produto(
    produto: schemas.ProdutoCreate,
    db: Session = Depends(get_db),
):
    return produto_crud.create_produto(
        db=db, produto=produto
    )


@router.put("/produto/", response_model=Optional[schemas.Produto])
async def update_produto(
    produto: schemas.Produto,
    db: Session = Depends(get_db),
):
    return produto_crud.update_produto(
        produto=produto, db=db
    )



@router.delete("/produto/{id}")
async def delete_produto(
    id: int,
    db: Session = Depends(get_db),
):
    return produto_crud.delete_produto(id=id, db=db)
