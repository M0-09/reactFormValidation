'use client';

import { useState } from 'react';

export default function RegistrationForm() {
  // Add state for username and usernameErrorText
  const [username, setUsername] = useState('');
  const [usernameErrorText, setUsernameErrorText] = useState('');

  // Add state for password and passwordErrortext
  const [password, setPassword] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');

  // Add state for confirmPassword and confirmPasswordErrorText
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');

  // Add state for isFormValid
  const [formValidity, setFormValidity] = useState(false);

  // Add state to set formData
  const [formData, setFormData] = useState(null); // For storing and displaying results

  // // add function to validate username, password, and confirmPassword

  const validateForm = (
    updatedUsername,
    updatedPassword,
    updatedConfirmPassword
  ) => {
    const usernameValidity = updatedUsername.length >= 3;
    const passwordValidity = updatedPassword.length >= 8;
    const confirmPasswordValidity = updatedPassword === updatedConfirmPassword;

    setFormValidity(
      usernameValidity && passwordValidity && confirmPasswordValidity
    );
  };
  // Create a handleSubmitFunction
  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault(); // Prevent default form submission behavior
    setFormData({
      username: username,
    });
    if (formValidity) {
      alert(`Welcome, ${username}!`);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setUsernameErrorText('');
      setPasswordErrorText('');
      setConfirmPasswordErrorText('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 text-white bg-black">
      <div className="flex flex-wrap justify-center w-full gap-8 lg:flex-nowrap">
        {/* Form Section */}
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="mb-6 text-2xl font-bold text-center text-blue-500">
            Registration Form
          </h1>
          <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label htmlFor="username" className="block mb-2 font-semibold">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                className="w-full p-2 text-white bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                onChange={(event) => {
                  const usernameValue = event.target.value;
                  setUsername(usernameValue);
                  if (usernameValue.length === 0) {
                    setUsernameErrorText('Name is required');
                  } else if (
                    usernameValue.length > 0 &&
                    usernameValue.length < 3
                  ) {
                    setUsernameErrorText(
                      'Name should be at least greater than or equal to 3 characters'
                    );
                  } else {
                    setUsernameErrorText('');
                  }
                  validateForm(usernameValue, password, confirmPassword);
                }}
              />
              {usernameErrorText && (
                <p className="mt-2 text-sm text-red-500">{usernameErrorText}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 font-semibold">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                className="w-full p-2 text-white bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                onChange={(event) => {
                  const passwordValue = event.target.value;
                  setPassword(passwordValue);
                  if (passwordValue.length == 0) {
                    setPasswordErrorText('Password is required');
                  } else if (
                    passwordValue.length > 0 &&
                    passwordValue.length < 8
                  ) {
                    setPasswordErrorText(
                      'Password should be greater than 8 characters'
                    );
                  } else {
                    setPasswordErrorText('');
                  }
                  validateForm(username, passwordValue, confirmPassword);
                }}
              />
              {passwordErrorText && (
                <p className="mt-2 text-sm text-red-500">{passwordErrorText}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 font-semibold"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                className="w-full p-2 text-white bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                onChange={(event) => {
                  const confirmPasswordValue = event.target.value;
                  setConfirmPassword(confirmPasswordValue);
                  if (confirmPasswordValue.length === 0) {
                    setConfirmPasswordErrorText(
                      'Password confirmation is required'
                    );
                  } else if (confirmPasswordValue !== password) {
                    setConfirmPasswordErrorText('Passwords do not match');
                  } else {
                    setConfirmPasswordErrorText('');
                  }
                  validateForm(username, password, confirmPasswordValue);
                }}
              />
              {confirmPasswordErrorText && (
                <p className="mt-2 text-sm text-red-500">
                  {confirmPasswordErrorText}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-semibold">
                Email (Optional):
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 text-white bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
              <p className="mt-2 text-sm text-red-500"></p>
            </div>

            <button
              type="submit"
              className={`w-full py-2 rounded ${
                formValidity
                  ? 'bg-green-500 text-white cursor-pointer'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!formValidity}
            >
              Register
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-blue-500">
            Registration Results
          </h2>
          {formData ? (
            <div>
              <p className="mb-2">
                <span className="font-semibold">Username:</span>
                {formData.username}
              </p>
              <p>
                <span className="font-semibold">Email:</span>
                {formData.email || 'N/A'}
              </p>
            </div>
          ) : (
            <p className="text-gray-400">No registration details to show.</p>
          )}
        </div>
      </div>
    </div>
  );
}
