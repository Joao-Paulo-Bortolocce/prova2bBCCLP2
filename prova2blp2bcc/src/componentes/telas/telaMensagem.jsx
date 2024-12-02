import { useState } from "react";
import { Container, Alert } from "react-bootstrap";
import Mensagens from "./Mensagens";
import Validacao from "./TesteValidacao";


export default function TelaMensagem() {
    const [logado, setLogado] = useState(false);
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
            
                
                {logado? <Mensagens setLogado={setLogado} usuario={usuario}/>
                :<Validacao setLogado={logado} setUsuario={setUsuario} usuario={usuario}/> }

        </Container>
    )
}