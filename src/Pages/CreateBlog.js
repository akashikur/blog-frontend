import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function CreateBlog() {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  });
  const [title, setTitle] = useState("");

  const [textBody, setTextBody] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const blogObj = {
      title,
      textBody,
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/blog/create-blog`, blogObj, {
        headers: {
          blog_pro: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.status === 201) {
          console.log(res);
          window.location.href = "/my-blogs";
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  return (
    <div style={{ margin: "50px" }}>
      <h1 style={{ marginBottom: "20px" }}>Create Blog</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="tile">
          <Form.Label>Tile</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tile"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="textBody">
          <Form.Label>Text Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter Text Body"
            onChange={(e) => setTextBody(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Create Blog</Button>
      </Form>
    </div>
  );
}

export default CreateBlog;
