"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import HttpKit from "../../common/helpers/HttpKit";
import { useDispatch } from "react-redux";
import { addRecipeToCart } from "@/redux/slices/addToCartSlice";

const SingleRecipe = ({ id, setIsOpen }) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ["recipe-details"],
    queryFn: () => HttpKit.getRecipeDetails(id),
  });

  const handleAddToCart = () => {
    if (data) {
      const cartItem = {
        id: data.idMeal,
        name: data.strMeal,
        image: data.strMealThumb,
      };
      dispatch(addRecipeToCart(cartItem));
    }
  };

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
      <button
        onClick={handleAddToCart}
        className="bg-black/80 p-4 rounded-lg text-white"
      >
        Add to cart
      </button>
    </div>
  );
};

export default SingleRecipe;
