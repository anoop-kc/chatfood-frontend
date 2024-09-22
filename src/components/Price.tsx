import React from "react";

interface PriceProps {
  price: number;
  className?: string;
}

export default function Price({ price, className }: PriceProps) {
  return (
    <>{price > 0 && <div className={`price ${className}`}>{price}</div>}</>
  );
}
