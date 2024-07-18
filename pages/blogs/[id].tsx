// pages/blogs/[id].tsx

import Navigation from "@/components/navigation";
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
    const res = await fetch(
      `https://cryptic-bastion-20850-17d5b5f8ec19.herokuapp.com/blog-posts`
    );
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
    const res = await fetch(
      `https://cryptic-bastion-20850-17d5b5f8ec19.herokuapp.com/blog-posts/${id}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch blog with id ${id}: ${res.statusText}`);
    }
    const blog: Blog = await res.json();

    return {
      props: {
        blog,
        error: null,
      },
    };
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    return {
      props: {
        blog: null,
        error: `Failed to fetch blog with id ${id}`,
      },
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
    <>
      <Navigation />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <button
              onClick={() => router.back()}
              className="text-secondary-500 py-2 rounded-lg mb-[10px] hover:bg-blue-700 hover:text-secondary-600"
            >
              Terug naar blogs
            </button>
            <h2 className="text-3xl font-bold tracking-tight text-tertiary-800 sm:text-4xl">
              {blog.title}
            </h2>
          </div>
          <div className="mt-10">
            <div className="max-w-2xl">
              <p className="text-tertiary-800 text-lg leading-8">
                {blog.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
