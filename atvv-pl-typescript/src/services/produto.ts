export const getAllProdutos =async () => {
    const response = await fetch('http://localhost:8000/produto',
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
export const getProduto =async (id:number) => {
    const response = await fetch(`http://localhost:8000/produto/${id}`,
    {
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    return await response.json()
}