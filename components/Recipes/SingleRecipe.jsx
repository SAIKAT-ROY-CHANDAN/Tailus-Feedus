"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import HttpKit from "../../common/helpers/HttpKit";

const SingleRecipe = ({ id, setIsOpen }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe-details"],
    queryFn: () => HttpKit.getRecipeDetails(id),
  });


  if (isLoading) return "Loading...";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
      <div>
        {data?.strMealThumb ? (
          <Image src={data.strMealThumb} width={500} height={500} alt="Image" />
        ) : (
          <div>No image available</div>
        )}
      </div>
      <h2 className="text2xl font-semibold">{data?.strMeal}</h2>
    </div>
  );
};

export default SingleRecipe;
