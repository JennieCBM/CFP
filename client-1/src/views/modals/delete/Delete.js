import React from "react";
import { ModalHeader, ModalFooter, Button } from "reactstrap";

const hosting = "54.232.154.61";
const Delete = (props) => {
  const sendAndClose = async () => {
    console.log(props);
    try {
      let config = {
        method: "DELETE",
      };
      let res = await fetch(
        `https://cors-anywhere.herokuapp.com/http://${hosting}:3050/delete/${props.object.id}`,
        config
      );
      console.log(props.object.id);
    } catch (error) {
      console.log(error);
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
