from typing import List
from sqlalchemy.orm import Session
from database import schemas
from database.database import Base
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship, Mapped



class Produto(Base):
    __tablename__ = "produto"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String)
    valor = Column(Float)


def get_produto(db: Session, id: int):
    return db.query(Produto).filter(Produto.id == id).first()


def get_all_produto(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(Produto)
        .order_by(Produto.id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_produto(db: Session, produto: schemas.ProdutoCreate):
    db_produto = Produto(
        nome=produto.nome,
        valor=produto.valor,
    )
    db.add(db_produto)
    db.commit()
    db.refresh(db_produto)
    return db_produto


def update_produto(db: Session, produto: schemas.Produto):
    """Se existir, altera o produtoo no banco"""
    db_produto = db.query(Produto).filter(Produto.id == produto.id).first()

    if db_produto:
        db_produto.nome = produto.nome
        db_produto.valor = produto.valor

        db.commit()
        db.refresh(db_produto)

    return db_produto


def delete_produto(db: Session, id: int):
    """Se existir, deleta o produtoo no banco pelo o id dele"""
    db_produto = db.query(Produto).filter(Produto.id == id).first()

    if db_produto:
        db.delete(db_produto)
        db.commit()

    return db_produto
