import backbutton from "../assets/images/back-button.svg";
import React from "react";

interface BackButtonProps {
  click: Function;
}

export default function BackButton({ click }: BackButtonProps) {
  return <img src={backbutton} alt="Back button" onClick={() => click()} />;
}
