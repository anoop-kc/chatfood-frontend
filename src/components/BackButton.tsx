import backbutton from "../assets/images/back-button.svg";
import React from "react";

interface BackButtonProps {
  click: Function;
}

// the click handler for the back button is supplied from the parent, so we have the flexibility of calling different handlers in accordance with the context
export default function BackButton({ click }: BackButtonProps) {
  return <img src={backbutton} alt="Back button" onClick={() => click()} />;
}
