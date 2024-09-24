import { useState } from "react";
import styles from "../assets/styles/StripText.module.css";
import React from "react";

interface StripTextProps {
  text: string;
  limit: number;
}

/* This is a utility component to strip the data to a supplied limit and show a view more button to show the rest */
export default function StripText({ text, limit }: StripTextProps) {
  // setting up a state variable to hold the maximum length of the text and initialising it to the limit supplied
  const [maxLength, setMaxlength] = useState<number>(limit);
  return (
    <span>
      {/* if the length of the text is greater than the maxLength, it is strpped to maxLength */}
      {text.length > maxLength ? `${text.substring(0, maxLength)}...` : text}
      {/* Shows a view more / less link accordingly to view the entire text and the reverse  */}
      {/* The e.stopPropagation() in the onClick handler  prevents the triggering of a false click on the DishCard (parent component) which in turn will trigger the addToCart function */}
      {(text.length > maxLength || text.length > limit) && (
        <a
          id="viewMoreButton"
          className={styles.view_more}
          onClick={(e) => {
            maxLength === text.length
              ? setMaxlength(limit)
              : setMaxlength(text.length);
            e.stopPropagation();
          }}
        >
          View {maxLength < text.length ? "more" : "less"}
        </a>
      )}
    </span>
  );
}
