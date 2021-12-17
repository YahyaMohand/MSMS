import React from "react";
import "../core/products/products.css";

function Me({ title, value }) {

  return (
    <div className="product">
      <div className="product__info">
      <strong>{title}</strong>
        <p className="product__price">
        <p>{value}</p>

        </p>
    </div>
    </div>
  );
}

export default Me;