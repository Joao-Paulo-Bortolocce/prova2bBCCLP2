

export default function Cabecalho(props){
    return(
        <h1 className={"text-center"} variant="light">{props.texto || "Título não fornecido"}</h1>
    );
}