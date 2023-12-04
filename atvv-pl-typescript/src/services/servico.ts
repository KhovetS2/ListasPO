export const getAllServicos =async () => {
    const response = await fetch('http://localhost:8000/servico',
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
export const getServico =async (id:number) => {
    const response = await fetch(`http://localhost:8000/servico/${id}`,
    {
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    return await response.json()
}