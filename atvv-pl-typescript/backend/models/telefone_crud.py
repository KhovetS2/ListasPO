from sqlalchemy.orm import Session
from database import schemas
from database.database import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, Table
from sqlalchemy.orm import relationship, mapped_column, Mapped


class Telefone(Base):

    __tablename__ = "telefone"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    ddd = Column(String)
    numero = Column(String)
    cliente_id: Mapped[int] = mapped_column(ForeignKey("cliente.id", ondelete="CASCADE"), primary_key=True)

    cliente = relationship("Cliente", back_populates="telefones")

def get_telefone(db: Session, id: int):
    return db.query(Telefone).filter(Telefone.id == id).first()


def get_all_telefone(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Telefone).offset(skip).limit(limit).all()


def create_telefone(
    db: Session, telefone: schemas.TelefoneCreate
):
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
    db_telefone = (
        db.query(Telefone).filter(Telefone.id == id).first()
    )

    if db_telefone:
        db.delete(db_telefone)
        db.commit()

    return db_telefone


