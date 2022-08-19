import React from 'react';
import propTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

function OrderCard({ orderData }) {
  const history = useHistory();

  const {
    id,
    status,
    saleDate,
    totalPrice,
  } = orderData;

  return (
    <section
      onClick={ () => history.push(`/customer/orders/${id}`) }
      aria-hidden
      className="
        bg-slate-100
        p-4
        rounded-lg
        flex
        gap-5
        items-center
        cursor-pointer
        hover:shadow-md
        w-full
        max-w-[400px]
        justify-between
      "
    >
      <span className="flex flex-col items-center font-semibold">
        Pedido
        <span
          data-testid={ `customer_orders__element-order-id-${id}` }
          className="text-2xl mt-[-5px]"
        >
          {id}

        </span>
      </span>

      <span
        data-testid={ `customer_orders__element-delivery-status-${id}` }
        className="bg-[#07A0C3] text-white font-bold py-1 px-3 rounded-lg"
      >
        {status}
      </span>

      <div className="flex flex-col items-end font-bold">
        <span
          data-testid={ `customer_orders__element-order-date-${id}` }
          className=""
        >
          {new Date(saleDate).toLocaleDateString('pt-br')}
        </span>

        <span
          className="text-2xl"
        >
          <span>R$</span>
          <span
            data-testid={ `customer_orders__element-card-price-${id}` }
          >
            {totalPrice.replace('.', ',')}

          </span>
        </span>
      </div>
    </section>
  );
}

export default OrderCard;

OrderCard.propTypes = {
  orderData: propTypes.object,
}.isRequired;
