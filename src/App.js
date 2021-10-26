import data from './data.json';
import Products from './components/Products';

function App() {
  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Products products={data.products} />
          </div>
          <div className="sidebar">
            Cart Items
          </div>
        </div>
      </main>
      <footer>
        All rights reserved
      </footer>
    </div>
  );
}

export default App;
