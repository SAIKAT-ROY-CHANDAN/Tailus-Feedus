"use client";
import HttpKit from "@/common/helpers/HttpKit";
import Modal from "@/components/Modal";
import RecipeCard from "@/components/Recipes/RecipeCard";
import SingleRecipe from "@/components/Recipes/SingleRecipe";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeId, setRecipeId] = useState("");
  const [openDetails, setOpenDetails] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: HttpKit.getAllRecipes,
  });

  useEffect(() => {
    if (data) {
      setRecipes(data);
    }
  }, [data]);

  const handleDetailsOpen = (id) => {
    setOpenDetails(true);
    setRecipeId(id);
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen text-xl">Loading recipes...</div>;
  if (error) return <div>Error loading recipes: {error.message}</div>;

  return (
    <section className="pt-10">
      <div className="relative py-16">
        <div className="container relative m-auto px-6 text-gray-500 md:px-12">
          <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
            {recipes?.map((recipe) => (
              <RecipeCard
                key={recipe?.idMeal}
                recipe={recipe}
                handleDetailsOpen={handleDetailsOpen}
              />
            ))}
          </div>
        </div>
      </div>
      <Modal isOpen={openDetails} setIsOpen={setOpenDetails}>
        <SingleRecipe id={recipeId} setIsOpen={setOpenDetails} />
      </Modal>
    </section>
  );
};

export default AllRecipes;
