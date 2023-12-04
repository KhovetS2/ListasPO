from sqlalchemy.orm import Session
from database import schemas
from database.database import Base
from sqlalchemy import ForeignKey, String, Column, Integer
from sqlalchemy.orm import relationship, mapped_column, Mapped


class CompraProduto(Base):

    __tablename__ = "compra_produto"
    cliente_id: Mapped[int] = mapped_column(ForeignKey("cliente.id"), primary_key=True)
    produto_id: Mapped[int] = mapped_column(ForeignKey("produto.id"), primary_key=True)
    raca = Column(String)
    tipo = Column(String)
    quatidade = Column(Integer)


def get_compra_produto_by_cliente_id_and_produto_id(db: Session, cliente_id: int, produto_id: int):
    return (
        db.query(CompraProduto)
        .filter((CompraProduto.cliente_id == cliente_id) & (CompraProduto.produto_id == produto_id))
        .first()
    )


def get_compra_produto_by_cliente_id_all(
    db: Session, cliente_id: int, skip: int = 0, limit: int = 100
):
    return (
        db.query(CompraProduto)
        .filter(CompraProduto.cliente_id == cliente_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_compra_produto_by_produto_id_all(
    db: Session, produto_id: int, skip: int = 0, limit: int = 100
):
    """Busca todas as relação do processo com usuarios e retorna os 100 primeiros
    registro com capacidade para ir seguindo a busca"""
    return (
        db.query(CompraProduto)
        .filter(CompraProduto.produto_id == produto_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_compra_produto_by_all_campos(
    db: Session, cliente_id: int, produto_id: int, raca: str, tipo: str
):
    return (
        db.query(CompraProduto)
        .filter(
            (CompraProduto.cliente_id == cliente_id)
            & (CompraProduto.produto_id == produto_id)
            & (CompraProduto.raca == raca)
            & (CompraProduto.tipo == tipo)
        )
        .first()
    )




def get_all_compra_produto(db: Session, skip: int = 0, limit: int = 100):
    """Busca todas as relação de usuario-processo e retorna os 100 primeiros
    registro com capacidade para ir seguindo a busca"""
    return db.query(CompraProduto).offset(skip).limit(limit).all()


def create_compra_produto(db: Session, compra_produto: schemas.CompraProduto):
    """Cria uma relação de processo com usuario"""
    db_compra_produto = CompraProduto(
        cliente_id=compra_produto.cliente_id, 
        produto_id=compra_produto.produto_id,
        raca=compra_produto.raca,
        tipo=compra_produto.tipo,
        quatidade=compra_produto.quatidade,
    )
    db.add(db_compra_produto)
    db.commit()
    db.refresh(db_compra_produto)
    return db_compra_produto


def delete_compra_produto(db: Session, cliente_id: int, produto_id: int):
    """Se a relação existir, deleta a relação do banco"""
    
    db_compra_produto = (
        db.query(CompraProduto)
        .filter((CompraProduto.cliente_id == cliente_id) & (CompraProduto.produto_id == produto_id))
        .first()
    )

    if db_compra_produto:
        db.delete(db_compra_produto)
        db.commit()

    return db_compra_produto


def update_compra_produto(db: Session, compraProduto: schemas.CompraProduto):
    db_compra_produto = db.query(CompraProduto).filter(
            (CompraProduto.cliente_id == compraProduto.cliente_id)
            & (CompraProduto.produto_id == compraProduto.produto_id)
            & (CompraProduto.raca == compraProduto.raca)
            & (CompraProduto.tipo == compraProduto.tipo)
        ).first()
    
    db_compra_produto.quatidade = compraProduto.quatidade
    db.commit()
    db.refresh(db_compra_produto)
    return db_compra_produto
    