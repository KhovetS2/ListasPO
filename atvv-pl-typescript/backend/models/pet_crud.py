from typing import List
from sqlalchemy.orm import Session
from database import schemas
from database.database import Base
from sqlalchemy import Boolean, Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship, Mapped



class Pet(Base):
    __tablename__ = "pet"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String)
    tipo = Column(String)
    raca = Column(String)
    genero = Column(String)
    cliente_id = Column(Integer, ForeignKey("cliente.id", ondelete="CASCADE"))

    cliente = relationship("Cliente", back_populates="pets")

def get_pet(db: Session, id: int):
    return db.query(Pet).filter(Pet.id == id).first()


def get_all_pet(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(Pet)
        .order_by(Pet.id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_pet(db: Session, pet: schemas.PetCreate):
    db_pet = Pet(
        nome=pet.nome,
        tipo=pet.tipo,
        raca=pet.raca,
        genero=pet.genero,
        cliente_id=pet.cliente_id,
    )
    db.add(db_pet)
    db.commit()
    db.refresh(db_pet)
    return db_pet


def update_pet(db: Session, pet: schemas.Pet):
    """Se existir, altera o peto no banco"""
    db_pet = db.query(Pet).filter(Pet.id == pet.id).first()

    if db_pet:
        db_pet.nome = pet.nome
        db_pet.tipo = pet.tipo
        db_pet.raca = pet.raca
        db_pet.genero = pet.genero
        db_pet.cliente_id = pet.cliente_id

        db.commit()
        db.refresh(db_pet)

    return db_pet


def delete_pet(db: Session, id: int):
    """Se existir, deleta o peto no banco pelo o id dele"""
    db_pet = db.query(Pet).filter(Pet.id == id).first()

    if db_pet:
        db.delete(db_pet)
        db.commit()

    return db_pet
