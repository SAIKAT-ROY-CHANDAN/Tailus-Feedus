"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import HttpKit from "../../common/helpers/HttpKit";
import { useDispatch } from "react-redux";
import { addRecipeToCart } from "@/redux/slices/addToCartSlice";
import { toast } from "sonner";

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

      toast.success("Recipe added to cart!", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        style: {
          backgroundColor: "rgba(234, 179, 8, 0.9)",
          color: 'white'
        },
      });
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
        className="bg-yellow-500/90 p-2 rounded-lg text-white font-semibold hover:bg-yellow-400/80"
      >
        Add to cart
      </button>
    </div>
  );
};

export default SingleRecipe;
