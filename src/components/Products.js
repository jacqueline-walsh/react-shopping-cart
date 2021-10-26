import React from 'react';

const Products = ({products}) => {
    console.log("Products ", products)
    return (
        <div>
            <ul className="products">
                {Object.values(products).map((product) => (
                    <li key={product._id}>
                        {console.log("Product Title ", product.title)}
                        <div className="product">
                            <a href={"#" + product._id}>
                                <img src={product.image} alt={product.title} />
                                <p>{product.title}</p>
                            </a>
                        </div>
                        <div className="product-price">
                            <div>{product.price}</div>
                            <button className="button primary">Add To Cart</button>
                            </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Products
