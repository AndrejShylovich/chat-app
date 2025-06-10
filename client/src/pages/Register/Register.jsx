import { Col, Row, Form, Stack, Button, Alert } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Register() {
    console.log("Register: рендер страницы регистрации")

    const {registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading} = useContext(AuthContext)
    return (
        <Form onSubmit = {registerUser}>
            <Row>

            </Row>
            <Col>
                <Stack>
                    <h2>Register</h2>
                    <Form.Control type="text" placeholder="Name" onChange={(e)=>updateRegisterInfo({...registerInfo, username: e.target.value})}/>
                    <Form.Control type="text" placeholder="Email" onChange={(e)=>updateRegisterInfo({...registerInfo, email: e.target.value})}/>
                    <Form.Control type="text" placeholder="Password" onChange={(e)=>updateRegisterInfo({...registerInfo, password: e.target.value})}/>
                    <Button variant="primary" type="submit">
                        {isRegisterLoading ? "Creating your account" : "Register"}
                    </Button>
                    {registerError?.error && <Alert variant="danger"><p>{registerError?.message}</p></Alert>}
                </Stack>
            </Col>
        </Form>
    );
}

export default Register;