import { useState } from "react";
import styles from "../assets/styles/StripText.module.css";
import React from "react";

interface StripTextProps {
  text: string;
  limit: number;
}
export default function StripText({ text, limit }: StripTextProps) {
  const [maxLength, setMaxlength] = useState<number>(limit);
  return (
    <span>
      {text.length > maxLength ? `${text.substring(0, maxLength)}...` : text}
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
