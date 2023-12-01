export const getAllClientes =async () => {
    const response = await fetch('http://localhost:32831/cliente/clientes')
    return await response.json()
}