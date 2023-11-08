import axios from "axios";
import React, { useEffect, useState } from "react";
import UserCard from "../Components/users/UserCard";

const Users = () => {
  const [users, setUsers] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/get-all-users`, {
        headers: {
          blog_pro: token,
        },
      })
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch(() => {
        alert("error");
      });
  }, []);
  return <div>{users && users.map((user) => <UserCard user={user} />)}</div>;
};

export default Users;
