import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import { AddressGet } from '../axios/AddresApi'
import useForm from '../hook/useForm'
import ContactItem from './ContactItem'

const initialState = {
  nombre: '',
  apellido: '',
  telefono: '',
  direccion: ''
}

export const ListAddress = () => {
  const { handleInputChange, values } = useForm({ initialState })

  const [Data, SetData] = useState([])

  //Get Event
  const GetData = async () => {
    const resp = await AddressGet.get('/contactos')
    SetData(resp['data'])
  }

  useEffect(() => {
    GetData()
  }, [])

  /*delete Event*/
  const Delete = async id => {
    const resp = await AddressGet.delete(`/contactos/${id}`)
    if (resp.status === 200) {
      GetData()
    }
  }

  //Post Event
  const SetFormButton = async () => {
    const resp = await AddressGet.post('/contactos', values)
    if (resp.status === 201) {
      GetData()
    }
  }

  const SetDataEdit = async data => {
    const resp = await AddressGet.put(`/contactos/${data?.id}`, data)
    if (resp.status === 200) {
      GetData()
    }
  }

  return (
    <Container fluid>
      <Row className='roomfac fontReg'>
        <Col xs={5} className='User'>
          <Form.Group className='mb-3'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='text'
              name='nombre'
              placeholder='Nombre'
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>apellido</Form.Label>
            <Form.Control
              type='text'
              name='apellido'
              placeholder='apellido'
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>direccion</Form.Label>
            <Form.Control
              type='text'
              name='direccion'
              placeholder='Dirección'
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>telefono</Form.Label>
            <Form.Control
              type='number'
              name='telefono'
              placeholder='telefono'
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant='primary' onClick={() => SetFormButton()}>
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

            {Data.map((contact, i) => {
              return (
                <ContactItem
                  key={i}
                  contactData={contact}
                  addToDatabase={SetDataEdit}
                  contactDelete={Delete}
                />
              )
            })}
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
