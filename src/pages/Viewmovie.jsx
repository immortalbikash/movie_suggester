import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import MovieNavbar from './MovieNavbar';
import { Button, Card, Container } from 'react-bootstrap';

const Viewmovie = () => {

    const [movie, setMovie] = useState({});

    const getParams = useParams();
    // console.log(getParams);
    const getID = getParams.id;

    const getSingleMovieInfo = async () => {

        try {
            const response = await axios.get(`https://api.dynoacademy.com/test-api/v1/movie/${getID}`);
            // console.log(response.data.singleMovieData);
            setMovie(response.data.singleMovieData);

            console.log(movie);
        }
        catch (error) {
            alert("Error occured", error)
        }

    }

    useEffect(() => {
        getSingleMovieInfo();
    }, [])

    return (
        <>
            <MovieNavbar />
            <Container>
                <h1 className='text-danger'>{movie.name} </h1> <br />
                <b>Info: </b> {movie.info} <br /> <br />
                <Card body>Desc: {movie.desc} </Card> <br />
                <Card body><img src={movie.image} alt="Image" style={{ width: "100px" }} /></Card> <br />
                <Card body><b>Rating: </b> {movie.rating}</Card> <br />
                <Link to="/"><Button>Go back!</Button></Link> 
            </Container>
        </>
    )
}

export default Viewmovie