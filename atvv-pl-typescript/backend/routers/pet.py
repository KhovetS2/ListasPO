from fastapi import APIRouter, Depends, HTTPException
from database import schemas
from sqlalchemy.orm import Session
from models import pet_crud
from database.database import get_db
from typing import Annotated, Optional

router = APIRouter(tags=["Pet"])


## Pedidos De Evidencia rotas


@router.get("/pet/{id}", response_model=Optional[schemas.Pet])
async def get_pet(
    id: int,
    db: Session = Depends(get_db),
):
    return pet_crud.get_pet(id=id, db=db)

@router.get("/pet", response_model=Optional[list[schemas.Pet]])
async def get_all_pet(
    db: Session = Depends(get_db),
):
    return pet_crud.get_all_pet( db=db)


@router.post("/pet/", response_model=Optional[schemas.Pet])
async def create_pet(
    pet: schemas.PetCreate,
    db: Session = Depends(get_db),
):
    return pet_crud.create_pet(
        db=db, pet=pet
    )


@router.put("/pet/", response_model=Optional[schemas.Pet])
async def update_pet(
    pet: schemas.Pet,
    db: Session = Depends(get_db),
):
    return pet_crud.update_pet(
        pet=pet, db=db
    )



@router.delete("/pet/{id}")
async def delete_pet(
    id: int,
    db: Session = Depends(get_db),
):
    return pet_crud.delete_pet(id=id, db=db)
