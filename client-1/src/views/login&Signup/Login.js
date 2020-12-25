import React, { useState } from "react";
import Signup from "./Signup";
import { Container, Col, Form, FormGroup, Input, Button } from "reactstrap";
import "./login.css";

/* const hosting = "54.232.154.61"; */
/* const hosting = "localhost"; */
const hosting = "192.168.0.3";

const Login = (props) => {
  //almaceno el dato ingresado en el input
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  //verifico si el usuario existe en la base de datos y lo almaceno en el estado
  const [user, setUser] = useState(null);
  //si el usuario no existe, almaceno solo el email
  const [newUser, setNewUser] = useState(null);
  //manejo del error en el request
  const [error, setError] = useState(null);
  //manejo de la carga mientras se hace la peticion
  const [isLoaded, setIsLoaded] = useState(false);

  //tomo los datos (email y password) ingresado en el imput y lo almaceno en el estado, para luego, en el submit, hacer la peticion y verificar si existe el mail en la base de datos
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  //verifico si el mail existe en la base de datos
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://${hosting}:3050/users/${data.email}`)
      .then((res) => {
        if (res.status === 200) {
          res.json().then((result) => {
            //mientras carga la llamada muestro el componente loader, para eso debe estar en true
            setIsLoaded(true);
            setUser(result[0]);
          });
        } else if (res.status === 204) {
          setNewUser(data.email);
        }
      })
      .catch((error) => {
        console.log(error);
        //mientras carga la llamada muestro el componente loader, para eso debe estar en true
        setIsLoaded(true);
        //si el error existe muestro el componente error
        setError(error);
      });
    e.target.reset();
  };
  const validate = (e) => {
    e.preventDefault();
    if (data.password === user.password) {
      console.log("la contraseña es correcta");
      props.validate(user);
    } else {
      console.log("la contraseña no es correcta");
    }
    e.target.reset();
  };

  if (!user && !newUser) {
    return (
      <Container className="login">
        <h2 className="login-title">Welcome to Control Finances App!</h2>
        <Form className="form" onSubmit={handleSubmit}>
          <Col>
            <FormGroup>
              <h5 className="login-subtitle">Please, enter your email</h5>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Button className="login-button">Submit</Button>
        </Form>
      </Container>
    );
  } else if (user) {
    return (
      <Container className="login">
        <h2 className="login-title">Welcome to Control Finances App!</h2>
        <Form className="form" onSubmit={validate}>
          <Col>
            <FormGroup>
              <h5 className="login-subtitle">Please, enter your password</h5>
              <Input
                type="password"
                name="password"
                placeholder="*******"
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Button className="login-button">Submit</Button>
        </Form>
      </Container>
    );
  } else if (newUser) {
    return <Signup newUser={newUser} user={(item) => setUser(item)} />;
  }
};

export default Login;
