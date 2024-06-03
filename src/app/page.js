"use client"
import Image from "next/image";
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from "react";
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as formik from 'formik';
import * as yup from 'yup';

export default function Home() {
  const { Formik } = formik;
  const [users, setUsers] = useState([]);
  let edit = false;
  // let values = {
  //   firstName: '',
  //   lastName: '',
  //   phone: '',
  //   email: '',
  //   city: '',
  //   state: '',
  //   zip: ''
  // };
  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    zip: ''
  });
  function loadUsers() {
    axios.get('/api/users')
      .then((res) => { setUsers(res.data); });
  }
  useEffect(() => {
    loadUsers();
  }, []);

  function handleEdit(e, user) {
    e.preventDefault();
    edit = true;
    console.log(user)
    setInitialValues(user)
    console.log('initialValues', initialValues);
  }

  function handleDelete(e, email) {
    e.preventDefault();
    let data = {
      email: email
    }
    axios.delete('/api/users', { data: data }).then(function (response) {
      loadUsers();
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup.number().required().test('len', 'Must be exactly 10 digits', val => String(val).length === 10),
    email: yup.string().required().email('Invalid email format'),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.number().required().test('len', 'Must be exactly 6 digits', val => String(val).length === 6)
  });

  function handleSubmit(e) {
    e.preventDefault();
    let data = {
      firstname: e.target.firstName.value,
      lastname: e.target.lastName.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      city: e.target.city.value,
      state: e.target.state.value,
      zip: e.target.zip.value,
    }
    if (edit != true) {
      if (data) {
        axios.post('/api/users', data).then(function (response) {
          loadUsers();
          // formik.resetForm();
          setInitialVales(values);
        })
          .catch(function (error) {
            console.log(error);
            // formik.resetForm();
          });
      }
    } else {
      axios.put('/api/users', data).then(function (response) {
        loadUsers();
        edit = false;
        // formik.resetForm();
      })
        .catch(function (error) {
          console.log(error);
          // formik.resetForm();
        });
    }
  }

  return (
    <div className="wrapper">
      <div className="d-flex p-2">
        <div className="col-5">
          <Formik
            validationSchema={schema}
            initialValues={initialValues}

          >
            {({ handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>

                <div className='m-2'>
                  <Form.Group as={Col} md="12">
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend" className='w-25'>First name</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="FirstName"
                        aria-describedby="inputGroupPrepend"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </div>

                <div className='m-2'>
                  <Form.Group as={Col} md="12">
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend" className='w-25' >Last name</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="last Name"
                        aria-describedby="inputGroupPrepend"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        isInvalid={!!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </div>
                <div className='m-2'>
                  <Form.Group as={Col} md="12">
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend" className='w-25' >Phone Number</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Phone Number"
                        aria-describedby="inputGroupPrepend"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        isInvalid={!!errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </div>
                <div className='m-2'>
                  <Form.Group as={Col} md="12">
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend" className='w-25'>Email</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Email"
                        aria-describedby="inputGroupPrepend"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </div>

                <div className='m-2'>
                  <Form.Group as={Col} md="12">
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend" className='w-25'>City</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="City"
                        aria-describedby="inputGroupPrepend"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        isInvalid={!!errors.city}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </div>

                <div className='m-2'>
                  <Form.Group as={Col} md="12">
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend" className='w-25'>State</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="State"
                        aria-describedby="inputGroupPrepend"
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        isInvalid={!!errors.state}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.state}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </div>

                <div className='m-2'>
                  <Form.Group as={Col} md="12">
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend" className='w-25'>Zip</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Zip"
                        aria-describedby="inputGroupPrepend"
                        name="zip"
                        value={values.zip}
                        onChange={handleChange}
                        isInvalid={!!errors.zip}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.zip}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </div>

                <div className='m-2'>
                  <Button type="submit">Submit form</Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-7">
          <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user?.firstname}</td>
                      <td>{user?.lastname}</td>
                      <td>{user?.email}</td>
                      <td>{user?.phone}</td>
                      <td>{user?.city}</td>
                      <td>{user?.state}</td>
                      <td>{user?.zip}</td>
                      <td><span onClick={(e) => handleEdit(e, user)} className="bi bi-pencil m-2"></span><span onClick={(e) => handleDelete(e, user?.email)} className="bi bi-trash m-2"></span></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
