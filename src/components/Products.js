import React from "react";
import formatCurrency from "../util";
import { connect } from "react-redux";
import fetchProducts from "../actions/productAction";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { product } = this.state;
    console.log(this.props.products);

    return (
      <div>
        {!this.props.products ? (
          <div>Loading...</div>
        ) : (
          <ul className="products">
            {this.props.products.map((prod) => (
              <li key={prod._id}>
                <div className="product">
                  <a href={"#" + prod._id}>
                    <img src={prod.image} alt={prod.title}></img>
                    <p>{prod.title}</p>
                  </a>
                  <div className="product-price">
                    <div>{formatCurrency(prod.price)}</div>
                    <button
                      onClick={() => this.props.addToCart(product)}
                      className="button primary"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
export default connect((state) => ({ products: state.products.items }), {
  fetchProducts,
})(Products);
