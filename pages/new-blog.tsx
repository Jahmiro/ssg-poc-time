// pages/new-blog.tsx

import { useState } from "react";
import { useRouter } from "next/router";
import Navigation from "@/components/navigation";

const NewBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(
      "https://cryptic-bastion-20850-17d5b5f8ec19.herokuapp.com/add-blog-post",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      }
    );

    if (response.ok) {
      router.push("/blogs");
    } else {
      console.error("Failed to add blog post");
    }
  };

  return (
    <>
      <Navigation />
      <div className="max-w-3xl mx-auto p-8 bg-white border  rounded-lg shadow-lg mt-10">
        <h1 className="text-3xl font-bold text-tertiary-800 mb-6 text-center">
          Create a New Blog Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="title" className="font-semibold text-tertiary-800 mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="p-3 border border-gray-300 text-tertiary-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="content"
              className="font-semibold text-tertiary-800 mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="p-3 border border-gray-300 text-tertiary-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none min-h-[200px]"
            />
          </div>
          <button
            type="submit"
            className="bg-primary-500 text-tertiary-800 px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out font-semibold w-full"
          >
            Add Blog Post
          </button>
        </form>
      </div>
    </>
  );
};

export default NewBlogPage;
