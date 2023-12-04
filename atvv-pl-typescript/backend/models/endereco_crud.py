from sqlalchemy.orm import Session
from database import schemas
from database.database import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, Table
from sqlalchemy.orm import relationship, mapped_column, Mapped


class Endereco(Base):

    __tablename__ = "endereco"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    rua = Column(String)
    numero = Column(String)
    bairro = Column(String)
    cidade = Column(String)
    estado = Column(String)
    codigoPostal = Column(String)
    informacoesAdicionais = Column(String)
    cliente_id = Column(Integer, ForeignKey("cliente.id", ondelete="CASCADE"))

    cliente = relationship("Cliente", back_populates="endereco")

def get_endereco(db: Session, id: int):
    """Busca no banco ao pedido de evidencia pelo id e retorna ela"""
    return db.query(Endereco).filter(Endereco.id == id).first()


def get_all_endereco(db: Session, skip: int = 0, limit: int = 100):
    """Busca no banco todos os pedidos de evidencia, porém limitando a busca a 100 por vez"""
    return db.query(Endereco).offset(skip).limit(limit).all()


def create_endereco(
    db: Session, endereco: schemas.EnderecoCreate
):
    """Cria um novo pedido de evidencia no banco"""
    db_endereco = Endereco(
        rua=endereco.rua,
        numero=endereco.numero,
        bairro=endereco.bairro,
        cidade=endereco.cidade,
        estado=endereco.estado,
        codigoPostal=endereco.codigoPostal,
        informacoesAdicionais=endereco.informacoesAdicionais,
        cliente_id=endereco.cliente_id,
    )
    db.add(db_endereco)
    db.commit()
    db.refresh(db_endereco)
    return db_endereco


def update_endereco(
    db: Session, endereco: schemas.Endereco
):
    """Se o pedido de evidencia existir, altera ele no banco"""
    db_endereco = (
        db.query(Endereco)
        .filter(Endereco.id == endereco.id)
        .first()
    )

    if db_endereco:
        db_endereco.rua=endereco.rua,
        db_endereco.numero=endereco.numero,
        db_endereco.bairro=endereco.bairro,
        db_endereco.cidade=endereco.cidade,
        db_endereco.estado=endereco.estado,
        db_endereco.codigoPostal=endereco.codigoPostal
        db_endereco.informacoesAdicionais=endereco.informacoesAdicionais
        db_endereco.cliente_id=endereco.cliente_id
        db.commit()
        db.refresh(db_endereco)

    return db_endereco


def delete_endereco(db: Session, id: int):
    """Se o pedido de evidencia existir, deleta ele do banco"""
    db_endereco = (
        db.query(Endereco).filter(Endereco.id == id).first()
    )

    if db_endereco:
        db.delete(db_endereco)
        db.commit()

    return db_endereco

