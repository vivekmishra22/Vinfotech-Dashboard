import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CardUpdate = () => {

  const Navigate = useNavigate();
  const { _id } = useParams();
  const [ctitle, setCtitle] = useState("");
  const [ctext, setCtext] = useState("");
  const [image, setCimage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/getuserdata/${_id}`)
      .then(res => {
        const data = res.data.userData;
        setCtitle(data.ctitle || "");
        setCtext(data.ctext || "");
        setCimage(data.image || "");
        // setName(data.fname || "");
        // setEmail(data.email || "");
        // setPassword(data.password || "");
        // setMobile(data.mobile || "");
        // setAddress(data.address || "");
        // setCity(data.city || "");
        // setGender(data.gender || "");
        // setSubject1(data.subject1 || "");
        // setSubject2(data.subject2 || "");
        // setImage(data.image || "");
      }).catch(err => {
        console.log(err);
      });
  }, [_id]);

  function handleSubmit(e) {
    e.preventDefault();

    // const userData = {

    //   ctitle,
    //   ctext

    // };

    const userData = new FormData()
    userData.append('ctitle', ctitle)
    userData.append('ctext', ctext)
    userData.append('image', image)

    axios.put(`http://localhost:8000/putdata/${_id}`, userData)
      .then(res => {
        console.log("Response:", res.data);
        alert('Data Updated Successfully!!');
        setCtitle("");
        setCtext("");
        setCimage(null);
      })
      .catch(err => {
        console.log(err);
      });

    Navigate("/carddetails");          // Navigate to home after the operation
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={8} className='mx-auto my-5'>
            <div className="border-top border-5 border-primary"></div>
            <Form className='form-control' onSubmit={handleSubmit}>
              <h2 className='text-center'>CARD FORM</h2>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Card Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter card title"
                  value={ctitle}
                  required
                  onChange={(e) => setCtitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Card Text</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  value={ctext}
                  required
                  onChange={(e) => setCtext(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" name="file"
                  onChange={(e) => setCimage(e.target.files[0])} />
              </Form.Group>

              <Button className='w-100' variant="primary" type="submit">
                Submit
              </Button>

            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CardUpdate;
