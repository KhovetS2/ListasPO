from fastapi import APIRouter, Depends, HTTPException
from database import schemas
from sqlalchemy.orm import Session
from models import compra_produto_crud
from database.database import get_db
from typing import Optional, Annotated

router = APIRouter(tags=["Compra Produto"])


## Compra Usuario cliente


@router.get(
    "/compra_produto/{cliente_id:int}/{produto_id:int}",
    response_model=Optional[schemas.CompraProduto],
)
async def get_compra_produto(
    cliente_id:int,
    produto_id:int,
    db: Session = Depends(get_db),
):
    compra_produto = compra_produto_crud.get_compra_produto_by_cliente_id_and_produto_id(
        cliente_id=cliente_id, produto_id=produto_id, db=db
    )
    if not compra_produto:
        raise HTTPException(
            status_code=404, detail="Relação de Compra e cliente não encontrada "
        )
    return compra_produto

@router.get(
    "/compra_produto/{cliente_id:int}/{produto_id:int}/{raca:str}/{tipo:str}",
    response_model=Optional[schemas.CompraProduto],
)
async def get_compra_produto_by_all_campos(
    cliente_id: int,
    produto_id: int,
    raca: str,
    tipo: str,
    db: Session = Depends(get_db),
):
    compra_produto = (
        compra_produto_crud.get_compra_produto_by_all_campos(
            cliente_id=cliente_id, produto_id=produto_id, raca=raca,tipo=tipo, db=db
        )
    )
    if not compra_produto:
        raise HTTPException(
            status_code=404, detail="Relação de Compra e cliente não encontrada "
        )
    return compra_produto



@router.get(
    "/compra_produto",
    response_model=Optional[list[schemas.CompraProduto]],
)
async def get_all_compra_produto(
    db: Session = Depends(get_db),
):
    compra_produto = compra_produto_crud.get_all_compra_produto(
        db=db
    )
    if not compra_produto:
        raise HTTPException(
            status_code=404, detail="Relação de Compra e cliente não encontrada "
        )
    return compra_produto

@router.put(
    "/compra_produto",
    response_model=Optional[schemas.CompraProduto],
)
async def get_uptade_compra_produto(
    compraProduto: schemas.CompraProduto,
    db: Session = Depends(get_db),
):
    compra_produto = compra_produto_crud.update_compra_produto(compraProduto=compraProduto,
        db=db
    )
    if not compra_produto:
        raise HTTPException(
            status_code=404, detail="Relação de Compra e cliente não encontrada "
        )
    return compra_produto

@router.get(
    "/compra_produto/cliente_id/{cliente_id:int}",
    response_model=Optional[list[schemas.CompraProduto]],
)
async def get_all_compra_produto_by_cliente_id(
    cliente_id: int,
    db: Session = Depends(get_db),
):
    compra_produto = compra_produto_crud.get_compra_produto_by_cliente_id_all(
        cliente_id=cliente_id,
        db=db
    )
    if not compra_produto:
        raise HTTPException(
            status_code=404, detail="Relação de Compra e cliente não encontrada "
        )
    return compra_produto

@router.get(
    "/compra_produto/produto_id/{produto_id:int}",
    response_model=Optional[list[schemas.CompraProduto]],
)
async def get_all_compra_produto_by_produto_id(
    produto_id: int,
    db: Session = Depends(get_db),
):
    compra_produto = compra_produto_crud.get_compra_produto_by_produto_id_all(
        produto_id=produto_id,
        db=db
    )
    if not compra_produto:
        raise HTTPException(
            status_code=404, detail="Relação de Compra e Produto não encontrada "
        )
    return compra_produto


@router.post("/compra_produto/", response_model=Optional[schemas.CompraProdutoCreate])
async def create_compra_produto(
    compra_produto: schemas.CompraProdutoCreate,
    db: Session = Depends(get_db),
):
    return compra_produto_crud.create_compra_produto(db=db, compra_produto=compra_produto)


@router.delete("/compra_produto/", response_model=Optional[schemas.CompraProdutoBase])
def delete_compra_produto(
    compra_produto: schemas.CompraProdutoBase,
    db: Session = Depends(get_db),
):
    """Rota para deletar uma relação Usuario-Compra"""
    return compra_produto_crud.delete_compra_produto(db=db, cliente_id=compra_produto.cliente_id, produto_id=compra_produto.produto_id)
