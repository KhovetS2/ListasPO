from typing import List
from sqlalchemy.orm import Session
from database import schemas
from database.database import Base
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship, Mapped



class Servico(Base):
    __tablename__ = "servico"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String)
    valor = Column(Float)
    

def get_servico(db: Session, id: int):
    return db.query(Servico).filter(Servico.id == id).first()


def get_all_servico(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(Servico)
        .order_by(Servico.id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_servico(db: Session, servico: schemas.ServicoCreate):
    db_servico = Servico(
        nome=servico.nome,
        valor=servico.valor,
    )
    db.add(db_servico)
    db.commit()
    db.refresh(db_servico)
    return db_servico


def update_servico(db: Session, servico: schemas.Servico):
    """Se existir, altera o servicoo no banco"""
    db_servico = db.query(Servico).filter(Servico.id == servico.id).first()

    if db_servico:
        db_servico.nome = servico.nome
        db_servico.valor = servico.valor

        db.commit()
        db.refresh(db_servico)

    return db_servico


def delete_servico(db: Session, id: int):
    """Se existir, deleta o servicoo no banco pelo o id dele"""
    db_servico = db.query(Servico).filter(Servico.id == id).first()

    if db_servico:
        db.delete(db_servico)
        db.commit()

    return db_servico
