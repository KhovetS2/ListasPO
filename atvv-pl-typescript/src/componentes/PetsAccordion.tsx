import { Accordion, AccordionItem, AccordionButton, AccordionIcon, useToast, AccordionPanel, Box, Center, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import RealzarCompraModal from "./realizarCompraModal"
import { ChevronDownIcon } from "@chakra-ui/icons"
import EditarPet from "./EditarPet"
import Pet from "../models/Pet"
import { useState } from "react"
type props = {
    pets: Array<Pet>
}
const PetsAccordion: React.FC<props> = ({ pets }) => {
    const [petsArray, setPetsArray] = useState(pets)
    const toast = useToast()

    const deletarPet = async (e: React.MouseEvent, pet: Pet, index:number) => {
        e.preventDefault()
        const request = fetch(`http://localhost:8000/pet/${pet.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        toast.promise(request, {
            success: { title: 'Exclusão Realizada', description: 'Exclusão realizada com sucesso' },
            error: { title: 'Erro ao excluír', description: 'Ocorreu um erro ao realizar exclusão' },
            loading: { title: 'Excluíndo Pet', description: 'Por favor, espere' },
          })
        setPetsArray(petsArray.filter((petFilter, i)=> index!==i))
    }

    return (
        <Accordion allowToggle width={['100%', '80%', '70%']}>
            {petsArray.map((pet, index) => {

                
                return (
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='center'>
                                    {pet.nome}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Box
                                bgColor={'rgba(160, 54, 217, 0.87);'}
                                textColor={'white'}
                                padding={'0.5rem'}
                                mb={'0.5rem'}
                                borderRadius={'1rem'}
                            >
                                <h2>Tipo</h2>
                                {pet.tipo}
                            </Box>
                            <Box
                                bgColor={'rgba(160, 54, 217, 0.87);'}
                                textColor={'white'}
                                padding={'0.5rem'}
                                mb={'0.5rem'}
                                borderRadius={'1rem'}
                            >
                                <h2>Raça</h2>
                                {pet.raca}
                            </Box>
                            <Box
                                bgColor={'rgba(160, 54, 217, 0.87);'}
                                textColor={'white'}
                                padding={'0.5rem'}
                                mb={'0.5rem'}
                                borderRadius={'1rem'}
                            >
                                <h2>Gênero</h2>
                                {pet.genero}
                            </Box>
                            <Center>
                                <Menu>
                                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                        Ações
                                    </MenuButton>
                                    <MenuList>
                                        <EditarPet pet={pet} index={index} setPetsArray={setPetsArray} petsArray={petsArray} />
                                        <MenuItem onClick={(e)=>{deletarPet(e, pet, index)}}>Deletar Pet</MenuItem>
                                        <RealzarCompraModal pet={pet} />
                                    </MenuList>
                                </Menu>
                            </Center>
                        </AccordionPanel>
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}

export default PetsAccordion