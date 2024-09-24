import backbutton from "../assets/images/back-button.svg";
import React from "react";
import styles from "../assets/styles/BackButton.module.css";

interface BackButtonProps {
  click: Function;
}

// the click handler for the back button is supplied from the parent, so we have the flexibility of calling different handlers in accordance with the context
export default function BackButton({ click }: BackButtonProps) {
  return (
    <img
      className={styles.back_button}
      src={backbutton}
      alt="Back button"
      onClick={() => click()}
    />
  );
}
