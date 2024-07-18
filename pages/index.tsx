import { GetStaticProps } from "next";
import { useEffect, useState } from "react";

type Props = {
  currentTime: string;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const res = await fetch("https://cryptic-bastion-20850-17d5b5f8ec19.herokuapp.com/current-time");
    if (!res.ok) {
      throw new Error("Failed to fetch current time");
    }
    const data = await res.json();
    const currentTime = data.time;

    return {
      props: {
        currentTime,
      },
      revalidate: 5,
    };
  } catch (error) {
    console.error("Error fetching current time:", error);
    return {
      props: {
        currentTime: "",
      },
      revalidate: 5, 
    };
  }
};

const Page: React.FC<Props> = ({ currentTime }) => {
  return (
    <div className="flex flex-col items-center justify-center my-[40px]">
      <h1 className="text-tertiary-800 text-[28px] w-full text-center font-bold mb-[20px]">
        Huidige Tijd
      </h1>
      <div className="text-tertiary-800 text-[24px] mb-4">
        {currentTime || "Laatst bekende tijd wordt geladen..."}
      </div>
    </div>
  );
};

export default Page;
