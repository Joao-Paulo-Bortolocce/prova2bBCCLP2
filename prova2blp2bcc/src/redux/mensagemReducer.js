import { consultarMensagem,alterarMensagem, gravarMensagem, excluirMensagem } from "../servicos/servicoMensagem"
import { createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estados.js";
import { createSlice } from "@reduxjs/toolkit";

export const buscarMensagem = createAsyncThunk('buscarMensagem',async(termo)=>{
    const resultado = await consultarMensagem(termo);
    try{
        if(resultado.status){
            return {
                "status": true,
                "mensagem": "Mensagems recuperados com sucesso",
                "listaDeMensagem":resultado.listaMensagens
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os mensagens",
                "listaDeMensagem": []
            }
        }
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro :" + erro.message,
            "listaDeMensagem": []
        }

    }
})

export const apagarMensagem= createAsyncThunk('apagarMensagem', async (mensagem)=>{
    const resultado = await excluirMensagem(mensagem);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "id":mensagem.id
        }
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro :" + erro.message,
        }
    
    }

});

export const incluirMensagem = createAsyncThunk('incluirMensagem', async (mensagem,usuario) =>{
    try{

        const resultado = await gravarMensagem(mensagem,usuario);
        if(resultado.status){
            mensagem.id = resultado.id;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "mensagem":mensagem
            }
        }
        else{
             return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
            }
        }
    }
    catch(erro){
        return{
            "status": false,
           "mensagem": "Erro :" + erro.message,
        }
    }

})
export const atualizarMensagem = createAsyncThunk('atualizarMensagem', async (mensagem) =>{
    try{

        const resultado = await alterarMensagem(mensagem);
        if(resultado.status){
            mensagem.id = resultado.id;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "mensagem":mensagem
            }
        }
        else{
             return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
            }
        }
    }
    catch(erro){
        return{
            "status": false,
           "mensagem": "Erro :" + erro.message,
        }
    }

})

const mensagemReducer = createSlice({
    name: "mensagem",
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeMensagem: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarMensagem.pending, (state) => {
            state.estado=ESTADO.PENDENTE
            state.mensagem= "Processando requisição (buscando mensagens)"
        })
        .addCase(buscarMensagem.fulfilled, (state, action) => { 
                if(action.payload.status){
                    state.estado=ESTADO.OCIOSO
                    state.mensagem=action.payload.mensagem
                    state.listaDeMensagem=action.payload.listaDeMensagem
                }
                else{
                    state.estado=ESTADO.ERRO;
                    state.mensagem=action.payload.mensagem
                    state.listaDeMensagem=action.payload.listaDeMensagem
                }
            })
            .addCase(buscarMensagem.rejected, (state, action) => {
                state.estado=ESTADO.ERRO
                state.mensagem=action.payload.mensagem
                state.listaDeMensagem=action.payload.listaDeMensagem
            })
            .addCase(apagarMensagem.pending, (state)=>{
                state.estado = ESTADO.PENDENTE
                state.mensagem = "Processando requisição (excluindo o mensagem)"
            })
            .addCase(apagarMensagem.fulfilled, (state,action)=>{
                state.mensagem= action.payload.mensagem
                if(action.payload.status){
                    
                    state.estado=ESTADO.OCIOSO
                    state.listaDeMensagem = state.listaDeMensagem.filter((item)=> item.id !== action.payload.id)
                }else{
                    state.estado=ESTADO.ERRO
                }
            })
            .addCase(apagarMensagem.rejected, (state,action)=>{
                state.estado=ESTADO.ERRO
                state.mensagem= action.payload.mensagem
            })
            .addCase(incluirMensagem.pending,(state)=>{
                state.estado=ESTADO.PENDENTE;
                state.mensagem="Processando a requisição (inclusão do mensagem)"
            })
            .addCase(incluirMensagem.fulfilled,(state,action)=>{
                if(action.payload.status){
                    state.estado= ESTADO.OCIOSO;
                    state.mensagem= action.payload.mensagem;
                    state.listaDeMensagem.push(action.payload.mensagem)
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem= action.payload.mensagem;
                }
            })
            .addCase(incluirMensagem.rejected,(state,action)=>{
                state.estado=ESTADO.ERRO;
                state.mensagem= action.payload.mensagem;

            })
            .addCase(atualizarMensagem.pending,(state)=>{
                state.estado=ESTADO.PENDENTE;
                state.mensagem="Processando a requisição (Atualização do mensagem)"
            })
            .addCase(atualizarMensagem.fulfilled,(state,action)=>{
                if(action.payload.status){
                    state.estado= ESTADO.OCIOSO;
                    state.mensagem= action.payload.mensagem;
                    state.listaDeMensagem = state.listaDeMensagem.map((item)=> item.id === action.payload.mensagem.id ? action.payload.mensagem : item)
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem= action.payload.mensagem;
                }
            })
            .addCase(atualizarMensagem.rejected,(state,action)=>{
                state.estado=ESTADO.ERRO;
                state.mensagem= action.payload.mensagem;

            })
    }
})



export default mensagemReducer.reducer;