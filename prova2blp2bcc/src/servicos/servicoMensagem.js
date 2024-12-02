const urlBase= "https://backend-bcc-2-b.vercel.app/mensagem";

export async function gravarMensagem(mensagem,usuario){
    const resposta = await fetch(urlBase,{
        "method": "POST",
        "headers":{
            "Content-type":"application/json"
        },
        "body":JSON.stringify(mensagem,usuario)
    })
    const resultado = await resposta.json();
    return await resultado;
}

export async function alterarMensagem(mensagem){
    const resposta = await fetch(urlBase,{
        "method": "PUT",
        "headers":{
            "Content-type":"application/json"
        },
        "body":JSON.stringify(mensagem)
    })
    const resultado = await resposta.json();
    return resultado;
    
}

export async function excluirMensagem(mensagem){
    const resposta = await fetch(urlBase,{
        "method": "DELETE",
        "headers":{
            "Content-type":"application/json"
        },
        "body":JSON.stringify(mensagem)
    })
    const resultado = await  resposta.json();
    return resultado;
    
}

export async function consultarMensagem(busca){
    const resposta = await fetch(urlBase+'/'+busca,{
        "method": "GET",
    })
    const resultado =await  resposta.json();
    return resultado;
    
}
