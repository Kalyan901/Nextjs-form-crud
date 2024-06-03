"use client"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from "react";
import axios from 'axios';

import * as yup from 'yup';
import { useFormik } from 'formik';

export default function Home() {
    const [emails, setEmails] = useState('');
    const [edits, setEdits] = useState(false)
    const [users, setUsers] = useState([]);
    let values = {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        city: '',
        state: '',
        zip: ''
    };
    const schema = yup.object().shape({
        firstname: yup.string().required(),
        lastname: yup.string().required(),
        phone: yup.number().required().test('len', 'Must be exactly 10 digits', val => String(val).length === 10),
        email: yup.string().required().email('Invalid email format'),
        city: yup.string().required(),
        state: yup.string().required(),
        zip: yup.number().required().test('len', 'Must be exactly 6 digits', val => String(val).length === 6)
    });
    const formik = useFormik({
        initialValues: values,
        validationSchema: schema,
        onSubmit: (values)=>{
            if (edits != true) {
                if (values) {
                    axios.post('/api/users', values).then(function (response) {
                        loadUsers();
                        formik.resetForm();
                        setEdits(false);
                        setInitialVales(values);
                    })
                        .catch(function (error) {
                            console.log(error);
                            formik.resetForm();
                        });
                }
            } else {
                let data = {
                    firstname: values.firstname,
                    lastname: values.lastname,
                    phone: values.phone,
                    email: values.email,
                    city: values.city,
                    state: values.state,
                    zip: values.zip,
                    oldemail: emails
                  }
                axios.put('/api/users', data).then(function (response) {
                    loadUsers();
                    setEdits(false);
                    setEmails('');
                    formik.resetForm();
                })
                    .catch(function (error) {
                        console.log(error);
                        formik.resetForm();
                    });
            }
        }
    })

    function loadUsers() {
        axios.get('/api/users')
            .then((res) => { setUsers(res.data); });
    }
    useEffect(() => {
        loadUsers();
    }, []);

    function handleEdit(e, user) {
        e.preventDefault();
        setEdits(true);
        formik.setValues(user);
        setEmails(user.email)
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
    
    return (
        <div className="wrapper">
            <div className="d-flex p-2">
                <div className="col-4">
                    {/* <Formik
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
                        value={initialValues.firstName}
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
                        value={initialValues.lastName}
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
                        value={initialValues.phone}
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
                        value={initialValues.email}
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
                        value={initialValues.city}
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
                        value={initialValues.state}
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
                        value={initialValues.zip}
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
          </Formik> */}
                    <form className="form" onSubmit={formik.handleSubmit}>
                        <div className="input-group mb-3 pe-2">
                            <span className="input-group-text w-50" id="basic-addon1">First Name</span>
                            <input type="text" className="form-control w-50" id="firstname" name="firstname" placeholder="firstname" aria-label="firstname" aria-describedby="basic-addon1" onChange={formik.handleChange} value={formik.values.firstname} />
                            <br />
                            {formik.touched.firstname && formik.errors.firstname ? (
                                <span className="text-danger">{formik.errors.firstname}</span>
                            ) : null}
                        </div>
                        <div className="input-group mb-3 pe-2">
                            <span className="input-group-text w-50" id="basic-addon1">Last Name</span>
                            <input type="text" className="form-control w-50" id="lastname" name="lastname" placeholder="lastName" aria-label="lastName" aria-describedby="basic-addon1" onChange={formik.handleChange} value={formik.values.lastname} />
                            <br />
                            {formik.touched.lastname && formik.errors.lastname ? (
                                <span className="text-danger">{formik.errors.lastname}</span>
                            ) : null}
                        </div>
                        <div className="input-group mb-3 pe-2">
                            <span className="input-group-text w-50" id="basic-addon1">Phone</span>
                            <input type="number" className="form-control w-50" id="phone" name="phone" placeholder="phone" aria-label="phone" aria-describedby="basic-addon1" onChange={formik.handleChange} value={formik.values.phone} />
                            <br />
                            {formik.touched.phone && formik.errors.phone ? (
                                <span className="text-danger">{formik.errors.phone}</span>
                            ) : null}
                        </div>
                        <div className="input-group mb-3 pe-2">
                            <span className="input-group-text w-50" id="basic-addon1">Email</span>
                            <input type="email" className="form-control w-50" id="email" name="email"  placeholder="email" aria-label="email" aria-describedby="basic-addon1" onChange={formik.handleChange} value={formik.values.email} />
                            <br />
                            {formik.touched.email && formik.errors.email ? (
                                <span className="text-danger">{formik.errors.email}</span>
                            ) : null}
                        </div>
                        <div className="input-group mb-3 pe-2">
                            <span className="input-group-text w-50" id="basic-addon1">City</span>
                            <input type="text" className="form-control w-50" id="city" name="city" placeholder="city" aria-label="city" aria-describedby="basic-addon1" onChange={formik.handleChange} value={formik.values.city} />
                            <br />
                            {formik.touched.city && formik.errors.city ? (
                                <span className="text-danger">{formik.errors.city}</span>
                            ) : null}
                        </div>
                        <div className="input-group mb-3 pe-2">
                            <span className="input-group-text w-50" id="basic-addon1">State</span>
                            <input type="text" className="form-control w-50" id="state" name="state" placeholder="state" aria-label="state" aria-describedby="basic-addon1" onChange={formik.handleChange} value={formik.values.state} />
                            <br />
                            {formik.touched.state && formik.errors.state ? (
                                <span className="text-danger">{formik.errors.state}</span>
                            ) : null}
                        </div>
                        <div className="input-group mb-3 pe-2">
                            <span className="input-group-text w-50" id="basic-addon1">Zip</span>
                            <input type="text" className="form-control w-50" id="zip" name="zip" placeholder="zip" aria-label="zip" aria-describedby="basic-addon1" onChange={formik.handleChange} value={formik.values.zip} />
                            <br />
                            {formik.touched.zip && formik.errors.zip ? (
                                <span className="text-danger">{formik.errors.zip}</span>
                            ) : null}
                        </div>

                        <button type='submit' className='btn btn-primary'>Submit</button>
                       
                    </form>
                </div>
                <div className="col-8">
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
