import React, { useState, useEffect } from "react";
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

/* const hosting = "54.232.154.61"; */
/* const hosting = "localhost"; */
const hosting = "192.168.0.3";

const Add = (props) => {
  const [data, setData] = useState({
    details: props.object.details,
    amount: props.object.amount,
  });

  //funcion para recuperar los datos ingresados por el usuario en los imputs
  const handleInputChange = ({ name, value }) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  
  //funcion para enviar los datos ingresados y editar la operacion
  const sendAndClose = async () => {
    try {
      let config = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      let res = await fetch(
        `http://${hosting}:3050/update/${props.object.id}`,
        config
      );
    } catch (error) {
      alert(error);
    }
    props.reload();
    props.closeModal();
  };

  return (
    <>
      <ModalHeader>
        <h3>Edit record N°: {props.object.id}</h3>
      </ModalHeader>
      <Form onSubmit={(event) => event.preventDefault()}>
        <ModalBody>
          <h4>Type of operation: {props.object.type}</h4>
          <FormGroup>
            <Label for="details">DETAILS: </Label>
            <Input
              type="textarea"
              id="details"
              name="details"
              onChange={(event) => handleInputChange(event.target)}
              placeholder={props.object.details}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="amount">AMOUNT: $</Label>
            <Input
              type="number"
              id="amount"
              name="amount"
              onChange={(event) => handleInputChange(event.target)}
              placeholder={props.object.amount}
            ></Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <FormGroup>
            <Button onClick={sendAndClose} type="submit">
              <FontAwesomeIcon icon={faCheck} />
            </Button>
            <Button onClick={props.closeModal}>
              <FontAwesomeIcon icon={faWindowClose} />
            </Button>
          </FormGroup>
        </ModalFooter>
      </Form>
    </>
  );
};
export default Add;
