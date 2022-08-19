import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

import { MIN_LENGTH_PASSWORD, MIN_LENGTH_NAME } from '../../helpers/constants';

export default function Admin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const history = useHistory();

  const fetchRegister = async (userName, userEmail, userPassword, userRole) => {
    const fetchResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/manage`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        password: userPassword,
        role: userRole,
      }),
    });

    const data = await fetchResponse.json();

    return data;
  };

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  useEffect(() => {
    const isNameValid = name.length >= MIN_LENGTH_NAME;
    const isEmailValid = /\w+@+\w+\.+\w/.test(email);
    const isPasswordValid = password.length >= MIN_LENGTH_PASSWORD;

    setIsButtonDisabled(!(isEmailValid && isPasswordValid && isNameValid));
  }, [name, email, password]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const registerResponse = await fetchRegister(name, email, password, role);

    if (registerResponse.message) {
      setErrorMessage(registerResponse.message);
      return;
    }

    localStorage.setItem('user', JSON.stringify(registerResponse));

    history.push('/customer/products');
  };

  return (
    <section>
      <Navbar />
      <form>

        <label
          htmlFor="name"
          className="ml-2"
        >
          Nome
          <input
            type="text"
            id="name"
            className="bg-gray-200 p-2 rounded-sm mt-6 ml-2
            mb-6 font-semibold outline-none"
            data-testid="admin_manage__input-name"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>

        <label
          htmlFor="email"
          className="ml-2"
        >
          Email
          <input
            type="text"
            id="email"
            className="bg-gray-200 p-2 rounded-sm mt-6 ml-2
            mb-6 font-semibold outline-none"
            data-testid="admin_manage__input-email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>

        <label
          htmlFor="password"
          className="ml-2"
        >
          Senha
          <input
            type="password"
            id="password"
            className="bg-gray-200 p-2 rounded-sm mt-6 ml-2 font-semibold outline-none"
            data-testid="admin_manage__input-password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>

        <label
          htmlFor="role"
          className="ml-2"
        >
          Tipo
          <select
            className="ml-2 py-2.5 px-0 text-sm mt-6 text-[18px]
          text-stone bg-transparent border-b-2
          border-gray-200 appearance-none dark:text-gray-400
          dark:border-gray-700 focus:outline-none focus:ring-0
          focus:border-gray-200 peer"
            data-testid="admin_manage__select-role"
            value={ role }
            onChange={ handleChange }
          >
            <option selected value="seller">seller</option>
            <option value="customer">customer</option>
            <option value="administrator">administrator</option>

          </select>
        </label>

        <button
          type="submit"
          data-testid="admin_manage__button-register"
          className="
          p-2 rounded-lg
          font-semibold
          outline-none
          disabled:bg-gray-300
          disabled:text-gray-500
          font-bold
          bg-[#07A0C3]
          text-white
          flex
          items-center mx-auto"
          disabled={ isButtonDisabled }
          onClick={ handleRegister }
        >
          CADASTRAR
        </button>

      </form>
    </section>
  );
}
