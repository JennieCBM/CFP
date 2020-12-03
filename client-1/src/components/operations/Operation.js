import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./operation.css";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

const Operation = (props) => {
  //para evitar que se abran dos modales a la vez (el de zoom + delete || edit) uso este estado, si el usuario hace click a un boton esta propiedad es true, entonces no abro el zoom, cada vez que hago click a un boton la seteo a true, y cuando clickee en cualquier otra parte del componente, esta propiedad sera false
  const [isAButton, setIsAButton] = useState(null);

  //abrir el modal correspondiente
  useEffect(() => {
    if (isAButton) {
      if (isAButton === "delete") {
        setterObject();
        props.toggle("delete");
        setIsAButton(null);
      } else if (isAButton === "edit") {
        setterObject();
        props.toggle("edit");
        setIsAButton(null);
      } else if (isAButton === "zoom") {
        setterObject();
        props.toggle("zoom");
        setIsAButton(null);
      }
    }
  }, [isAButton]);

  const setterObject = () => {
    const { id, details, amount, email, created, type } = props.operation;
    const childrenObject = {
      id,
      details,
      amount,
      email,
      created,
      type,
    };
    props.objectSetter(childrenObject);
  };

  return (
    <tr
      className={props.allItems ? "operations" : "operations-home"}
      onClick={() => setIsAButton("zoom")}
    >
      {!props.allItems && (
        <th scope="row">{props.operation.type.toUpperCase()}</th>
      )}
      <td id={props.operation.id}>{props.operation.created}</td>
      <td className="details" id={props.operation.id}>
        {props.operation.details}
      </td>
      <td className="amount" id={props.operation.id}>
        {props.operation.type === "debit" ? "-" : ""} ${props.operation.amount}
      </td>
      {props.allItems && (
        <th id={props.operation.id}>
          <Button
            id={props.operation.id}
            name="edit"
            onClick={(e) => {
              e.stopPropagation();
              setIsAButton("edit");
            }}
            function="edit"
          >
            <FontAwesomeIcon name="edit" icon={faEdit} />
          </Button>
        </th>
      )}
      {props.allItems && (
        <th id={props.operation.id}>
          <Button
            id={props.operation.id}
            name="delete"
            onClick={(e) => {
              e.stopPropagation();
              setIsAButton("delete");
            }}
          >
            <FontAwesomeIcon name="delete" icon={faTrashAlt} />
          </Button>
        </th>
      )}
    </tr>
  );
};
export default Operation;
