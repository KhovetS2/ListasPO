from pydantic import BaseModel
from datetime import date
from typing import List, Optional
from fastapi import WebSocket



class EnderecoBase(BaseModel):
    rua: str
    numero: str
    bairro: str
    cidade: str
    estado: str
    codigoPostal: str
    informacoesAdicionais: str
    cliente_id: int

class EnderecoCreate(EnderecoBase):
    pass

class Endereco(EnderecoBase):
    id: int = 0
    
    class Config:
        from_attributes = True

class TelefoneBase(BaseModel):
    ddd: str
    numero: str
    cliente_id: int

class TelefoneCreate(TelefoneBase):
    pass

class Telefone(TelefoneBase):
    id: int = 0

    class Config:
        from_attributes = True


class ProdutoBase(BaseModel):
    nome: str
    valor: float

class ProdutoCreate(ProdutoBase):
    pass

class Produto(ProdutoBase):
    id: int = 0

    class Config:
        from_attributes = True


class ServicoBase(BaseModel):
    nome: str
    valor: float

class ServicoCreate(ServicoBase):
    pass

class Servico(ServicoBase):
    id: int = 0

    class Config:
        from_attributes = True


class PetBase(BaseModel):
    nome: str
    tipo: str
    raca: str
    genero: str
    cliente_id: int

class PetCreate(PetBase):
    pass

class Pet(PetBase):
    id: int

    class Config:
        from_attributes = True

class ClienteBase(BaseModel):
    nome: str
    nomeSocial: str
    email: str



class ClienteCreate(ClienteBase):
    telefones: List[TelefoneCreate] | None
    endereco: EnderecoCreate | None

class Cliente(ClienteBase):
    id: int
    telefones: List[Telefone] | None
    endereco: List[Endereco] | None
    pets: List[Pet] | None

    class Config:
        from_attributes = True


class CompraProdutoBase(BaseModel):
    cliente_id: int 
    produto_id: int
    raca: str
    tipo: str
    quatidade: int

class CompraProdutoCreate(CompraProdutoBase):
    pass

class CompraProduto(CompraProdutoBase):
    pass

    class Config:
        from_attributes = True

class CompraServicoBase(BaseModel):
    cliente_id: int 
    servico_id: int
    raca: str
    tipo: str
    quatidade: int

class CompraServicoCreate(CompraServicoBase):
    pass

class CompraServico(CompraServicoBase):
    pass

    class Config:
        from_attributes = True