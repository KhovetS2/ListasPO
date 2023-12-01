import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box, Center, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import RealzarCompraModal from "./realizarCompraModal"
import { ChevronDownIcon } from "@chakra-ui/icons"
import EditarPet from "./EditarPet"

const PetsAccordion = () => {
    return (
        <Accordion allowToggle width={['100%', '80%', '70%']}>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='center'>
                            Adebaldo
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
                        Toy
                    </Box>
                    <Box
                        bgColor={'rgba(160, 54, 217, 0.87);'}
                        textColor={'white'}
                        padding={'0.5rem'}
                        mb={'0.5rem'}
                        borderRadius={'1rem'}
                    >
                        <h2>Raça</h2>
                        Poodle
                    </Box>
                    <Box
                        bgColor={'rgba(160, 54, 217, 0.87);'}
                        textColor={'white'}
                        padding={'0.5rem'}
                        mb={'0.5rem'}
                        borderRadius={'1rem'}
                    >
                        <h2>Gênero</h2>
                        Masculino
                    </Box>
                    <Center>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                Ações
                            </MenuButton>
                            <MenuList>
                                <EditarPet />
                                <MenuItem>Deletar Pet</MenuItem>
                                <RealzarCompraModal />
                            </MenuList>
                        </Menu>
                    </Center>
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='center'>
                            Clorinde
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
                        Grande
                    </Box>
                    <Box
                        bgColor={'rgba(160, 54, 217, 0.87);'}
                        textColor={'white'}
                        padding={'0.5rem'}
                        mb={'0.5rem'}
                        borderRadius={'1rem'}
                    >
                        <h2>Raça</h2>
                        Poodle
                    </Box>
                    <Box
                        bgColor={'rgba(160, 54, 217, 0.87);'}
                        textColor={'white'}
                        padding={'0.5rem'}
                        mb={'0.5rem'}
                        borderRadius={'1rem'}
                    >
                        <h2>Gênero</h2>
                        Masculino
                    </Box>
                    <Center>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                Ações
                            </MenuButton>
                            <MenuList>
                                <EditarPet />
                                <MenuItem>Deletar Pet</MenuItem>
                                <RealzarCompraModal />
                            </MenuList>
                        </Menu>
                    </Center>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default PetsAccordion