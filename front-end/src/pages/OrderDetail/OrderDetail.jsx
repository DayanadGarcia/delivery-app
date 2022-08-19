import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { fetchOrderBySaleId } from '../../helpers/api';

const NUMBER_LENGTH = 4;
const statusTest = 'customer_order_details__element-order-details-label-delivery-status';
export default function OrderDetail() {
  const { id } = useParams();
  const [orders, setOrders] = useState({});
  useEffect(() => {
    if (orders.sale === undefined) {
      fetchOrderBySaleId(id).then((response) => setOrders(response));
    }
  }, [orders, id]);

  return (
    <section>
      <Navbar />
      <h2>Detalhes do Pedido</h2>
      {orders.sale !== undefined ? (
        <section>
          <b>
            <span
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              {`PEDIDO ${orders.sale.toString().padStart(NUMBER_LENGTH, '0')};`}
            </span>
          </b>
          <p
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {`P. Vend: ${orders.sellerName}`}
          </p>
          <b>
            <p
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              {(new Date(orders.saleDate).toLocaleDateString('pt-BR'))}
            </p>
          </b>
          <b>
            <span
              data-testid={ statusTest }
            >
              {orders.status}
            </span>
          </b>
          <button
            data-testid="customer_order_details__button-delivery-check"
            type="button"
            disabled
          >
            MARCAR COMO ENTREGUE

          </button>
        </section>
      ) : <h2>Carregando...</h2>}
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          { orders.products !== undefined
            ? (
              orders.products.map((product, i) => (
                <tr
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${i}`
                  }
                  key={ i }
                >
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-item-number-${i}`
                    }
                  >
                    <span>
                      {i + 1}
                    </span>
                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-name-${i}`
                    }
                  >
                    {product.productName}
                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-quantity-${i}`
                    }
                  >
                    {product.quantity}
                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-sub-total-${i}`
                    }
                  >
                    {product.unityPrice}
                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-total-price-${i}`
                    }
                  >
                    {product.subTotal}
                  </td>
                </tr>
              ))
            )
            : <tr><td>Loading</td></tr>}
        </tbody>
      </table>
      {orders.sale !== undefined
        ? (
          <h1
            data-testid="customer_order_details__element-order-total-price"
          >
            {`${orders.totalPrice.replace('.', ',')}`}

          </h1>)
        : <h1>Nenhum produto inserido</h1>}

    </section>
  );
}
