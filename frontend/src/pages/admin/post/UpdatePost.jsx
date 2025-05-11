import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';
import Header from '@editorjs/header';
import { useFetchBlogByIdQuery, usePostBlogMutation, useUpdateBlogMutation } from "../../../redux/features/blogs/blogsApi";

const UpdatePost = () => {
  const { id } = useParams()
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const [updateBlog] = useUpdateBlogMutation()

  // // below is variable blog
  const { data: blog = {}, error, isLoading, refetch } = useFetchBlogByIdQuery(id)

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [isEditorReady, setIsEditorReady] = useState(true);

  // console.log(blog)
  

  // editor js setup
  useEffect(() => {
     if(blog.post){
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        editorRef.current = editor;
      },
      autofocus: true,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true
        },
        list: {
          class: List,
          inlineToolbar: true
        },
      },
      data: blog.post.content
    });

    // return () => {
    //   editor.destroy();
    //   editorRef.current = null;
    // };
  }else{
    //////////////////////////
alert("open again")
    //////////////////////////////
  }
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const content = await editorRef.current.save();
      const updatedPost = {
        title: title || blog.post.title,
        coverImg: coverImg || blog.post.coverImg,
        content :content || blog.post.content,
        category : category || blog.post.category,
        description: metaDescription || blog.post.description,
        author: user._id,
        rating: rating || blog.post.rating
      };

      //  console.log(updatedPost);

      const response = await updateBlog({ id, ...updatedPost }).unwrap();
      // console.log(response);
      // alert(response.message);
      alert("Blog is updated successfully")
      // refetch()
      navigate("/dashboard");
      // alert(`error:${error}`)

    } catch (error) {
      console.error(error);
      setMessage("Failed to update blog post. Please try again.");
    }
  }



  return (
    <div className=" bg-white md:p-8 p-2 ">
      <h2 className="text-2xl font-semibold">Edit or Update Blog Post</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 pt-8">
        <div className="space-y-4">
          <label className=" font-semibold text-xl">Blog Title: </label>
          <input
            type="text"
            // value={title} 
            defaultValue={blog?.post?.title}
            className="w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Marina del Rey Marriott"
            required
          />
        </div>

        {/* blog details */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          {/* left side */}
          <div className="md:w-2/3 w-full">
            <p className=" font-semibold text-xl mb-5">Content Section</p>
            <p className="text-xs italic">Every 1st time, Content is not fetching,,</p>
            <p className="text-xs italic">Write your post here...</p>
            <div id="editorjs"></div>
          </div>

          {/* right side */}
          <div className="md:w-1/3 w-full border p-5 space-y-5">
            <p className=" font-semibold text-xl">Choose Blog Format</p>

            {/* images */}
            <div className="space-y-3">
              <label className=" font-semibold">Blog Cover: </label>
              <input
                type="text"
                // value={coverImg}
                defaultValue={blog?.post?.coverImg}
                className="w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3"
                onChange={(e) => setCoverImg(e.target.value)}
                placeholder="Ex: https://unsplash.com/photos/a-wooden-table.png"
                required
              />
            </div>

            {/* category */}
            <div className="space-y-3">
              <label className=" font-semibold">Category: </label>
              <input
                type="text"
                // value={category}
                defaultValue={blog?.post?.category}
                className="w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3"
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Rooftop/Nature/Travel"
                required
              />
            </div>

            {/* metadescription */}
            <div className="space-y-3">
              <label className=" font-semibold">Meta Data: </label>
              <textarea
                type="text"
                cols={4}
                rows={4}
                // value={metaDescription}
                defaultValue={blog?.post?.description}
                className="w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3"
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Add Meta Data to increase SEO performance..."
                required
              />
            </div>

            {/* rating */}
            <div className="space-y-3">
              <label className=" font-semibold">Rating: </label>
              <input
                type="number"
                // value={rating}
                defaultValue={blog?.post?.rating}
                className="w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3"
                onChange={(e) => setRating(e.target.value)}
                placeholder="add rating: 5"
                required
              />
            </div>


            {/* author */}
            <div className="space-y-3">
              <label className=" font-semibold">Author: </label>
              <input
                type="text"
                value={user.username}
                className="w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3"
                placeholder={`${user.username} (not editable)`}
                disabled
              />
            </div>
          </div>
        </div>

        {
          message && <p className="text-red-500">{message}</p> // Display error message if any
        }
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default UpdatePost