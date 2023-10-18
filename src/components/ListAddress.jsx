import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { apiClient } from '../axios/AddresApi';
import useForm from '../hook/useForm';
import ContactItem from './ContactItem';

const ListAddress = () => {
  const initialState = {
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: '',
  };

  // Custom hook for form handling
  const { handleInputChange, values, setValues } = useForm({
    initialState
  });

  // State for storing contact data
  const [data, setData] = useState([]);

  // Function to fetch contact data from the API
  const fetchContactData = async () => {
    try {
      const response = await apiClient.get('/contactos');
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
    }
  };

  // Function to delete a contact
  const deleteContact = async (id) => {
    try {
      const response = await apiClient.delete(`/contactos/${id}`);
      if (response.status === 200) {
        fetchContactData();
      } else {
        console.error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
    }
  };

  // Function to create a contact
  const createContact = async () => {
    try {
      const response = await apiClient.post('/contactos', values);
      if (response.status === 201) {
        setValues(initialState);
        fetchContactData();
      } else {
        console.error(`Failed to create contact with status: ${response.status}`);
      }
    } catch (error) {
      console.error(`An error occurred while creating the contact: ${error.message}`);
    }
  };

  // Function to update a contact
  const updateContact = async (data) => {
    try {
      const response = await apiClient.put(`/contactos/${data?.id}`, data);
      if (response.status === 200) {
        fetchContactData();
      } else {
        console.error(`Failed to update contact with status: ${response.status}`);
      }
    } catch (error) {
      console.error(`An error occurred while updating the contact: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  return (
    <Container fluid>
      <Row className='roomfac fontReg'>
        <Col xs={5} className='User'>
        <Form.Group className='mb-3'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='text'
              value={values?.nombre}
              name='nombre'
              placeholder='Nombre'
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type='text'
              name='apellido'
              value={values?.apellido}
              placeholder='Apellido'
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type='text'
              value={values?.direccion}
              name='direccion'
              placeholder='Dirección'
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type='number'
              name='telefono'
              value={values?.telefono}
              placeholder='Teléfono'
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant='primary' onClick={createContact}>
            Enviar
          </Button>
        </Col>

        <Col sm={7}>
          <Table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Telefono</th>
                <th>Dirección</th>
                <th></th>
              </tr>
            </thead>

            {data.map((contact, i) => (
              <ContactItem
                key={i}
                contactData={contact}
                addToDatabase={updateContact}
                contactDelete={deleteContact}
              />
            ))}
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ListAddress;
