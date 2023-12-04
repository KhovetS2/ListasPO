from fastapi import APIRouter, Depends, HTTPException
from database import schemas
from sqlalchemy.orm import Session
from models import compra_servico_crud
from database.database import get_db
from typing import Optional, Annotated

router = APIRouter(tags=["Compra Servico"])


## Compra Usuario cliente


@router.get(
    "/compra_servico/{cliente_id:int}/{servico_id:int}",
    response_model=Optional[schemas.CompraServico],
)
async def get_compra_servico(
    cliente_id: int,
    servico_id: int,
    db: Session = Depends(get_db),
):
    compra_servico = (
        compra_servico_crud.get_compra_servico_by_cliente_id_and_servico_id(
            cliente_id=cliente_id, servico_id=servico_id, db=db
        )
    )
    if not compra_servico:
        raise HTTPException(
            status_code=404, detail="Relação de Compra e cliente não encontrada "
        )
    return compra_servico


@router.get(
    "/compra_servico",
    response_model=Optional[list[schemas.CompraServico]],
)
async def get_all_compra_servico(
    db: Session = Depends(get_db),
):
    compra_servico = compra_servico_crud.get_all_compra_servico(db=db)
    if not compra_servico:
        raise HTTPException(
            status_code=404, detail="Relação de Compra e cliente não encontrada "
        )
    return compra_servico


@router.get(
    "/compra_servico/{cliente_id:int}/{servico_id:int}/{raca:str}/{tipo:str}",
    response_model=Optional[schemas.CompraProduto],
)
async def get_compra_servico_by_all_campos(
    cliente_id: int,
    servico_id: int,
    raca: str,
    tipo: str,
    db: Session = Depends(get_db),
):
    compra_servico = (
        compra_servico_crud.get_compra_servico_by_all_campos(
            cliente_id=cliente_id, servico_id=servico_id, raca=raca,tipo=tipo, db=db
        )
    )
    if not compra_servico:
        raise HTTPException(
            status_code=404, detail="Relação de Compra e cliente não encontrada "
        )
    return compra_servico


@router.get(
    "/compra_servico/cliente_id/{cliente_id:int}",
    response_model=Optional[list[schemas.CompraServico]],
)
async def get_all_compra_servico_by_cliente_id(
    cliente_id: int,
    db: Session = Depends(get_db),
):
    compra_servico = compra_servico_crud.get_compra_servico_by_cliente_id_all(
        cliente_id=cliente_id, db=db
    )
    if not compra_servico:
        raise HTTPException(
            status_code=404, detail="Relação de Compra e cliente não encontrada "
        )
    return compra_servico


@router.get(
    "/compra_servico/servico_id/{servico_id:int}",
    response_model=Optional[list[schemas.CompraServico]],
)
async def get_all_compra_servico_by_servico_id(
    servico_id: int,
    db: Session = Depends(get_db),
):
    compra_servico = compra_servico_crud.get_compra_servico_by_servico_id_all(
        servico_id=servico_id, db=db
    )
    if not compra_servico:
        raise HTTPException(
            status_code=404, detail="Relação de Compra e Servico não encontrada "
        )
    return compra_servico


@router.post("/compra_servico/", response_model=Optional[schemas.CompraServicoCreate])
async def create_compra_servico(
    compra_servico: schemas.CompraServicoCreate,
    db: Session = Depends(get_db),
):
    return compra_servico_crud.create_compra_servico(
        db=db, compra_servico=compra_servico
    )


@router.delete("/compra_servico/", response_model=Optional[schemas.CompraServicoBase])
def delete_compra_servico(
    compra_servico: schemas.CompraServicoBase,
    db: Session = Depends(get_db),
):
    """Rota para deletar uma relação Usuario-Compra"""
    return compra_servico_crud.delete_compra_servico(
        db=db,
        cliente_id=compra_servico.cliente_id,
        servico_id=compra_servico.servico_id,
    )



@router.put(
    "/compra_servico",
    response_model=Optional[schemas.CompraServico],
)
async def get_uptade_compra_servico(
    compraServico: schemas.CompraServico,
    db: Session = Depends(get_db),
):
    compra_servico = compra_servico_crud.update_compra_servico(compraServico=compraServico,
        db=db
    )
    if not compra_servico:
        raise HTTPException(
            status_code=404, detail="Relação de Compra e cliente não encontrada "
        )
    return compra_servico