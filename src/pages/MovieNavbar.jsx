import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const MovieNavbar = () => {
    return (
        <>
            <Navbar className="bg-dark">
                <Container>
                    <Navbar.Brand href='#home' className='text-white'>
                        <Link to="/" className="text-white">Movie Suggester</Link></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Link className='text-white' style={{ marginRight: "10px" }} to="/add">Add Movie</Link>
                        </Navbar.Text>
                        <Navbar.Text>
                            {
                                localStorage.getItem("accessToken") ?
                                    <>
                                        <Link className='text-white' to="/profile"> Profile</Link>
                                    </> : <>
                                        <Link className='text-white' to="/login">Login</Link>
                                    </>
                            }
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default MovieNavbar