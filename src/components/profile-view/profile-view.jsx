import {useState, useEffect} from "react";


import { Form } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";



export const ProfileView = ({ setUser, user, movies, token}) => {
    

    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const [show, setShow] = useState(false);
    const [deregister, setDeregister] = useState(false);

    const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id))
    

        /* if (setUser!==null){
        return user.FavoriteMovies.includes(movies._id)
        }
       else{
        token=null;
        localStorage.clear();
       }
    }); 
 */
   
            
            


    // update user information
    const handleSubmit = () => {
        //event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://sbmovie-flix-81059d891de6.herokuapp.com/users/" + user.Username, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`}
           
            
            }).then((response) => {
                if (response.ok) {
                    response.json();
                    alert("Your account is updated");}
                else{ 
                    alert("update failed!");
                }})
            .then((data) => {
                if (data) {
                    //localStorage.setItem("user", JSON.stringify(data));
                    setUser(data);
                    
                }
            })
        };
    
    // delete user
    const deleteUser = (e) => {
        e.preventDefault();

       

        fetch("https://sbmovie-flix-81059d891de6.herokuapp.com/users/" + user.Username, {
            method: "DELETE",
           
            headers: {
               
                Authorization: `Bearer ${token}`}
           
            
            }).then((response) => {
                if (response.ok) {
                    alert("Deregister successful!")
                   /* localStorage.clear();
                    window.location.reload(); */
                    
                } else {
                    alert("Deregister failed!")
                }
            })
            
    }

     
    //remove favorite
    
    const removeFavorite = (_id) => {
       
        fetch("https://sbmovie-flix-81059d891de6.herokuapp.com/users/" + user.Username + "/movies/" + _id, {
            method: "DELETE",
            headers: {
               
                Authorization: `Bearer ${token}`}
           
            
            }).then((response) => {
                if (response.ok) {
                    alert("Movie removed!");
                    window.location.reload();   
                } else {
                    alert("Movie failed to be removed!")
                }
            })


    }
    

   

    return (
        
        <>
        <Card className="w-80 h-75" >
             
            <Card.Body>
                <Card.Title>User Information</Card.Title>
                <Card.Text>User: {username}</Card.Text>
                <Card.Text>Email: {email}</Card.Text>
                <Card.Text>Birthday: {birthday}</Card.Text>
                <Card.Text>Favorite Movies:</Card.Text>
                <Card.Text>   {favoriteMovies.map((movie) => (
                    <>
                    <Col>{movie.Title} 
                    <Button onClick={() => removeFavorite(movie._id)}>remove favorite</Button> 
                    </Col>
                    </> 
                ))}</Card.Text>
            </Card.Body>
            
        </Card> 
      
        


<b>Update user information</b>
<p></p>
<Col md={5}>
<Form className="form" onSubmit={handleSubmit}>
    <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
           // required
            minLength="3"
        />
    </Form.Group>
    <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            //required
        />
    </Form.Group>
    <Form.Group>
        <Form.Label>Email:</Form.Label>.
        <Form.Control type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           // required
        />
    </Form.Group>
    <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
           // required 
           />
    </Form.Group>
    
    <Button variant="primary" type="submit">Submit</Button>
    
</Form>
</Col>

<Form className="button" onClick={deleteUser}>
<Button >Deregister</Button>
</Form>

</>
          )
                }

                //<Button onClick={removeFavorite()}>x</Button> 