import { useContext } from 'react';
import { Col, Row, Form, Stack, Button, Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';


function Login() {

    const {loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading} = useContext(AuthContext)
    
    return (
        <Form onSubmit={loginUser}>
            <Row>

            </Row>
            <Col>
                <Stack>
                    <h2>Login</h2>
                    <Form.Control type="text" placeholder="Email" onChange={(e)=>updateLoginInfo({...loginInfo, email: e.target.value})}/>
                    <Form.Control type="text" placeholder="Password" onChange={(e)=>updateLoginInfo({...loginInfo, password: e.target.value})}/>
                    <Button variant="primary" type="submit">
                        {isLoginLoading ? "Creating your account" : "Login"}
                    </Button>
                    {loginError?.error && <Alert variant="danger"><p>{loginError?.message}</p></Alert>}
                </Stack>
            </Col>
        </Form>
    );
}

export default Login;