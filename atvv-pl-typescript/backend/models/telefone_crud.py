from sqlalchemy.orm import Session
from database import schemas
from database.database import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, Table
from sqlalchemy.orm import relationship, mapped_column, Mapped


class Telefone(Base):
    """Classe que trabalha a tabela de pedidos de evidence
    e também contém um campo com as evidencia que estão relacionadas a ela
    """

    __tablename__ = "telefone"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    ddd = Column(String)
    numero = Column(String)
    cliente_id: Mapped[int] = mapped_column(ForeignKey("cliente.id", ondelete="CASCADE"), primary_key=True)


def get_telefone(db: Session, id: int):
    """Busca no banco ao pedido de evidencia pelo id e retorna ela"""
    return db.query(Telefone).filter(Telefone.id == id).first()


def get_all_telefone(db: Session, skip: int = 0, limit: int = 100):
    """Busca no banco todos os pedidos de evidencia, porém limitando a busca a 100 por vez"""
    return db.query(Telefone).offset(skip).limit(limit).all()


def create_telefone(
    db: Session, telefone: schemas.TelefoneCreate
):
    """Cria um novo pedido de evidencia no banco"""
    db_telefone = Telefone(
        ddd=telefone.ddd,
        numero=telefone.numero,
        cliente_id=telefone.cliente_id,
    )
    db.add(db_telefone)
    db.commit()
    db.refresh(db_telefone)
    return db_telefone


def update_telefone(
    db: Session, telefone: schemas.Telefone
):
    """Se o pedido de evidencia existir, altera ele no banco"""
    db_telefone = (
        db.query(Telefone)
        .filter(Telefone.id == telefone.id)
        .first()
    )

    if db_telefone:
        db_telefone.ddd = telefone.ddd
        db_telefone.numero = telefone.numero
        db_telefone.cliente_id = telefone.cliente_id

        db.commit()
        db.refresh(db_telefone)

    return db_telefone


def delete_telefone(db: Session, id: int):
    """Se o pedido de evidencia existir, deleta ele do banco"""
    db_telefone = (
        db.query(Telefone).filter(Telefone.id == id).first()
    )

    if db_telefone:
        db.delete(db_telefone)
        db.commit()

    return db_telefone


