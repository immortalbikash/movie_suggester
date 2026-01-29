import React, { useEffect } from 'react'
import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import MovieNavbar from './MovieNavbar';
import Moviecard from './Moviecard';
import { Container, Form, Row } from 'react-bootstrap';

const Index = () => {
    const [movies, setMovies] = useState([]);

    const [isError, setIsError] = useState(false);

    const [searchErrorText, setSearchErrorText] = useState("");

    const [searchMovietext, setSearchMovieText] = useState("");

    const [loading, setLoading] = useState(false);

    const [firstRun, setFirstRun] = useState(true);



    const fetchMovies = async () => {

        setLoading(true)

        setSearchErrorText("")

        try {
            const response = await axios.get(`https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovietext}`);
            setMovies(response.data.moviesData);
            setIsError(false)
            setLoading(false)
            setFirstRun(false)
        }
        catch (err) {
            setIsError(true);
            setLoading(false)
            setFirstRun(false)
        }
        // console.log("Calling api. . .");

        // console.log(movies);
    }
    useEffect(() => {
        fetchMovies()
    }, [])

    useEffect(() => {

        if (!firstRun) {
            const fetchTimer = setTimeout(() => {

                if (searchMovietext.length > 2) {
                    fetchMovies()
                }
                else if (searchMovietext.length < 1) {
                    fetchMovies()
                }
                else {
                    setSearchErrorText("Please enter at least 3 character for searching.")
                }
            }, 500);

            //clean up function
            return () => {
                clearTimeout(fetchTimer);
            }
        }



    }, [searchMovietext])

    return (
        <>

            <MovieNavbar />

            {/* <div>
                <Link style={{ marginRight: "10px" }} to="/add">Add Movie</Link>
                {
                    localStorage.getItem("accessToken") ?
                        <>
                            <Link to="/profile"> Profile</Link>
                        </> : <>
                            <Link to="/login">Login</Link>
                        </>
                }
            </div > <br /> */}

            <div>
                {/* <input type="text" placeholder='Type Movie Title' value={searchMovietext} onChange={(e) => setSearchMovieText(e.target.value)} /> */}
                <Form.Control type="text" placeholder="Type Movie Title" value={searchMovietext} onChange={(e) => setSearchMovieText(e.target.value)} />
                <span style={{ color: "red", marginLeft: "10px" }}>{searchErrorText}</span>
            </div >

            <>
                {loading ?
                    <>
                        <Container className='text-center'>
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </Container>
                    </> : <> </>}
            </>

            {

                !loading && movies.length < 1 ? <> No Movies Found !</> : <Row>
                    {
                        movies.map((el => (
                            <Moviecard data={el} />
                            /* <div key={el.id}>
                        <Link to={`/view_movie/${el.id}`}>
                            <p style={{ fontWeight: "bold" }}>{el.name}</p>
                        </Link>
                        <img src={el.image} alt="" style={{ height: "100px" }} />
                        <p>Info: {el.info}</p>
                        <p>Rating: {el.rating}</p>
                        <br /><br />
                        <hr />
                    </div> */
                        )))
                    }

                </Row>

            }
        </>
    )
}

export default Index