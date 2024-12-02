import Pagina from "../layout/Pagina";

import imagem404 from "../../Assests/Imagens/404.jpg"
export default function Tela404(props) {
    return (
        <Pagina>
            <container>
                <img src={imagem404} />
            </container>
        </Pagina>
    )
}