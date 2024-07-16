import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import React from "react";

type Stat = {
  name: string;
  value: number;
};

type Pokemon = {
  id: number;
  name: string;
  image: string;
  type: string[];
  stats: Stat[];
};

type Props = {
  pokemon: Pokemon | null;
  error: string | null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    "https://dataset-ssr-ssg.s3.eu-north-1.amazonaws.com/pokemon-main/index.json"
  );
  const data: Pokemon[] = await res.json();

  const paths = data.map((pokemon) => ({
    params: { id: pokemon.id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { id } = context.params!;
  const res = await fetch(
    `https://dataset-ssr-ssg.s3.eu-north-1.amazonaws.com/pokemon-main/pokemon/${id}.json`
  );

  if (!res.ok) {
    return {
      props: {
        pokemon: null,
        error: `Failed to fetch data: ${res.statusText}`,
      },
      revalidate: 30,
    };
  }

  const pokemon: Pokemon = await res.json();
  return {
    props: {
      pokemon,
      error: null,
    },
    revalidate: 30,
  };
};

const PokemonDetail: React.FC<Props> = ({ pokemon, error }) => {
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

  if (!pokemon) {
    return <div>Pokemon not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white border border-neutral-400 rounded-lg shadow-lg pt-6 max-w-md w-full">
        <h1 className="text-tertiary-800 text-2xl font-bold mb-4 text-center">
          {pokemon.name}
        </h1>
        <img
          src={`https://dataset-ssr-ssg.s3.eu-north-1.amazonaws.com/pokemon-main/${pokemon.image}`}
          alt={pokemon.name}
          className="w-1/2 mx-auto mb-4"
        />
        <p className="text-center mb-4 text-tertiary-600">
          Type: {pokemon.type.join(", ")}
        </p>
        <div className="bg-neutral-150 border-t border-neutral-400 px-6 py-6">
          <h2 className="text-xl font-bold mb-2 text-center text-tertiary-800">
            Stats:
          </h2>
          <ul className="space-y-2">
            {pokemon.stats.map((stat, index) => (
              <li
                key={index}
                className="flex justify-between text-tertiary-800"
              >
                <span>{stat.name}</span>
                <span>{stat.value}</span>
              </li>
            ))}
          </ul>
        </div>
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

export default PokemonDetail;
