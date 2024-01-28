// src/components/RegisterPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [registerAsOwner, setRegisterAsOwner] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [businessEmail, setBusinessEmail] = useState('');
    const [nip, setNip] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');

  const handleRegister = () => {
    // Add your registration logic here
    console.log('Registering with:', {
      username,
      email,
      password,
      birthdate,
      registerAsOwner,
      companyName,
      businessEmail,
      nip,
      companyPhone,
      companyAddress,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-bgm">
        <div className="mb-6 text-center top-0 center">
        <img src={logo} alt="Logo" className="w-80 h-80" />
      </div>
      <div className="bg-bgs p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Register</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-primary mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border rounded"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-primary mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="birthdate" className="block text-primary mb-1">
              Birthdate
            </label>
            <input
              type="date"
              id="birthdate"
              className="w-full p-2 border rounded"
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-primary mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded"
              onChange={(e) => setPassword(e.target.value)}
              
            />
          </div>
          <div className="mb-4">
            <label htmlFor="repeatPassword" className="block text-primary mb-1">
              Repeat Password
            </label>
            <input
              type="password"
              id="repeatPassword"
              className="w-full p-2 border rounded"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <div className="text-primary mb-4">
            <label htmlFor="registerAsOwner" className="flex items-center">
              <input
                type="checkbox"
                id="registerAsOwner"
                className="mr-2"
                checked={registerAsOwner}
                onChange={() => setRegisterAsOwner(!registerAsOwner)}
              />
              Register as owner
            </label>
          </div>
          {registerAsOwner && (
            <>
              <div className="mb-4">
                <label htmlFor="companyName" className="block text-primary mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="businessEmail" className="block text-primary mb-1">
                  Business Email (Contact)
                </label>
                <input
                  type="email"
                  id="businessEmail"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setBusinessEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="nip" className="block text-primary mb-1">
                  NIP (Tax Identification Number)
                </label>
                <input
                  type="text"
                  id="nip"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setNip(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="companyPhone" className="block text-primary mb-1">
                  Company Phone
                </label>
                <input
                  type="tel"
                  id="companyPhone"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setCompanyPhone(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="companyAddress" className="block text-primary mb-1">
                  Company Address
                </label>
                <input
                  id="companyAddress"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setCompanyAddress(e.target.value)}
                ></input>
              </div>
            </>
          )}
          <button
            type="button"
            className="w-full bg-[#96DA2B] text-white p-2 rounded hover:bg-primary"
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-gray-300 text-sm">
          Already have an account?{' '}
          <Link to="/" className="text-[#96DA2B] hover:underline hover:text-primary">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
