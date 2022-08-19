import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import verifyToken from '../../helpers/verifyToken';

function Navbar() {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    setUserName(userData.name);
    setUserRole(userData.role);
    const isTokenValid = verifyToken(userData.token);
    if (!isTokenValid) handleLogout();
  }, []);

  return (
    <header
      className="bg-[#F0C808] mb-10 p-5 font-bold flex justify-between"
    >
      <div className="flex gap-6">
        {userRole === 'customer' && (
          <>
            <Link
              className="hover:bg-white py-1 px-2 rounded-md"
              to="/customer/products"
              data-testid="customer_products__element-navbar-link-products"
            >
              Produtos
            </Link>

            <Link
              className="hover:bg-white py-1 px-2 rounded-md"
              to="/customer/orders"
              data-testid="customer_products__element-navbar-link-orders"
            >
              Meus pedidos
            </Link>
          </>
        )}

        {userRole === 'seller' && (
          <Link
            className=""
            to="/seller/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Pedidos
          </Link>
        )}

        { userRole === 'administrator' && (
          <Link
            to="/admin/manage"
            data-testid="administrator__element-navbar-link-manager"
          >
            Gerenciar Usuários
          </Link>
        )}
      </div>

      <div className="flex gap-6">
        <span
          className="cursor-default py-1 px-2 rounded-md"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {userName}
        </span>

        <button
          className="hover:bg-white py-1 px-2 rounded-md"
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ handleLogout }
        >
          Sair
        </button>
      </div>
    </header>
  );
}
// {role === 'seller' ? history.push('/seller/products') : null}

export default Navbar;
