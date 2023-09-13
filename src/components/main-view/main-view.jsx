
import { useState, useEffect } from "react";


import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";



export const MainView = () => {
   //localStorage.clear();
    const storedUser= JSON.parse(localStorage.getItem("user"));
    const storedToken= localStorage.getItem("token");
    const [movies, setMovies] = useState([]);

    const [user, setUser] = useState(storedUser ? storedUser: null);

    const [token, setToken] = useState(storedToken ? storedToken: null);
    const [searchField, setSearchField] = useState("");

    
    useEffect(() => {
        if(!token){
            return;
        }

        fetch("https://sbmovie-flix-81059d891de6.herokuapp.com/movies", 
        {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        _id: movie._id,
                        Title: movie.Title,
                        imageURL: movie.imageURL,
                        Genre: {
                            Name: movie.Genre.Name,
                            Description: movie.Genre.Description
                        },
                        Description: movie.Description,
                        Director: {
                            Name: movie.Director.Name,
                            Bio: movie.Director.Bio,
                            Birthday: movie.Director.Birthday
                        }
                };
                });
                setMovies(moviesFromApi);
            });
    }, [token]);

    return(
        <BrowserRouter>
          <NavigationBar
        user={user}
        movies={movies}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        /> 
        <Row>
            <Routes>
            <Route
                path= '/signup'
                element={
                <>
                    {user ? (
                        <Navigate to= '/' />
                    ):(
                        <Col md={5}>
                            <SignupView/>
                        </Col>
                    )}
                </>
                }
                />
            
            <Route 
                path = '/login' 
                element = {
                    <>
                    {user ? (
                        <Navigate to= '/' />
                    ):(
                        <Col md={5}>
                        <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        }}/>
                        </Col>
                    )}
                    </>
                }
                />
                <Route 
                path= '/movies/:Title'
                element= {
                    <>
                    {!user? (
                        <Navigate to= '/login' replace/>
                    ): movies.length===0 ? (
                        <Col>This list is Empty!</Col>
                    ):(
                        <Col md={8}>
                            <MovieView 
                            movies={movies} 
                            user={user}
                      setUser={setUser}
                      token={token}/>
                        </Col>
                    )}
                    </>
                } /> 
                
                
                <Route
                path = "/"
                element = {
                    <>
                    {!user ? (
                        <Navigate to= '/login' replace />
                    ): (
                        <>
                        
                           <Form className="d-flex" >
                            <Row className = "mt-3 mb-3">
                            <Col>
                            <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchField}
                            onChange={(e)=> setSearchField(e.target.value)}
                            required
                            />
                            </Col>
                            <Col>
                            <Button >
                             Search
                            </Button>
                            </Col>
                            </Row>
                             </Form>

                    {movies.length===0 ? (
                        <Col>The list is Empty!</Col>
                    ):(
                        movies.filter((
                            movie )=> 
                              
                                movie
                                .Title
                                .toLowerCase()
                                .includes(searchField.toLowerCase())
                              
                            
                          ).map((movie) => (
                              <Col className="mb-5 d-flex" key={movie.Title} xs={12} sm={6} md={4} lg={3}>
                              <MovieCard user={user} setMovies={setMovies} movie={movie} token={token} setuser={(user) =>{
                                setUser(user.user);
                             
                              }}  />
                              
                              </Col>
                        
                        ))
                        )}
                          </>
                          )}
                              </>
                            }
                      />
                      
                <Route path= '/profile' 
            element ={
                <>
                {!user ? (
                        <Navigate to= '/login' replace />
                    ): movies.length===0 ? (
                        <Col>The list is Empty!</Col>
                    ): (
                        <Col md={8}>
                    <ProfileView 
                user= {user} 
                token={token}
                    setUser={setUser}
                      movies={movies}
                      
                      /> 
                </Col>
                
                )
                    }</>}
                /> 
                
            </Routes>
        </Row>
        </BrowserRouter>
    );
};

/* 
{
                                
                                setSearch && (
                                movies
                                .filter(m => m.toLowerCase().includes(search.toLowerCase()))
                                .map((movie) => (
                                   
                            
                            
                                    <Col className="mb-5 d-flex" key={movie.Title} xs={12} sm={6} md={4} lg={3}>
                              <MovieCard user={user} setMovies={setMovies} movie={movie} token={token} setuser={(user) =>{
                                setUser(user.user);
                             
                              }}  />
                              
                              </Col>
                              )))
                              
                              
                              }

                              {
                             searchField && (
                                filteredMovies.map((movie) => 
                                (
                                    <Col className="mb-5 d-flex" key={movie.Title} xs={12} sm={6} md={4} lg={3}>
                              <MovieCard user={user} setMovies={setMovies} movie={movie} token={token} setuser={(user) =>{
                                setUser(user.user);
                             
                              }}  />
                              
                              </Col>
                              )))
                              
                              
                              }
*/