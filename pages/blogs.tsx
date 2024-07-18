// pages/blogs.tsx

import { GetStaticProps } from "next";
import Link from "next/link";

type Blog = {
  id: number;
  title: string;
  content: string;
};

type Props = {
  blogs: Blog[];
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const BlogsPage = ({ blogs }: Props) => {
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
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
          {blogs.length === 0 && <li>No blogs found.</li>}
        </ul>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const res = await fetch(
      `https://cryptic-bastion-20850-17d5b5f8ec19.herokuapp.com/blog-posts`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch blog posts");
    }
    const data = await res.json();
    const blogs: Blog[] = data.blog_posts;

    return {
      props: {
        blogs,
      },
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {
      props: {
        blogs: [],
      },
    };
  }
};

export default BlogsPage;
