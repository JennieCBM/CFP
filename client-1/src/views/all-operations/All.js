import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import Operation from "../../components/operations/Operation";
import "./all.css";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { Table, Card, CardTitle, CardBody, Modal } from "reactstrap";
import Delete from "../modals/delete/Delete";
import Zoom from "../modals/zoom/Zoom";
import Edit from "../modals/edit/Edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

/* const hosting = "54.232.154.61"; */
/* const hosting = "localhost"; */
const hosting = "192.168.0.3";

const All = (props) => {
  console.log(props);
  //almaceno el resultado del request
  const [items, setItems] = useState([]);
  //manejo de errores en el request
  const [error, setError] = useState(null);
  //manejo de la carga durante el request
  const [isLoaded, setIsLoaded] = useState(false);
  //contador para actualizar el useEffect y volver a ejecutar la peticion
  const [count, setCount] = useState(0);
  //manejo de la apertura y cierre de los modales
  const [modal, setModal] = useState(false);
  //almacenamiento del dato que esta siendo clickeado por el usuario
  const [object, setObject] = useState(null);
  //este estado me va a indicar que modal debo abrir
  const [wichModal, setWichModal] = useState(false);
  //Hook del history para volver a home
  let history = useHistory(); 

  //llamada a la api para mostrar la lista con todos los datos
  useEffect(() => {
    fetch(`http://${hosting}:3050/operations/user/${props.user.email}`)
      .then((res) => {
        if (res.status === 200) {
          res.json().then((result) => {
            //mientras carga la llamada muestro el componente loader, para eso debe estar en true
            setIsLoaded(true);
            //almaceno la respuesta en el estado correspondiente
            setItems(result);
          });
        } else if (res.status === 204) {
          setError(res.status);
        }
      })
      .catch((error) => {
        //mientras carga la llamada muestro el componente loader, para eso debe estar en true
        setIsLoaded(true);
        //si el error existe muestro el componente error
        setError(error);
      });
  }, [count]);
  //almacenamiento del dato que esta siendo clickeado por el usuario
  useEffect(() => {
    if (object) {
    }
  }, [object]);

  //el estado me va a indicar que modal debo abrir
  useEffect(() => {
    switch (wichModal) {
      case "zoom":
        setModal(!modal);
        break;
      case "delete":
        setModal(!modal);
        break;
      case "edit":
        setModal(!modal);
        break;
      default:
        
        break;
    }
  }, [wichModal]);

  if (error) {
    if (error === 204) {
      const redirect = () => {
        history.push("/")
      };
      return (
        <div className="main">
          <div className="card-container">
            <Card body className="card-add" onClick={redirect}>
              <CardTitle>
                You don't have any records yet, if do you want to add a new
                record, go to My Records.
              </CardTitle>
              <CardBody>
                  <FontAwesomeIcon className="back" icon={faLongArrowAltLeft} />
              </CardBody>
            </Card>
          </div>
        </div>
      );
    } else {
      return <Error />;
    }
  } else if (!isLoaded) {
    return <Loading />;
  } else {
    //funcion para abrir el modal que me permite ver cada operacion en detalle, eliminar o editar
    const toggle = (wichModal) => {
      //para abrir o cerrar el modal cambio el estado a true o false
      if (wichModal) {
        setWichModal(false);
      }
      setWichModal(wichModal);
    };
    const closeModal = () => {
      setModal(!modal);
      setWichModal(false);
    };
    return (
      <div className="main">
        {wichModal && (
          <Modal isOpen={modal}>
            {wichModal === "delete" && (
              <Delete
                closeModal={closeModal}
                object={object}
                reload={() => setCount(count + 1)}
              />
            )}
            {wichModal === "zoom" && (
              <Zoom closeModal={closeModal} toggle={toggle} object={object} />
            )}
            {wichModal === "edit" && (
              <Edit
                closeModal={closeModal}
                object={object}
                reload={() => setCount(count + 1)}
              />
            )}
          </Modal>
        )}
        <div className="all-title">
          <h2 className="title">All your records</h2>
        </div>
        <div className="lists">
          <div className="debit-list">
            <h4>Debit</h4>
            <Table className="table">
              <thead>
                <tr>
                  <th>CREATED</th>
                  <th>DETAILS</th>
                  <th>AMOUNT</th>
                  <th>EDIT</th>
                  <th>DELETE</th>
                </tr>
              </thead>
              <tbody>
                {items.map((operation) => {
                  if (operation.type === "debit") {
                    return (
                      <Operation
                        toggle={toggle}
                        objectSetter={setObject}
                        operation={operation}
                        key={operation.id}
                        allItems
                      />
                    );
                  }
                })}
              </tbody>
            </Table>
          </div>
          <div className="credit-list">
            <h4>Credit</h4>
            <Table className="table">
              <thead>
                <tr>
                  <th>CREATED</th>
                  <th>DETAILS</th>
                  <th>AMOUNT</th>
                  <th>EDIT</th>
                  <th>DELETE</th>
                </tr>
              </thead>
              <tbody>
                {items.map((operation) => {
                  if (operation.type === "credit") {
                    return (
                      <Operation
                        toggle={toggle}
                        objectSetter={setObject}
                        operation={operation}
                        key={operation.id}
                        allItems
                      />
                    );
                  }
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
};

export default All;
