import { CategoryWithDish } from "../interfaces";
import DishCard from "./DishCard";
import React from "react";
import styles from "../assets/styles/CategoryCard.module.css";

interface CategoryCardProps {
  category: CategoryWithDish;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className={styles.category_card}>
      <h2 className={styles.category_title}>{category?.name}</h2>
      {/* dish card loop  */}
      {category?.items?.map((dish) => (
        <DishCard key={`dish-${dish.id}`} dish_item={dish} />
      ))}
      {/* End. dish card loop  */}
    </div>
  );
}
