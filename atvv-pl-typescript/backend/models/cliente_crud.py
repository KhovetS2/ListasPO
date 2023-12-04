from sqlalchemy.orm import Session
from database import schemas
from database.database import Base
from sqlalchemy import Column,Boolean, ForeignKey, Integer, String, Date
from sqlalchemy.orm import relationship, Mapped
from models import pet_crud, telefone_crud, endereco_crud
from typing import List

class Cliente(Base):

    __tablename__ = "cliente"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String)
    nomeSocial = Column(String)
    email = Column(String)
    endereco = relationship(endereco_crud.Endereco, cascade="all, delete-orphan", order_by=endereco_crud.Endereco.id)
    pets = relationship(pet_crud.Pet, cascade="all, delete-orphan", order_by=pet_crud.Pet.id)
    telefones = relationship(telefone_crud.Telefone, cascade="all, delete-orphan", order_by=telefone_crud.Telefone.id)
    


def get_cliente(db: Session, id: int):
    return db.query(Cliente).filter(Cliente.id == id).first()


def get_all_cliente(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Cliente).order_by(Cliente.id).offset(skip).limit(limit).all()


def create_cliente(db: Session, cliente: schemas.ClienteCreate):
    db_cliente = Cliente(
        nome=cliente.nome,
        nomeSocial=cliente.nomeSocial,
        email=cliente.email,
    )
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    for item in cliente.telefones:
        item.cliente_id=db_cliente.id
        telefone_crud.create_telefone(db=db, telefone=item)
    cliente.endereco.cliente_id = db_cliente.id
    endereco_crud.create_endereco(db=db, endereco=cliente.endereco)
    db.refresh(db_cliente)
    db.commit()
    return db_cliente


def update_cliente(db: Session, cliente: schemas.Cliente):
    db_cliente = db.query(Cliente).filter(Cliente.id == cliente.id).first()

    if db_cliente:
        db_cliente.nome = cliente.nome
        db_cliente.nomeSocial = cliente.nomeSocial
        db_cliente.email = cliente.email
        for item in db_cliente.telefones:
            db.delete(item)
        for item in cliente.telefones:
            telefone_crud.create_telefone(db=db, telefone=item)
        for item in cliente.endereco:  
            if item.id ==0:
                endereco_crud.create_endereco(db=db, endereco=item)
            endereco_crud.update_endereco(db=db, endereco=item)

        db.commit()
        db.refresh(db_cliente)

    return db_cliente


def delete_cliente(db: Session, id: int):
    db_cliente = db.query(Cliente).filter(Cliente.id == id).first()

    if db_cliente:
        db.delete(db_cliente)
        db.commit()

    return db_cliente

