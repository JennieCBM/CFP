import React, { useState, useEffect } from "react";
import Operation from "../../components/operations/Operation";
import "./home.css";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import Add from "../modals/add/Add";
import { Card, CardTitle, Row, Col, Table, Modal, CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const hosting = "54.232.154.61";

const Home = () => {
  //almaceno el resultado del request
  const [items, setItems] = useState([]);
  //manejo del error en el request
  const [error, setError] = useState(null);
  //manejo de la carga mientras se hace la peticion
  const [isLoaded, setIsLoaded] = useState(false);
  //contador para actualizar el useEffect y volver a ejecutar la peticion
  const [count, setCount] = useState(0);
  //manejo de la apertura y cierre de los modales
  const [modal, setModal] = useState(false);

  //llamada de tipo get para traerme todas las operaciones
  useEffect(() => {
    fetch(`http://${hosting}:3050/operations`)
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
  if (error) {
    if (error === 204) {
      const toggle = () => {
        //para abrir o cerrar el modal cambio el estado a true o false
        setModal(!modal);
      };
      return (
        <div className="main">
          <Modal isOpen={modal}>
            <Add
              toggle={() => toggle()}
              reload={() => {
                setCount(count + 1);
                window.location.reload();
              }}
            />
          </Modal>
          <div className="card-container">
            <Card body className="card-add" onClick={toggle}>
              <CardTitle>
                You don't have any records yet, do you want to add a new record?
              </CardTitle>
              <CardBody>
                <FontAwesomeIcon className="plus" icon={faPlus} />
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
    //funcion para el balance
    const addUp = (n) => {
      const amounts = n.map((item) => item.amount);
      const total = amounts.reduce((a, b) => a + b, 0);
      return total;
    };
    const debitItems = items.filter((item) => item.type.includes("debit"));
    const creditItems = items.filter((item) => item.type.includes("credit"));
    const debit = addUp(debitItems);
    const credit = addUp(creditItems);
    const balance = credit - debit;

    //funcion para abrir el modal que me permite agregar una nueva operacion
    const toggle = (item) => {
      //para abrir o cerrar el modal cambio el estado a true o false
      setModal(!modal);
    };

    return (
      <div className="main">
        <Modal isOpen={modal}>
          <Add toggle={() => toggle()} reload={() => setCount(count + 1)} />
        </Modal>
        <div className="options">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>
                  Your Balance is:
                  <CardBody className={balance < 0 ? "grey" : "green"}>
                    ${balance}
                  </CardBody>
                </CardTitle>
              </Card>
            </Col>
            <Col sm="6">
              <Card body onClick={toggle}>
                <CardTitle>Add an operation</CardTitle>
                <CardBody>
                  <FontAwesomeIcon className="plus" icon={faPlus} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <h2 className="title">Your last 10 records</h2>
        <Table className="table table-home">
          <thead>
            <tr>
              <th>TYPE</th>
              <th>CREATED</th>
              <th>DETAILS</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 10).map((operation) => (
              <Operation
                toggle={(item) => toggle(item)}
                operation={operation}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
};

export default Home;
