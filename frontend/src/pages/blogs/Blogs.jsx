import React, { useState } from "react";
import SearchBlog from "./SearchBlog";
import { useFetchBlogsQuery } from "../../redux/features/blogs/blogsApi";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState({ search: "", category: "" });

  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => setQuery({ search, category });

  return (
    <div className="mt-16 container mx-auto">
      <SearchBlog
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />

      {isLoading && <Spinner />}

      {error && (
        <div className="text-red-500 text-center py-4">
          {error.status === "FETCH_ERROR"
            ? "Unable to connect to the server. Please check your internet or try again later."
            : error?.data?.message || "An unexpected error occurred."}
        </div>
      )}

      <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {blogs.map((blog) => (
          <Link key={blog._id} className="shadow-md" to={`/blogs/${blog._id}`}>
            <img
              src={blog?.coverImg}
              alt=""
              className="h-80 w-full object-cover"
            />
            <h2 className="text-xl p-4">{blog.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
