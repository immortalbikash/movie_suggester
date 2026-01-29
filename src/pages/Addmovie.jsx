import axios from 'axios';
import React, { useRef } from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import MovieNavbar from './MovieNavbar';
import { Button, Container, Form } from 'react-bootstrap';

const Addmovie = () => {

    const history = useHistory();

    const movie_name_ref = useRef();
    const rating_ref = useRef();
    const desc_ref = useRef();



    const addMovieHandler = async (e) => {
        e.preventDefault();

        const movieData = {
            "movie_name": movie_name_ref.current.value,
            "rating": rating_ref.current.value,
            "description": desc_ref.current.value
        };

        try {
            const response = await axios.post("https://api.dynoacademy.com/test-api/v1/movies", movieData, {
                timeout: 10000  //10 sec samma respond gayena bhani error pathako
                //this is optional and its good to do this
            });
            console.log(response.data);
            alert(response.data.message)
            history.replace("/")

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

    return (
        <>

            <MovieNavbar /> <br />
            <Container>
                <form onSubmit={addMovieHandler}>
                    {/* Movie Name <br />
                    <input type="text" placeholder='Movie name' ref={movie_name_ref} /> <br /><br /> */}

                    <Form.Control type="text" placeholder="Movie Name" ref={movie_name_ref} /> <br />

                    {/* Movie Rating <br />
                    <input type="text" placeholder='Rating' ref={rating_ref} /> <br /> <br /> */}
                    <Form.Control type="text" placeholder="Movie Rating" ref={rating_ref} /> <br />

                    {/* Description <br />
                    <textarea name="" id="" ref={desc_ref}></textarea> <br /> <br /> */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} ref={desc_ref} />
                    </Form.Group>

                    {/* <button>Add a Movie</button> */}
                    <Button variant="dark" type="submit">
                        Add a Movie
                    </Button>

                </form>
            </Container>
        </>
    )
}

export default Addmovie