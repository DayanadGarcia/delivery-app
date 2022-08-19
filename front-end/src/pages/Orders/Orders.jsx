import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { fetchCustomerOrders } from '../../helpers/api';

// imported components
import OrderCard from '../../components/OrderCard/OrderCard';

function Orders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchCustomerOrders(user.token).then((response) => setOrders(response));
  }, [user.token]);

  return (
    <section>

      <Navbar />

      <section className="p-10 flex flex-wrap gap-8">
        {
          orders.map((order) => <OrderCard key={ order.id } orderData={ order } />)
        }
      </section>

    </section>
  );
}

export default Orders;
