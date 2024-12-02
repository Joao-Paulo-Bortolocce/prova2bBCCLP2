import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Alert, Container, Spinner } from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import ESTADO from '../../../redux/estados'
import { incluirUsuario, atualizarUsuario } from '../../../redux/usuarioReducer';


export default function CadastroUsuario(props) {
    const { estado, mensagem } = useSelector(state => state.usuario)
    const dispachante = useDispatch();
    const [formValidado, setFormValidado] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity()) {
            if (props.modoEdicao) {
                dispachante(atualizarUsuario(props.usuario))
            }
            else {
                dispachante(incluirUsuario(props.usuario))
            }
            props.setUsuario({
                "id": 0,
                "nickname": "",
                "urlAvatar": "",
                "dataIngresso": "",
                "senha": "",
                "mensagens": []
            });
            props.setExibirUsuarios(true);
            props.setModoEdicao(false);
        }
        else {
            setFormValidado(true);
        }
        event.preventDefault();
        event.stopPropagation();
    };

    function manipularMudanca(event) {
        const id = event.currentTarget.id;
        const valor = event.currentTarget.value;
        props.setUsuario({ ...props.usuario, [id]: valor })
    }

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
                   
                    <Form noValidate validated={formValidado} onSubmit={handleSubmit} className='container'>
                        <Row className="mb-6">
                            <Form.Group as={Col} md="4" >
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="number" required id="id"
                                    disabled={true}
                                    value={props.usuario.id}
                                    onChange={manipularMudanca}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom05">
                                <Form.Label>nickname</Form.Label>
                                <Form.Control type="text" required value={props.usuario.nickname} onChange={manipularMudanca} id="nickname" />
                                <Form.Control.Feedback type="invalid">
                                    Por-Favor informe o nickname da usuario
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="5">
                                <Form.Label>Url do avatar</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="text"
                                        placeholder="url do seu avatar"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        id="urlAvatar"
                                        value={props.usuario.urlAvatar}
                                        onChange={manipularMudanca}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por-favor informe sua url do avatar
                                    </Form.Control.Feedback>
                                </InputGroup>
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

                            <Col md={1}><Button type="submit">{props.modoEdicao ? "Alterar" : "Cadastrar"}</Button></Col>
                            <Col md={{ offset: 1 }}>
                                <Button onClick={() => {
                                    props.setExibirUsuarios(true);
                                    props.setModoEdicao(false)
                                    props.setUsuario({
                                        "id": 0,
                                        "nickname": "",
                                        "urlAvatar": "",
                                        "dataIngresso": "",
                                        "senha": "",
                                        "mensagens": []
                                    })
                                }}>Voltar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            );
        }
}
