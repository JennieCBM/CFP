import React, { useState } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import "./add.css";

/* const hosting = "54.232.154.61"; */
/* const hosting = "localhost"; */
const hosting = "192.168.0.3";
const Add = (props) => {
  const [data, setData] = useState({
    details: "",
    amount: "",
    email: props.user, //recibe user
    type: "debit",
  });
  //funcion para recuperar los datos ingresados por el usuario en los imputs
  const handleInputChange = ({ name, value }) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  //funcion para enviar los datos ingresados y agregar una nueva operacion
  const send = async () => {
    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      let res = await fetch(`http://${hosting}:3050/add/operations`, config);
    } catch (error) {
      alert(error);
    }
    props.reload();
    props.toggle();
  };
  return (
    <>
      <ModalHeader className="add-header">
        <h3>Add a new operation</h3>
      </ModalHeader>
      <Form onSubmit={(event) => event.preventDefault()}>
        <ModalBody>
          <FormGroup>
            <Label for="type">TYPE:</Label>
            <Input
              type="select"
              name="type"
              id="type"
              onChange={(event) => handleInputChange(event.target)}
            >
              <option value={"debit"}>Debit</option>
              <option value={"credit"}>Credit</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="details">DETAILS</Label>
            <Input
              type="text"
              id="details"
              name="details"
              onChange={(event) => handleInputChange(event.target)}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="amount">AMOUNT</Label>
            <Input
              type="number"
              id="amount"
              name="amount"
              onChange={(event) => handleInputChange(event.target)}
            ></Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <FormGroup>
            <Button onClick={send} type="submit">
              <FontAwesomeIcon icon={faCheck} />
            </Button>
            <Button onClick={props.toggle}>
              <FontAwesomeIcon icon={faWindowClose} />
            </Button>
          </FormGroup>
        </ModalFooter>
      </Form>
    </>
  );
};
export default Add;
