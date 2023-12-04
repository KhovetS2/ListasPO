import { Button, Box, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormLabel, Select, ModalFooter, ModalOverlay, useDisclosure, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, MenuItem } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import Pet from "../models/Pet"
import { Produto } from "../models/Produto"
import { Servico } from "../models/Servico"
import { getAllProdutos } from "../services/produto"
import { getAllServicos } from "../services/servico"
import { compraProduto, compraServico } from "../services/compra"


type props = {
    pet: Pet
}

const RealzarCompraModal: React.FC<props> = ({pet}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [tipoCompra, setTipoCompra] = useState('')
    const [produtos, setProdutos] = useState(new Array<Produto>())
    const [servicos, setServicos] = useState(new Array<Servico>())
    const [itemId, setItemId] = useState(0)
    const [quatidade, setQuatidade] = useState(0)

    useEffect(() => {
      (async () => {
        const allProdutos: Produto[] = await getAllProdutos()
        const allServicos: Servico[] = await getAllServicos()
        setProdutos(allProdutos)
        setServicos(allServicos)
      })()
    
      return () => {
        
      }
    }, [])
    
    const comprar =async (e:React.MouseEvent) => {
        if (tipoCompra==="Produto") {
            await compraProduto({
                cliente_id:pet.cliente_id,
                raca:pet.raca,
                tipo:pet.tipo,
                produto_id:itemId,
                quatidade
            })
        } else {
            await compraServico({
                cliente_id:pet.cliente_id,
                raca:pet.raca,
                tipo:pet.tipo,
                servico_id:itemId,
                quatidade
            })
        }
        setTipoCompra('')
        setItemId(0)
        setQuatidade(0)
        onClose()
    }
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )
    return (
        <>
            <MenuItem onClick={onOpen}>Realizar Compra de Itens</MenuItem>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <OverlayOne />

                <ModalContent>
                    <ModalHeader>Realizar Compra</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box mb={'1rem'}>
                            <FormLabel>Tipo da Compra</FormLabel>
                            <Select placeholder='Selecione o que vai comprar'
                                value={tipoCompra}
                                onChange={(e) => { setTipoCompra(e.target.value) }}
                            >
                                <option value='Produto'>Produto</option>
                                <option value='Serviço'>Serviço</option>
                            </Select>
                        </Box>
                        <Box mb={'1rem'}>
                            <FormLabel>Tipo da Compra</FormLabel>
                            <Select placeholder={`Selecione o ${tipoCompra} vai comprar`}
                            value={itemId}
                            onChange={(e)=>{
                                setItemId(Number.parseInt(e.target.value))
                                
                            }}
                            >
                                {tipoCompra === "Produto" && (
                                    <>
                                    {produtos.map((produto)=>{
                                        return(
                                            <option value={produto.id} key={produto.id}>{produto.nome}</option>
                                        )
                                    })}
                                    </>
                                )}
                                {tipoCompra === "Serviço" && (
                                    <>
                                        {servicos.map((servico)=>{
                                        return(
                                            <option value={servico.id} key={servico.id}>{servico.nome}</option>
                                        )
                                    })}
                                    </>
                                )}
                            </Select>
                        </Box>
                        <Box>
                        <FormLabel>Quantidade</FormLabel>
                        <NumberInput defaultValue={1} min={1}>
                            <NumberInputField value={quatidade} onChange={(e)=>{setQuatidade(Number.parseInt(e.target.value))}}/>
                        </NumberInput>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={comprar} mr={'0.5rem'} colorScheme="green">Comprar</Button>
                        <Button onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default RealzarCompraModal