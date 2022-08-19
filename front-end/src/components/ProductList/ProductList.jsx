import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { fetchProducts } from '../../helpers/api';
import getTotalPrice from '../../helpers/getTotalPrice';
import AppContext from '../../context/AppContext';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { savedProducts } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    fetchProducts().then((response) => setProducts(response));
  }, []);

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [savedProducts]);

  return (
    <section
      className="
      flex flex-wrap gap-10 w-full p-8 justify-center max-w-[1000px] mx-auto"
    >
      {
        products.map((product) => (
          <ProductCard
            key={ product.id }
            productData={ product }
          />
        ))
      }

      <button
        type="button"
        data-testid="customer_products__button-cart"
        disabled={ totalPrice === '0,00' }
        onClick={ () => history.push('/customer/checkout') }
        className="
          bg-[#F0C808]
          py-2
          px-4
          rounded-xl
          fixed
          right-0
          bottom-0
          m-10
          font-bold
          disabled:bg-gray-300
          disabled:text-gray-500
          text-lg
          flex
          items-center
        "
      >
        Ver carrinho: R$
        <span
          data-testid="customer_products__checkout-bottom-value"
          className="text-3xl ml-2"
        >
          {totalPrice}
        </span>
      </button>

    </section>
  );
}

export default ProductList;
