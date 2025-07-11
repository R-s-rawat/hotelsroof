import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../redux/features/auth/authApi';
import Spinner from '../../components/Spinner';

const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password
    };
    try {
      await registerUser(data)?.unwrap();
      alert('Registration Successful');
      navigate("/login");
    } catch (error) {
      setMessage('Registration Failed');
      alert('Registration Failed');
    }
  };

  return (
    <div className='max-w-sm bg-white mx-auto p-8 mt-36'>
      <h2 className='text-2xl font-semibold pt-5'>Please Register</h2>

      {isLoading && <Spinner />}

      <form
        onSubmit={handleRegister}
        className='space-y-5 max-w-sm mx-auto pt-8'>
        <input
          type='text'
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
          placeholder='Username'
          required
        />
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
          placeholder='Email'
          required
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
          placeholder='Password'
          required
        />
        {message && <p className='text-red-500'>{message}</p>}
        <button
          type="submit"
          className='w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md'
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p className='my-5 text-center'>
        Already have an account? Please <Link to="/login" className='text-red-700 italic'>Login</Link>.
      </p>
    </div>
  );
};

export default Register;
