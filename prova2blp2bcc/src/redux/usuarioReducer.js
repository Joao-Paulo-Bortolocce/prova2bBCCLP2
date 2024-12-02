import { consultarUsuario, alterarUsuario, gravarUsuario, excluirUsuario, verificarSenha } from "../servicos/servicoUsuario"
import { createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estados.js";
import { createSlice } from "@reduxjs/toolkit";


export const buscarUsuario = createAsyncThunk('buscarUsuario', async (termo) => {
    const resultado = await consultarUsuario(termo);
    try {
        if (resultado.status) {
            return {
                "status": true,
                "mensagem": "Usuarios recuperados com sucesso",
                "listaDeUsuarios": resultado.listaUsuarios
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os usuarios",
                "listaDeUsuarios": []
            }
        }
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro :" + erro.message,
            "listaDeUsuarios": []
        }

    }
})

export const apagarUsuario = createAsyncThunk('apagarUsuario', async (usuario) => {
    const resultado = await excluirUsuario(usuario);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "id": usuario.id
        }
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro :" + erro.message,
        }

    }

});

export const incluirUsuario = createAsyncThunk('incluirUsuario', async (usuario) => {
    try {

        const resultado = await gravarUsuario(usuario);
        if (resultado.status) {
            usuario.id = resultado.id;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "usuario": usuario
            }
        }
        else {
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro :" + erro.message,
        }
    }

})
export const atualizarUsuario = createAsyncThunk('atualizarUsuario', async (usuario) => {
    try {

        const resultado = await alterarUsuario(usuario);
        if (resultado.status) {
            usuario.id = resultado.id;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "usuario": usuario
            }
        }
        else {
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro :" + erro.message,
        }
    }

})

export const confirmaSenha = createAsyncThunk('confirmaSenha', async (usuario) => {
    try {

        const resultado = await verificarSenha(usuario);
        if (resultado.status) {
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "correto": resultado.senhaCorreta
            }
        }
        else {
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro :" + erro.message,
        }
    }
})

const usuarioReducer = createSlice({
    name: "usuario",
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeUsuarios: [],
        senhaCorreta:false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarUsuario.pending, (state) => {
            state.estado = ESTADO.PENDENTE
            state.mensagem = "Processando requisição (buscando usuarios)"
        })
            .addCase(buscarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO
                    state.mensagem = action.payload.mensagem
                    state.listaDeUsuarios = action.payload.listaDeUsuarios
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem
                    state.listaDeUsuarios = action.payload.listaDeUsuarios
                }
            })
            .addCase(buscarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO
                state.mensagem = action.payload.mensagem
                state.listaDeUsuarios = action.payload.listaDeUsuarios
            })
            .addCase(apagarUsuario.pending, (state) => {
                state.estado = ESTADO.PENDENTE
                state.mensagem = "Processando requisição (excluindo o usuario)"
            })
            .addCase(apagarUsuario.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem
                if (action.payload.status) {

                    state.estado = ESTADO.OCIOSO
                    state.listaDeUsuarios = state.listaDeUsuarios.filter((item) => item.id !== action.payload.id)
                } else {
                    state.estado = ESTADO.ERRO
                }
            })
            .addCase(apagarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO
                state.mensagem = action.payload.mensagem
            })
            .addCase(incluirUsuario.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição (inclusão do usuario)"
            })
            .addCase(incluirUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeUsuarios.push(action.payload.usuario)
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;

            })
            .addCase(atualizarUsuario.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição (Atualização do usuario)"
            })
            .addCase(atualizarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeUsuarios = state.listaDeUsuarios.map((item) => item.id === action.payload.usuario.id ? action.payload.usuario : item)
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;

            })
            .addCase(confirmaSenha.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição (Confirmando a senha do usuario)"
            })
            .addCase(confirmaSenha.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.senhaCorreta= true
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(confirmaSenha.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;

            })
    }
})



export default usuarioReducer.reducer;