import { useSelector, useDispatch } from 'react-redux'
import ESTADO from '../../redux/estados'
import { incluirMensagem, atualizarMensagem, apagarMensagem, buscarMensagem } from '../../redux/mensagemReducer';
import { Alert, Spinner, Button, Container, Form } from 'react-bootstrap'
import { useEffect } from 'react';
import { useState } from 'react';

export default function Mensagens(props) {
    const [usuario, setUsuario] = useState(props.usuario)
    const { estado, mensagem, listaDeMensagem } = useSelector(state => state.mensagem)
    const dispachante = useDispatch();
    const [validated, setValidated] = useState(false);
    const[msg,setMensagem] = useState('');

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() ) {
            dispachante(incluirMensagem(msg,usuario))
        }
        else{
            setValidated(true);

        }
        event.preventDefault();
        event.stopPropagation();
    };

    function deslogar(){
        props.setLogado(false)
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.id;
        const valor = evento.target.value;
        setMensagem({ ...msg, [elemento]: valor }); 
        console.log(`Componente : ${elemento} : ${valor}`)
      }

    useEffect(() => {
        dispachante(buscarMensagem(""));
    }, [dispachante]);

    if (estado === ESTADO.PENDENTE) {
        return (
            <div>

                <Spinner animation="border" role="status"></Spinner>
                <Alert variant="primary">{mensagem}</Alert>
            </div>
        )
    }
    else
        if (estado === ESTADO.ERRO) {
            return (
                <div>
                    <Alert variant="danger">{mensagem}</Alert>
                </div>
            )
        }
        else {
            return (
                <Container>
                    <h1>Mensagens</h1>
                    <Button onClick={()=>{
                        deslogar()
                    }}>Voltar</Button>
                        <Container>
                            {
                                listaDeMensagem?.map((mensagem) => {
                                    return (
                                        <div style={{ width: "100%", marginTop: "5px", marginBottom: "5px", border: "1px solid black", padding: "5px" }}>
                                            <p>{mensagem.mensagem}</p>

                                        </div>
                                    )
                                })
                            }
                        </Container>
                        <Container>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group  md="4" controlId="validationCustom01">
                                        <Form.Label>Mensagem: </Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            id='mensagem'
                                            name="mensagem"
                                            placeholder="Compartilhe sua mensagem conosco"
                                            onChange={manipularMudanca}
                                        />
                                    </Form.Group>
                                    
                                <Button type="submit">Enviar</Button>
                            </Form>
                        </Container>
                </Container>
            )
        }
}