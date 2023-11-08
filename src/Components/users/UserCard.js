import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function UserCard({ user }) {
  function hanldeUnFollow() {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/follow/unfollow`,
        { followingUserId: user._id },
        {
          headers: {
            blog_pro: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.location.href = "users";
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
  function hanldeFollow() {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/follow/follow`,
        { followingUserId: user._id },
        {
          headers: {
            blog_pro: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.location.href = "users";
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>{user.username}</Card.Text>
        <Card.Text>{user.email}</Card.Text>
        {user.follow ? (
          <Button variant="danger" onClick={hanldeUnFollow}>
            unfollow
          </Button>
        ) : (
          <Button variant="primary" onClick={hanldeFollow}>
            follow
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
