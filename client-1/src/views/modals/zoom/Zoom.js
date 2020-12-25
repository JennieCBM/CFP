import React from "react";
import { ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const Zoom = (props) => {
  if (props.object) {
    const { id, details, amount, email, created, type } = props.object;
    return (
      <>
        <ModalHeader>
          <h4>Operation ID: {id}</h4>
          <p>TYPE: {type}</p>
        </ModalHeader>
        <ModalBody>
          <p>DETAILS: {details}</p>
          <p>CREATED: {created}</p>
          <p>AMOUNT: ${amount}</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.closeModal}>Close</Button>
        </ModalFooter>
      </>
    );
  }
};
export default Zoom;
