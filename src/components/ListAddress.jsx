import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { AddressGet } from "../axios/AddresApi";

export const ListAddress = () => {
  const [Data, SetData] = useState([]);
  const [Edit, SetEdit] = useState(false);

  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
  });

  const [EditData, setEditData] = useState({
    Edit_nombre: "",
    Edit_apellido: "",
    Edit_telefono: "",
    Edit_direccion: "",
  });

  const HandleInputChange = (Event) => {
    Edit === false
      ? setDatos({ ...datos, [Event.target.name]: Event.target.value })
      : setEditData({ ...EditData, [Event.target.name]: Event.target.value });
  };

  //Get Event
  const GetData = async () => {
    const resp = await AddressGet.get("/contactos");
    SetData(resp["data"]);
  };

  useEffect(() => {
    GetData();
  }, []);

  /*delete Event*/
  const Delete = async (id) => {
    const resp = await AddressGet.delete(`/contactos/${id}`);
    if (resp.status === 200) {
      GetData();
    }
    console.log(resp);
  };

  //Post Event
  const SetFormButton = async () => {
    const resp = await AddressGet.post("/contactos", {
      nombre: datos["nombre"],
      apellido: datos["apellido"],
      telefono: datos["telefono"],
      direccion: datos["direccion"],
    });
    if (resp.status === 201) {
      GetData();
    }
  };

  /*put Event*/
  const GetDataEdit = async (ID) => {
    if (Edit === false) {
      SetEdit(!Edit);
    } else if (Edit === true) {
      SetDataEdit(ID);
    }
  };

  const SetDataEdit = async (id) => {
    console.log(id);
    const resp = await AddressGet.put(`/contactos/${id}`, {
      nombre: EditData["Edit_nombre"],
      apellido: EditData["Edit_apellido"],
      telefono: EditData["Edit_telefono"],
      direccion: EditData["Edit_direccion"],
    });
    if (resp.status === 200) {
      SetEdit(!Edit);
      GetData();
    }
  };

  return (
    <Container fluid>
      <Row className="roomfac fontReg">
        <Col xs={5} className="User">
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Nombre"
              onChange={HandleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              placeholder="apellido"
              onChange={HandleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>direccion</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              placeholder="Dirección"
              onChange={HandleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>telefono</Form.Label>
            <Form.Control
              type="number"
              name="telefono"
              placeholder="telefono"
              onChange={HandleInputChange}
            />
          </Form.Group>

          <Button variant="primary" onClick={() => SetFormButton()}>
            Enviar
          </Button>
        </Col>

        <Col sm={7}>
          <Table>
            {Data.length === 0 && <p>Cargando...</p>}
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Telefono</th>
                <th>Dirección</th>
                <th></th>
              </tr>
            </thead>
            {Data.map((p, i) => {
              return (
                <tbody key={i}>
                  <tr key={i}>
                    {Edit === false ? (
                      <React.Fragment>
                        <td>{p.nombre}</td>
                        <td>{p.apellido}</td>
                        <td>{p.telefono}</td>
                        <td>{p.direccion}</td>
                        <td>
                          <Button variant="danger" onClick={() => Delete(p.id)}>
                            Eliminar
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="warning"
                            onClick={() => GetDataEdit(p.id)}
                          >
                            Editar
                          </Button>
                        </td>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <td>
                          {" "}
                          <Form.Control
                            type="text"
                            name="Edit_nombre"
                            onChange={HandleInputChange}
                            placeholder={p.nombre}
                          />
                        </td>

                        <td>
                          <Form.Control
                            type="text"
                            name="Edit_apellido"
                            onChange={HandleInputChange}
                            placeholder={p.apellido}
                          />
                        </td>

                        <td>
                          <Form.Control
                            type="text"
                            name="Edit_telefono"
                            onChange={HandleInputChange}
                            placeholder={p.telefono}
                          />
                        </td>

                        <td>
                          <Form.Control
                            type="text"
                            name="Edit_direccion"
                            onChange={HandleInputChange}
                            placeholder={p.direccion}
                          />
                        </td>
                        <td>
                          <Button
                            variant="warning"
                            onClick={() => SetDataEdit(p.id)}
                          >
                            Guardar
                          </Button>
                        </td>
                      </React.Fragment>
                    )}
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
