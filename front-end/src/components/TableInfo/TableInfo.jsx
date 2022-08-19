import React from 'react';
import PropTypes from 'prop-types';

export default function TableInfo({ orderId,
  name, quantity, price, removeCallBack, index }) {
  return (
    <tr>
      <td className="border border-slate-300 p-3 text-center">
        <span
          data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
        >
          {orderId}
        </span>
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${index}` }
        className="border border-slate-300 p-3 text-center"
      >
        {name}
      </td>
      <td
        data-testid={
          `customer_checkout__element-order-table-quantity-${index}`
        }
        className="border border-slate-300 p-3 text-center"
      >
        {quantity}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
        className="border border-slate-300 p-3 text-center"
      >
        {price.replace('.', ',')}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
        className="border border-slate-300 p-3 text-center"
      >
        {(price * quantity).toFixed(2).replace('.', ',')}
      </td>
      <td className="border border-slate-300 p-3 text-center">
        <button
          data-testid={ `customer_checkout__element-order-table-remove-${index}` }
          className="py-1 px-3 rounded-lg mx-auto block text-white font-bold bg-[#DD1C1A]"
          type="button"
          onClick={ (e) => removeCallBack(e, name) }
        >
          Remover
        </button>
      </td>
    </tr>
  );
}

TableInfo.propTypes = {
  orderId: PropTypes.number,
  name: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  index: PropTypes.number,
}.required;
