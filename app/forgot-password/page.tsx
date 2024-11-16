"use client";

import { useState } from 'react';
import api from '../utils/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [message, setMessage] = useState('');
  const [isResetMode, setIsResetMode] = useState(false); // Toggle between "Forgot" and "Change Password"

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/auth/forgot-password', { email });
      setMessage('Password reset link sent to your email.');
    } catch (error) {
      setMessage('Error sending password reset link.');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/auth/change-password', { resetToken, password });
      setMessage('Password successfully changed. You can now log in with your new password.');
    } catch (error) {
      setMessage('Error changing password. Check your reset token and try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{isResetMode ? 'Change Password' : 'Forgot Password'}</h2>
      
      <form onSubmit={isResetMode ? handleChangePassword : handleForgotPassword} style={styles.form}>
        
        {!isResetMode ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>Send Reset Link</button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Reset Token"
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>Change Password</button>
          </>
        )}
      </form>
      
      {message && <p style={styles.message}>{message}</p>}
      
      <p style={styles.toggleText} onClick={() => setIsResetMode(!isResetMode)}>
        {isResetMode ? 'Back to Forgot Password' : 'Have a reset token? Change Password'}
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'url("/bgimages/istockphoto-1326513521-612x612.jpg")', 
    backgroundColor: '#f7f9fc',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: 'white',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
    outline: 'none',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  message: {
    marginTop: '1rem',
    color: '#0070f3',
    fontSize: '0.9rem',
  },
  toggleText: {
    marginTop: '1rem',
    color: '#0070f3',
    fontSize: '0.9rem',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};