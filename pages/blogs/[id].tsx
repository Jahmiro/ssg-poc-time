import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import React from "react";

type Blog = {
  id: number;
  title: string;
  content: string;
};

type Props = {
  blog: Blog | null;
  error: string | null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch(`https://cryptic-bastion-20850-17d5b5f8ec19.herokuapp.com/blog-posts`);
    if (!res.ok) {
      throw new Error("Failed to fetch blog posts");
    }
    const data: Blog[] = await res.json();

    const paths = data.map((blog) => ({
      params: { id: blog.id.toString() },
    }));

    return { paths, fallback: true };
  } catch (error) {
    console.error("Error fetching blog paths:", error);
    return { paths: [], fallback: true };
  }
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { id } = context.params!;
  try {
    const res = await fetch(`https://cryptic-bastion-20850-17d5b5f8ec19.herokuapp.com/blog-posts/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch blog with id ${id}: ${res.statusText}`);
    }
    const blog: Blog = await res.json();

    return {
      props: {
        blog,
        error: null,
      },
      revalidate: 30,
    };
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    return {
      props: {
        blog: null,
        error: `Failed to fetch blog with id ${id}`,
      },
      revalidate: 30,
    };
  }
};

const BlogDetail: React.FC<Props> = ({ blog, error }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white border border-neutral-400 rounded-lg shadow-lg pt-6 max-w-md w-full">
        <h1 className="text-tertiary-800 text-2xl font-bold mb-4 text-center">
          {blog.title}
        </h1>
        <p className="text-tertiary-700 text-lg px-4 pb-4">{blog.content}</p>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => router.back()}
          className="text-secondary-500 px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-secondary-600"
        >
          Terug naar homepagina
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;
