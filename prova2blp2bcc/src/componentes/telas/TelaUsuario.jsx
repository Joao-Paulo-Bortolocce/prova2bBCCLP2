import { useState } from "react";
import { Container, Alert } from "react-bootstrap";
import TabelaUsuarios from "./tabelas/TabelaUsuarios";
import CadastroUsuario from "./formularios/CadastroUsuarios";
import Pagina from "../layout/Pagina";


export default function TelaUsuario() {
    const [exibirUsuarios, setExibirUsuarios] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuario, setUsuario] = useState({
        "id": 0,
        "nickname": "",
        "urlAvatar": "",
        "dataIngresso": "",
        "senha":"",
        "mensagens": []
    })

    return(
        <Container>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center">
                        <h2>Usuarios</h2>
                </Alert>
                {exibirUsuarios? <TabelaUsuarios setExibirUsuarios={setExibirUsuarios} setModoEdicao={setModoEdicao} setUsuario={setUsuario}/>
                :<CadastroUsuario setExibirUsuarios={setExibirUsuarios} setModoEdicao={setModoEdicao} setUsuario={setUsuario}
                modoEdicao={modoEdicao} usuario={usuario}/> }
            </Pagina>
        </Container>
    )
}