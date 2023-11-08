import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../Components/Blog/BlogCard";

const MyBlogs = () => {
  const [myBlog, setMyBlog] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/blog/get-user-Blog`, {
        headers: {
          blog_pro: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.data.status === 200) {
          setMyBlog(res.data.data);
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

  return (
    <div>
      <h1>My Blog</h1>
      <div>
        {myBlog.map(
          (item) => !item.isDeleted && <BlogCard item={item} homepage={false} />
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
