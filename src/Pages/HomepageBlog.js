import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../Components/Blog/BlogCard";

const HomepageBlog = () => {
  const [homepageBlog, setHomepageBlog] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/blog/homepage-blog`, {
        headers: {
          blog_pro: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.data.status === 200) {
          setHomepageBlog(res.data.data);
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

  return (
    <div>
      <h1>My Blog</h1>
      {homepageBlog.length > 0 ? (
        <div>
          {homepageBlog.map(
            (item) =>
              !item.isDeleted && <BlogCard item={item} homepage={true} />
          )}
        </div>
      ) : (
        <div>
          <h1>please Follow any Users</h1>
        </div>
      )}
    </div>
  );
};

export default HomepageBlog;
