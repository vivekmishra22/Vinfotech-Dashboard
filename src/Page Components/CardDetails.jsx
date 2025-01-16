import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';


const CardDetails = () => {

    const [userData, setUserData] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        showUsers()
    }, [])

    const showUsers = () => {
        axios.get(`http://localhost:8000/getdata`)
            .then(res => {
                setUserData(res.data.data)
            }).catch(err => {
                console.log(err);
            })
    }

    const deletedata = (id) => {
        axios.delete(`http://localhost:8000/deletedata/${id}`)
            .then(
                res => {
                    console.log('User Deleted : ', res.data);
                    alert('User Delete');
                    showUsers()
                }
            ).catch(error => {
                console.error('Error Deleting User : ', error);
            });
    }

    return (
        <>
            <Container>
                <Row>
                    <Col md={10} xs={12} className='my-5 mx-auto'>
                        <div className="d-flex justify-content-end mb-3">
                            <Button variant="primary" className='m-0 px-2 py-1'>
                                <Link to="/cardform" className='text-decoration-none text-white d-flex align-items-center'>
                                    <FaPlus className='me-2' />
                                    <span>Add Card</span>
                                </Link>
                            </Button>
                        </div>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Sr. No</th>
                                    <th>Card Title</th>
                                    <th>Card Description</th>
                                    <th>Images</th> 

                                    {/* <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>Gender</th>
                                    <th>Subject</th>
                                    <th>Images</th> */}
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.map((Course, id) => {
                                    return (
                                        <tr key={id}>
                                            <td>{id + 1}</td>
                                            <td>{Course.ctitle}</td>
                                            <td>{Course.ctext}</td>
                                            <td><img src={`http://localhost:8000/images/${Course.image}`} alt='' height={50} width={50}/></td>
                                            {/* <td>{Register.email}</td>
                                            <td>{Register.mobile}</td>
                                            <td>{Register.address}</td>
                                            <td>{Register.city}</td>
                                            <td>{Register.gender}</td>
                                            <td>{Register.subject}</td>
                                            <td></td> */}
                                            <td className='p-1 d-flex justify-content-center align-items-center'>
                                                <Button className='bg-transparent border-0' 
                                                onClick={() => {
                                                    navigate(`/CardUpdate/${Course._id}`);
                                                }}>
                                                    <FiEdit className='fs-5 text-warning' />
                                                </Button>
                                                <Button className='bg-transparent border-0' onClick={() => deletedata(Course._id)}>
                                                    <RiDeleteBin7Line className='fs-5 text-danger' />
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CardDetails;
