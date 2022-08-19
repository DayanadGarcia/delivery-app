import React from 'react';

// imported components
import Navbar from '../../components/Navbar/Navbar';
import ProductList from '../../components/ProductList/ProductList';
import Provider from '../../context/Provider';

function Products() {
  return (
    <section className="bg-gray-50">
      <Navbar />

      <Provider>
        <ProductList />
      </Provider>

    </section>
  );
}

export default Products;
