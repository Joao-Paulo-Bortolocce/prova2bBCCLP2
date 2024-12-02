import { buscarUsuario } from "../../redux/usuarioReducer";
import Pagina from "../layout/Pagina";
import { useSelector, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from "react";
import { confirmaSenha } from "../../redux/usuarioReducer";


export default function Validacao(props) {
    const { estado, mensagem, listaDeUsuarios, senhaCorreta } = useSelector(state => state.usuario)
    const dispachante = useDispatch();
    
    const [formValidado, setformValidado] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity()) {
            dispachante(confirmaSenha(props.usuario));
            if(senhaCorreta){
                dispachante(buscarUsuario(props.usuario.nickname))
                props.setUsuario(listaDeUsuarios[0]);
                props.setLogado(true);
            }
        }
        else
            setformValidado(true);
        event.preventDefault();
        event.stopPropagation();

    };

    function manipularMudanca(event) {
        const id = event.currentTarget.id;
        const valor = event.currentTarget.value;
        props.setUsuario({ ...props.usuario, [id]: valor })
    }
    return (
        <Pagina>


            <Form noValidate validated={formValidado} onSubmit={handleSubmit} className='container'>
                <Row className="mb-6">
                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label>nickname</Form.Label>
                        <Form.Control type="text" required value={props.usuario.nickname} onChange={manipularMudanca} id="nickname" />
                        <Form.Control.Feedback type="invalid">
                            Por-Favor informe o nickname da usuario
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-6">
                    <Form.Group as={Col} md="4" controlId="validationCustom05">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="text" required value={props.usuario.senha} onChange={manipularMudanca} id="senha" placeholder='******' />
                        <Form.Control.Feedback type="invalid">
                            Por-Favor informe a senha da usuario
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        label="Concordo com os termos de uso"
                        feedback="Você tem que concordar antes de finalizar o cadastro"
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Row>
                    <Col md={1}><Button type="submit">validar</Button></Col>
                </Row>
            </Form>
        </Pagina>
    )
}