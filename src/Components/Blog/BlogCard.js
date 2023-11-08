import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Form } from "react-bootstrap";
import { useState } from "react";

function BlogCard({ item, homepage }) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  console.log(item);
  function handleDelete() {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/blog/delete-blog/${item._id}`,
        {
          headers: {
            blog_pro: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        window.location.href = "/my-blogs";
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const blogObj = {
      blogid: item._id,
      title,
      textBody,
    };
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/blog/edit-blog`, blogObj, {
        headers: {
          blog_pro: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          window.location.href = "/my-blogs";
        }
      })
      .catch(() => {
        alert("error");
      });
  }

  return (
    <div style={{ margin: "30px" }}>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <p>{item.creationDateTime}</p>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>{item.textBody}</Card.Text>
          {!homepage && (
            <>
              <Button variant="primary" onClick={() => setEdit(!edit)}>
                Edit
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
      {edit && (
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
          <Button type="submit">Edit</Button>
        </Form>
      )}
    </div>
  );
}

export default BlogCard;
