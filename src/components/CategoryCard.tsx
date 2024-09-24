import { CategoryWithDish } from "../interfaces";
import DishCard from "./DishCard";
import React from "react";
import styles from "../assets/styles/CategoryCard.module.css";

interface CategoryCardProps {
  category: CategoryWithDish;
}

/* This component displays the details and items in a single category, the category item is supplied from the parent */
export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className={styles.category_card}>
      <h2 className={styles.category_title}>{category?.name}</h2>
      {/* dish card loop to display the dish items in the category*/}
      <div className={styles.dish_card_container}>
        {category?.items?.map((dish) => (
          <DishCard key={`dish-${dish.id}`} dish_item={dish} />
        ))}
      </div>
      {/* End. dish card loop  */}
    </div>
  );
}
