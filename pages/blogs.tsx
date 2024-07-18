// pages/blogs.tsx

import { useEffect, useState } from "react";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Blog = {
  id: number;
  title: string;
  content: string;
};

type BlogResponse = {
  blog_posts: Blog[];
};

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/blog-posts`);
        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data: BlogResponse = await res.json();
        setBlogs(data.blog_posts); // Set the blogs from the API
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]); // Set blogs to an empty array on error
      }
    };

    fetchBlogs(); // Fetch blogs when component mounts

    // Cleanup function
    return () => {
      setBlogs([]); // Reset blogs to empty array on unmount
    };
  }, []);

  return (
    <div>
      <nav className="flex justify-between items-center bg-purple-600 text-white p-4">
        <div className="flex space-x-4 ml-auto">
          <Link href="/">Home</Link>
          <Link href="/blogs">Blogs</Link>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Blogs</h1>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id} className="text-lg mb-2">
              <Link href={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </li>
          ))}
          {blogs.length === 0 && <li>No blogs found.</li>}
        </ul>
      </div>
    </div>
  );
};

export default BlogsPage;
