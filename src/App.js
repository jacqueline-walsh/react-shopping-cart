import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      products: data.products,
      size: "",
      sort: "",
    };
  }
  render() {
    const removeFromCart = (product) => {
      const cartItems = this.state.cartItems.slice();
      this.setState({
        cartItems: cartItems.filter((x) => x._id !== product._id),
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems.filter((x) => x._id !== product._id))
      );
    };

    const addToCart = (product) => {
      const cartItems = this.state.cartItems.slice();
      let alreadyInCart = false;
      cartItems.forEach((item) => {
        if (item._id === product._id) {
          item.count++;
          alreadyInCart = true;
        }
      });
      if (!alreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
      this.setState({ cartItems });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    };

    const sortProducts = (e) => {
      const sort = e.target.value;
      console.log(e.target.value);
      this.setState((state) => ({
        sort: sort,
        products: this.state.products
          .slice()
          .sort((a, b) =>
            sort === "lowest"
              ? a.price > b.price
                ? 1
                : -1
              : sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id > b._id
              ? 1
              : -1
          ),
      }));
    };

    const filterProducts = (e) => {
      console.log(e.target.value);
      if (e.target.value === "") {
        this.setState({ size: e.target.value, products: data.products });
      } else {
        this.setState({
          size: e.target.value,
          products: data.products.filter(
            (product) => product.availableSizes.indexOf(e.target.value) >= 0
          ),
        });
      }
    };

    const createOrder = (order) => {
      alert("need to save order for " + order.name);
    };

    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">React Shopping Cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter
                  count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={filterProducts}
                  sortProducts={sortProducts}
                />
                {this.state.products.length === 0 ? (
                  <div className="product-message">
                    <h3>There are currently no items available in this size</h3>
                  </div>
                ) : (
                  <Products
                    products={this.state.products}
                    addToCart={addToCart}
                  />
                )}
              </div>
              <div className="sidebar">
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={removeFromCart}
                  createOrder={createOrder}
                />
              </div>
            </div>
          </main>
          <footer>All rights reserved</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
