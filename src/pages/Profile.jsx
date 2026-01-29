import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import MovieNavbar from './MovieNavbar';
import { Button, Container, Modal } from 'react-bootstrap';

const Profile = () => {

    const [userData, setUserData] = useState({});
    const history = useHistory();

    const [showModel, setShowModel] = useState(false);

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        const getAccessToken = localStorage.getItem("accessToken");
        try {
            const response = await axios.get("https://api.dynoacademy.com/test-api/v1/me", {
                timeout: 10000,
                headers: {
                    Authorization: `Bearer ${getAccessToken}`
                },
            });
            console.log(response.data.data);
            setUserData(response.data.data);
            // alert(response.data.message)
            // history.replace("/")

        }
        catch (error) {
            if (error.response) {
                console.log(error.response.data.errors[0].message)
                alert(error.response.data.errors[0].message);
            }
            else {
                alert("Timeout . . .try again later!")
            }

        }
    }

    const logout = () => {
        setShowModel(true);
        // history.replace("/");
        // localStorage.removeItem("accessToken");
    }

    return (
        <>
            <MovieNavbar />
            {/* <Link to="/">Home</Link> <br /> */}
            <br />
            <Container>
                Name: {userData.name} <br />
                Email: {userData.email} <br />
                Country: {userData.country} <br /> <br />
                {/* <button onClick={logout}>Logout</button> */}
                <Button variant="danger" type="button" onClick={logout}>
                    Logout
                </Button>
            </Container>

            <Modal show={showModel} onHide={() => { setShowModel(false) }} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowModel(false) }}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => {
                        history.replace("/")
                        localStorage.removeItem("accessToken")
                    }}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>



        </>
    )
}

export default Profile