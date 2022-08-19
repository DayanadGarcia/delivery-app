import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import SellerOrderCard from '../../components/SellerOrderCard/SellerOrderCard';
import { fetchSellersOrders } from '../../helpers/api';

function SellerOrders() {
  const [sellerData, setSellerData] = useState();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const seller = JSON.parse(localStorage.getItem('user'));
    setSellerData(seller);
  }, []);

  useEffect(() => {
    if (sellerData) {
      fetchSellersOrders(sellerData.id).then((response) => {
        if (!response.message) { setOrders(response); }
      });
    }
  }, [sellerData]);

  return (
    <section>

      <Navbar />

      {
        orders.map((order) => <SellerOrderCard orderData={ order } key={ order.id } />)
      }

    </section>
  );
}

export default SellerOrders;
