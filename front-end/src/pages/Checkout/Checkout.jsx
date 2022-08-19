import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchSellers } from '../../helpers/api';
import Navbar from '../../components/Navbar/Navbar';
import TableInfo from '../../components/TableInfo/TableInfo';

function Checkout() {
  const [products, setProducts] = useState(localStorage.getItem('products') === null
    ? [] : JSON.parse(localStorage.getItem('products')));

  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(0);
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const history = useHistory();

  const handleCallback = async (_e, productName) => {
    setProducts((prevState) => {
      const result = prevState.filter((product) => product.name !== productName);
      localStorage.setItem('products', JSON.stringify(result));
      return result;
    });
  };

  const calculateTotal = () => {
    const res = products.map((product) => product.quantity
    * product.price);
    return res.reduce((acc, value) => acc + value).toFixed(2);
  };

  const submitSale = async (e) => {
    e.preventDefault();

    const { token, id } = JSON.parse(localStorage.getItem('user'));

    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/sales`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json', authorization: token },
      body: JSON.stringify({
        totalPrice: calculateTotal(),
        deliveryAddress: address,
        deliveryNumber: addressNumber,
        status: 'pendente',
        userId: id,
        sellerId: selectedSeller.id,
        products,
      }),
    });

    const resData = await res.json();
    history.push(`/customer/orders/${resData.id}`);
  };

  useEffect(() => {
    if (sellers.length === 0) {
      fetchSellers().then((response) => setSellers(response));
    }
    setSelectedSeller(sellers[0]);
  }, [sellers]);

  return (
    <section>

      <Navbar />

      <table className="w-4/5 mx-auto border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-300 p-3 bg-slate-100">Item</th>
            <th className="border border-slate-300 p-3 bg-slate-100">Descrição</th>
            <th className="border border-slate-300 p-3 bg-slate-100">Quantidade</th>
            <th className="border border-slate-300 p-3 bg-slate-100">Valor Unitário</th>
            <th className="border border-slate-300 p-3 bg-slate-100">Sub-total</th>
            <th className="border border-slate-300 p-3 bg-slate-100">Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {products !== undefined && products !== null && products.length !== 0
            ? products.map((product, i) => {
              if (product.quantity > 0) {
                return (<TableInfo
                  key={ i }
                  orderId={ i + 1 }
                  name={ product.name }
                  quantity={ product.quantity }
                  price={ product.price }
                  removeCallBack={ handleCallback }
                  index={ i }
                />);
              }
              return null;
            })
            : null}
        </tbody>
      </table>
      {products !== undefined && products !== null && products.length !== 0
        ? (
          <h1
            data-testid="customer_checkout__element-order-total-price"
            className="m-10 text-4xl font-bold text-center text-slate-700"
          >
            {`Total: R$ ${calculateTotal().replace('.', ',')}`}
          </h1>)
        : <h1>Nenhum produto inserido</h1>}

      <form
        onSubmit={ submitSale }
        className="w-4/5 mx-auto flex flex-wrap gap-10 items-end"
      >
        <label
          htmlFor="sellers"
          className="font-bold text-lg flex flex-col items-start"
        >
          P.Vendedora Responsável:
          <select
            data-testid="customer_checkout__select-seller"
            onClick={ (e) => setSelectedSeller(e.target.value) }
            name="sellers"
            id="sellers"
            className="px-4 py-2 rounded-lg text-slate-700 font-medium mt-2"
            defaultValue={ sellers !== undefined
             && sellers.length !== 0 ? sellers[0].id : 0 }
          >
            {sellers !== undefined && sellers.length !== 0 ? sellers.map((seller) => (
              <option key={ seller.id } value={ seller.id }>{seller.name}</option>
            ))
              : <option>Nenhum vendedor disponivel</option>}
          </select>
        </label>

        <label
          htmlFor="endereco"
          className="font-bold text-lg flex flex-col items-start"
        >
          Endereço:

          <input
            data-testid="customer_checkout__input-address"
            onChange={ (e) => setAddress(e.target.value) }
            value={ address }
            id="endereco"
            type="text"
            placeholder="Travessa Terceira da Castanheira, bairro murici"
            required
            className="
            px-4 py-2 bg-gray-100 rounded-lg text-slate-700 font-medium mt-2"
          />
        </label>

        <label
          htmlFor="numero"
          className="font-bold text-lg flex flex-col items-start"
        >
          Número:

          <input
            data-testid="customer_checkout__input-addressNumber"
            onChange={ (e) => setAddressNumber(e.target.value) }
            value={ addressNumber }
            input="numero"
            type="text"
            placeholder="123"
            required
            className="
            px-4 py-2 bg-gray-100 rounded-lg text-slate-700 font-medium mt-2"
          />
        </label>
        <button
          data-testid="customer_checkout__button-submit-order"
          type="submit"
          className="py-3 px-5 rounded-lg text-white font-bold bg-[#07A0C3]"
        >
          Finalizar pedido

        </button>
      </form>

    </section>
  );
}

export default Checkout;
