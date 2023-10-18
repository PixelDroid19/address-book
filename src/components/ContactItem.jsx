import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import useForm from '../hook/useForm'

const initialState = {
  nombre: '',
  apellido: '',
  telefono: '',
  direccion: ''
}

const ContactItem = ({
  contactData = {},
  addToDatabase = () => {},
  contactDelete,
  isLoading = false
}) => {
  const [Edit, SetEdit] = useState(false)
  const { handleInputChange, values, setValues } = useForm({ initialState })

  useEffect(() => {
    setValues(contactData)
  }, [contactData, setValues])

  const targetToEdit = id => {
    const editData = { ...values, id }
    SetEdit(false)
    addToDatabase(editData)
  }

  return (
    <>
      <tbody>
        <tr>
          {Edit === false ? (
            <>
              <td>{values.nombre}</td>
              <td>{values.apellido}</td>
              <td>{values.telefono}</td>
              <td>{values.direccion}</td>
              <td>
                <Button
                  variant='danger'
                  onClick={() => contactDelete(values.id)}
                >
                  Eliminar
                </Button>
              </td>
              <td>
                <Button
                  variant='warning'
                  onClick={() => SetEdit(prev => !prev)}
                >
                  Editar
                </Button>
              </td>
            </>
          ) : (
            <>
              <td>
                {' '}
                <Form.Control
                  type='text'
                  name='nombre'
                  value={values.nombre}
                  onChange={handleInputChange}
                />
              </td>

              <td>
                <Form.Control
                  type='text'
                  name='apellido'
                  value={values.apellido}
                  onChange={handleInputChange}
                />
              </td>

              <td>
                <Form.Control
                  type='text'
                  name='telefono'
                  value={values.telefono}
                  onChange={handleInputChange}
                />
              </td>

              <td>
                <Form.Control
                  type='text'
                  name='direccion'
                  value={values.direccion}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <Button
                  variant='warning'
                  onClick={() => targetToEdit(values.id)}
                >
                  Guardar
                </Button>
              </td>
            </>
          )}
        </tr>
      </tbody>
    </>
  )
}

export default ContactItem
