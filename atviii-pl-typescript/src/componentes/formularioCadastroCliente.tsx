import React, { useState } from "react";
import { Box, Button, FormErrorMessage, FormLabel, Input, InputGroup, Stack } from "@chakra-ui/react";

type Props = {
    tema: string;
};

const FormularioCadastroCliente: React.FC<Props> = ({ tema }) => {
    const [nome, setNome] = useState<string>("");
    const [nomeSocial, setNomeSocial] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [rg, setRg] = useState<string>("");
    const [ddd, setDdd] = useState<string>("");
    const [numero, setNumero] = useState<string>("");
    const [isValid, setIsValid] = useState(true);

    const handleChangeEmail = (event: any) => {
        const inputValue = event.target.value;
        setEmail(inputValue);
        
        setIsValid(inputValue.includes('@'));
    };
    const cadastrarCliente = () => {
        
    };

    return (
        <div className="container-fluid">
            <form>
                <div className="input-group mb-3">
                    <Input
                        type="text"
                        className="form-control"
                        placeholder="Nome"
                        aria-label="Nome"
                        aria-describedby="basic-addon1"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className="input-group mb-3">
                    <Input
                        type="text"
                        className="form-control"
                        placeholder="Nome social"
                        aria-label="Nome social"
                        aria-describedby="basic-addon1"
                        value={nomeSocial}
                        onChange={(e) => setNomeSocial(e.target.value)}
                    />
                </div>
                <div className="input-group mb-3">
                    <InputGroup>
                        <Input
                            className="form-control"
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            value={email}
                            onChange={handleChangeEmail}
                            isInvalid={!isValid}
                        />
                        {!isValid && (
                            <FormErrorMessage>
                                O email deve conter o símbolo '@'.
                            </FormErrorMessage>
                        )}
                    </InputGroup>
                </div>
                <div className="input-group mb-3">
                    <Input
                        type="text"
                        className="form-control"
                        placeholder="RG"
                        aria-label="RG"
                        aria-describedby="basic-addon1"
                        value={rg}
                        onChange={(e) => setRg(e.target.value)}
                    />
                </div>
                <FormLabel>
                    <h3>
                        Endereço
                    </h3>
                </FormLabel>

                <Box
                    display={'flex'}

                    className="input-group mb-3"
                >
                    <Stack direction={'row'} flexWrap={'wrap'}>
                        <Input
                            type="string"
                            className="form-control"
                            placeholder="Rua"
                            aria-label="Rua"
                            aria-describedby="basic-addon1"
                            width={'25rem'}
                        />
                        <Input
                            type="string"
                            className="form-control"
                            placeholder="Número"
                            aria-label="Número"
                            aria-describedby="basic-addon1"
                            width={'8rem'}
                        />
                        <Input
                            type="string"
                            className="form-control"
                            placeholder="Bairro"
                            aria-label="Bairro"
                            aria-describedby="basic-addon1"
                            width={'10rem'}
                        />
                        <Input
                            type="string"
                            className="form-control"
                            placeholder="Cidade"
                            aria-label="Cidade"
                            aria-describedby="basic-addon1"
                            width={'10rem'}
                        />
                        <Input
                            type="string"
                            className="form-control"
                            placeholder="Estado"
                            aria-label="Estado"
                            aria-describedby="basic-addon1"
                            width={'10rem'}
                        />
                        <Input
                            type="string"
                            className="form-control"
                            placeholder="CEP"
                            aria-label="CEP"
                            aria-describedby="basic-addon1"
                            width={'10rem'}
                            maxLength={8}
                        />
                        <Input
                            type="string"
                            className="form-control"
                            placeholder="Informações Adicionais"
                            aria-label="Informações Adicionais"
                            aria-describedby="basic-addon1"
                            width={'15rem'}
                        />
                    </Stack>
                </Box>

                <FormLabel><h3>Telefone</h3></FormLabel>
                <div className="input-group mb-3">
                    <Stack direction={'row'}>
                        <Input
                            type="tel"
                            className="form-control"
                            placeholder="DDD"
                            aria-label="DDD"
                            aria-describedby="basic-addon1"
                            width={'20%'}
                            value={ddd}
                            onChange={(e) => setDdd(e.target.value)}
                        />
                        <Input
                            type="tel"
                            className="form-control"
                            placeholder="Número"
                            aria-label="Número"
                            aria-describedby="basic-addon1"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />
                    </Stack>
                </div>
                <div className="input-group mb-3">
                    <Button
                        colorScheme="green"
                        onClick={cadastrarCliente}
                    >
                        Cadastrar
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormularioCadastroCliente;
