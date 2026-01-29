import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = () => {

    const history = useHistory();

    const email_ref = useRef();
    const password_ref = useRef();

    const [showModel, setShowModel] = useState(false);
    const [modelText, setModelText] = useState("");



    const loginHandler = async (e) => {

        e.preventDefault()

        const loginData = {
            "email": email_ref.current.value,
            "password": password_ref.current.value

        }

        try {
            const response = await axios.post("https://api.dynoacademy.com/test-api/v1/login", loginData);
            const getAccessToken = response.data.accessToken;   //getting access token  
            localStorage.setItem("accessToken", getAccessToken);    //saving access token in local storage
            console.log(response.data);
            alert(response.data.status)
            history.replace("/");
        }
        catch (error) {
            // alert(error.response.data.errors[0].message)
            setModelText(error.response.data.errors[0].message)
            setShowModel(true);
        }
    }

    return (
        <>
            <Container>
                <h3>Login</h3>
                <form action="" onSubmit={loginHandler}>
                    {/* Email: <br />
                    <input type="text" ref={email_ref} name="" id="" /><br /> <br /> */}


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" autoComplete={false} ref={email_ref} />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>


                    {/* Password: <br />
                    <input type="password" ref={password_ref} name="" id="" /> <br /> <br /> */}


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={password_ref} />
                    </Form.Group>

                    <Button variant="dark" type='submit'>
                        Login
                    </Button>


                    {/* <button>Login</button> */}
                </form>
            </Container>

            <Modal show={showModel} onHide={() => { setShowModel(false) }}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>{modelText}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowModel(false) }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Login