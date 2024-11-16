"use client"
// app/profile/page.tsx
import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/navigation'; // Updated import
import { removeToken } from '../utils/auth';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const router = useRouter(); // Updated to work with the app directory

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/auth/profile');
        setProfile(response.data);
      } catch (error) {
        router.push('/login'); // Use router.push to navigate
      }
    };
    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {profile.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
