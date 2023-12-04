from sqlalchemy.orm import Session
from database import schemas
from database.database import Base
from sqlalchemy import ForeignKey, String, Column, Integer
from sqlalchemy.orm import relationship, mapped_column, Mapped


class CompraServico(Base):
    __tablename__ = "compra_servico"
    cliente_id: Mapped[int] = mapped_column(ForeignKey("cliente.id"), primary_key=True)
    servico_id: Mapped[int] = mapped_column(ForeignKey("servico.id"), primary_key=True)
    raca = Column(String)
    tipo = Column(String)
    quatidade = Column(Integer)


def get_compra_servico_by_cliente_id_and_servico_id(
    db: Session, cliente_id: int, servico_id: int
):
    return (
        db.query(CompraServico)
        .filter(
            (CompraServico.cliente_id == cliente_id)
            & (CompraServico.servico_id == servico_id)
        )
        .first()
    )


def get_compra_servico_by_all_campos(
    db: Session, cliente_id: int, servico_id: int, raca: str, tipo: str
):
    return (
        db.query(CompraServico)
        .filter(
            (CompraServico.cliente_id == cliente_id)
            & (CompraServico.servico_id == servico_id)
            & (CompraServico.raca == raca)
            & (CompraServico.tipo == tipo)
        )
        .first()
    )


def get_compra_servico_by_cliente_id_all(
    db: Session, cliente_id: int, skip: int = 0, limit: int = 100
):
    return (
        db.query(CompraServico)
        .filter(CompraServico.cliente_id == cliente_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_compra_servico_by_servico_id_all(
    db: Session, servico_id: int, skip: int = 0, limit: int = 100
):
    """Busca todas as relação do processo com usuarios e retorna os 100 primeiros
    registro com capacidade para ir seguindo a busca"""
    return (
        db.query(CompraServico)
        .filter(CompraServico.servico_id == servico_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_all_compra_servico(db: Session, skip: int = 0, limit: int = 100):
    """Busca todas as relação de usuario-processo e retorna os 100 primeiros
    registro com capacidade para ir seguindo a busca"""
    return db.query(CompraServico).offset(skip).limit(limit).all()


def create_compra_servico(db: Session, compra_servico: schemas.CompraServicoCreate):
    """Cria uma relação de processo com usuario"""
    db_compra_servico = CompraServico(
        cliente_id=compra_servico.cliente_id,
        servico_id=compra_servico.servico_id,
        raca=compra_servico.raca,
        tipo=compra_servico.tipo,
        quatidade=compra_servico.quatidade,
    )
    db.add(db_compra_servico)
    db.commit()
    db.refresh(db_compra_servico)
    return db_compra_servico


def delete_compra_servico(db: Session, cliente_id: int, servico_id: int):
    """Se a relação existir, deleta a relação do banco"""

    db_compra_servico = (
        db.query(CompraServico)
        .filter(
            (CompraServico.cliente_id == cliente_id)
            & (CompraServico.servico_id == servico_id)
        )
        .first()
    )

    if db_compra_servico:
        db.delete(db_compra_servico)
        db.commit()

    return db_compra_servico



def update_compra_servico(db: Session, compraServico: schemas.CompraServico):
    db_compra_produto = db.query(CompraServico).filter(
            (CompraServico.cliente_id == compraServico.cliente_id)
            & (CompraServico.servico_id == compraServico.servico_id)
            & (CompraServico.raca == compraServico.raca)
            & (CompraServico.tipo == compraServico.tipo)
        ).first()
    
    db_compra_produto.quatidade = compraServico.quatidade
    db.commit()
    db.refresh(db_compra_produto)
    return db_compra_produto