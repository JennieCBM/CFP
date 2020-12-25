import React from "react";
import { ModalHeader, ModalFooter, Button } from "reactstrap";

/* const hosting = "54.232.154.61"; */
/* const hosting = "localhost"; */
const hosting = "192.168.0.3";
const Delete = (props) => {
  const sendAndClose = async () => {
    try {
      let config = {
        method: "DELETE",
      };
      let res = await fetch(
        `http://${hosting}:3050/delete/${props.object.id}`,
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
      <ModalHeader>Are you shure you want to delete this record?</ModalHeader>
      <ModalFooter>
        <Button onClick={sendAndClose}>Yes</Button>
        <Button onClick={props.closeModal}>Cancel</Button>
      </ModalFooter>
    </>
  );
};
export default Delete;
