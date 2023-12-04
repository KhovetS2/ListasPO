import { CompraProduto } from "../models/CompraProduto";
import { CompraServico } from "../models/CompraServico";

interface CreateCompraProduto {
    cliente_id: number,
    produto_id: number,
    raca: string,
    tipo: string,
    quatidade: number
}

export const compraProduto = async (body:CreateCompraProduto) => {
    let request = await fetch(`http://localhost:8000/compra_produto/${body.cliente_id}/${body.produto_id}/${body.raca}/${body.tipo}`)
    let data;
    if (request.ok) {
        data = await request.json()
        data.quatidade += body.quatidade
        request = await fetch('http://localhost:8000/compra_produto', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }else{

        request = await fetch('http://localhost:8000/compra_produto/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

    }
}
interface CreateCompraServico {
    cliente_id: number,
    servico_id: number,
    raca: string,
    tipo: string,
    quatidade: number
}

export const compraServico = async (body:CreateCompraServico) => {
    let request = await fetch(`http://localhost:8000/compra_servico/${body.cliente_id}/${body.servico_id}/${body.raca}/${body.tipo}`)
    let data;
    if (request.ok) {
        data = await request.json()
        data.quatidade += body.quatidade
        request = await fetch('http://localhost:8000/compra_servico', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }else{

        request = await fetch('http://localhost:8000/compra_servico/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

    }
}


export const getAllCompraServico =async () => {
    const response = await fetch('http://localhost:8000/compra_servico',
    {
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }
    )
    if (response.ok) {
        return await response.json()    
    }
    return new Array<CompraServico>()
}

export const getAllCompraProduto =async () => {
    const response = await fetch('http://localhost:8000/compra_produto',
    {
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }
    )
    if (response.ok) {
        return await response.json()    
    }
    return new Array<CompraServico>()
}

export const getAllCompraServicoByClienteId =async (cliente_id:number) => {
    const response = await fetch(`http://localhost:8000/compra_servico/cliente_id/${cliente_id}`,
    {
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }
    )
    if (response.ok) {
        return await response.json()    
    }
    return new Array<CompraServico>()
}

export const getAllCompraProdutoByClienteId =async (cliente_id:number) => {
    const response = await fetch(`http://localhost:8000/compra_produto/cliente_id/${cliente_id}`,
    {
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }
    )
    if (response.ok) {
        return await response.json()    
    }
    return new Array<CompraServico>()
}