import React, {useState} from "react";
import { Container, Col, Form, FormGroup, Input, Button } from "reactstrap";


/* const hosting = "54.232.154.61"; */
/* const hosting = "localhost"; */
const hosting = "192.168.0.3";

const Signin = (props) => {
  console.log(props.newUser);
  const [data, setData] = useState({
    email: props.newUser,
    name: "",
    password: ""
  });

  //almacenar nuevos datos en un objeto de configuracion que finalmente sera enviado en el Request metodo post para crear un nuevo usuario
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };
  //Funcion para crear el usuario y enviar el dato nuevamente al login 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      let res = await fetch(`http://${hosting}:3050/add/users`, config)
    } catch (error){
      alert(error);
    }
    props.user(data);
    e.target.reset();
  };

  return (
    <Container className="login">
      <h2 className="login-title">Sign In!</h2>
      <p className="yourEmail">{props.newUser}</p>
      <Form className="form" onSubmit={handleSubmit}>
        <Col>
          <FormGroup>
            <Input
              type="text"
              name="name"
              placeholder="Enter your Name"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password-2"
              placeholder="Repeat Your Password"
            />
          </FormGroup>
        </Col>
        <Button className="login-button">Submit</Button>
      </Form>
    </Container>
  );
};

export default Signin;
