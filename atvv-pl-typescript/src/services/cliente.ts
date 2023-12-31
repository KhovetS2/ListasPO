export const getAllClientes =async () => {
    const response = await fetch('http://localhost:8000/clientes',
    {
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }
    )
    return await response.json()
}
export const getCliente =async (id:number) => {
    const response = await fetch(`http://localhost:8000/clientes/${id}`,
    {
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    return await response.json()
}