import Cabecalho from "./Cabecalho"
import Menu from "./Menu"
import { Container } from "react-bootstrap"

export default function Pagina(props){



    return(
        <>
            <Container>
                <Cabecalho texto="BATE PAPO FIPP" />
                <Menu/>
                {
                    props.children
                }
            </Container>
        </>
    )
}

//React router doom