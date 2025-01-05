import React, { useState } from 'react';
import Header from '../components/header';

const RegisterPage = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // New state for successful registration
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    setSuccess(false); // Reset success state on new submission

    if (!fname || !lname || !email || !phone || !gender || !password || !passwordConfirmation) {
      setError('Please fill out all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          fname,
          lname,
          phone,
          email,
          password,
          password_confirmation: passwordConfirmation,
          gender,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registration successful!');
        setFname('');
        setLname('');
        setEmail('');
        setPhone('');
        setGender('');
        setPassword('');
        setPasswordConfirmation('');
        localStorage.setItem('auth_token', data.token);
        setSuccess(true); // Set success to true
      } else {
        const errorMessage = data.errors
          ? Object.values(data.errors).flat().join(', ')
          : data.message || 'Something went wrong';
        setError(errorMessage);
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-center text-xl font-bold mb-6">Register</h2>
        {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
        {message && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{message}</div>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your first name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your last name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Confirm your password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded transition ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            disabled={loading}
          >
            {loading ? 'Registering...' : success ? 'Registered' : 'Register'}
          </button>
        </form>
      </div>
    </div>
    
  );
};

export default RegisterPage;
