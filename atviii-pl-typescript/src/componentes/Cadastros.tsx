import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react"
import FormularioCadastroCliente from "./formularioCadastroCliente"
import FormularioCadastroServiço from "./FormularioCadastroServiço";
import FormularioCadastroProduto from "./FormularioCadastroProduto";

type Props = {
    tema: string;
};

const Cadastros: React.FC<Props>  = ({tema}) => {
    return (
        <Box>
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                Cadastrar Cliente
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <FormularioCadastroCliente tema={tema} />
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                Cadastro Produto
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <FormularioCadastroProduto />
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                Cadastro Serviço
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <FormularioCadastroServiço />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    )
}

export default Cadastros