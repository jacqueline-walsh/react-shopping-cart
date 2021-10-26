import React from "react";
import formatCurrency from '../util';

// Products
const Products = ({ products }) => {
  console.log("Products ", products);
  return (
    <div>
      <ul className="products">
        {Object.values(products).map((product) => (
          <li key={product._id}>
            <div className="product">
              <a
                href={"#" + product._id}
              >
                <img src={product.image} alt={product.title}></img>
                <p>{product.title}</p>
              </a>
              <div className="product-price">
                <div>{formatCurrency(product.price)}</div>
                <button className="button primary">Add To Cart</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
