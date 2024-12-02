const urlBase= "https://backend-bcc-2-b.vercel.app/usuario";

export async function gravarUsuario(usuario){
    const resposta = await fetch(urlBase,{
        "method": "POST",
        "headers":{
            "Content-type":"application/json"
        },
        "body":JSON.stringify(usuario)
    })
    const resultado = await resposta.json();
    return await resultado;
}

export async function alterarUsuario(usuario){
    const resposta = await fetch(urlBase,{
        "method": "PUT",
        "headers":{
            "Content-type":"application/json"
        },
        "body":JSON.stringify(usuario)
    })
    const resultado = await resposta.json();
    return resultado;
    
}

export async function excluirUsuario(usuario){
    const resposta = await fetch(urlBase,{
        "method": "DELETE",
        "headers":{
            "Content-type":"application/json"
        },
        "body":JSON.stringify(usuario)
    })
    const resultado = await  resposta.json();
    return resultado;
    
}

export async function consultarUsuario(busca){
    const resposta = await fetch(urlBase+'/'+busca,{
        "method": "GET",
    })
    const resultado =await  resposta.json();
    return resultado;
    
}

export async function verificarSenha(usuario){
    const resposta = await fetch(urlBase+'/verificarSenha',{
        "method": "POST",
        "headers":{
            "Content-type":"application/json"
        },
        "body":JSON.stringify(usuario)
    })
    const resultado = await resposta.json();
    return resultado;
}