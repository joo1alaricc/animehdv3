import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const AuthPage = ({ mode }: { mode: 'login' | 'register' }) => {
  const navigate = useNavigate();

  const handleFinish = () => {
    // Perform login/register logic here...
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-md bg-white border-8 border-black p-8 shadow-[16px_16px_0px_0px_rgba(255,204,0,1)] text-black space-y-8 transform -rotate-1">
        <div className="text-center space-y-2">
          <h2 className="text-5xl md:text-6xl font-black oswald italic transform rotate-2">{mode === 'login' ? 'WELCOME BACK' : 'JOIN THE CLAN'}</h2>
        </div>
        <div className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="font-black oswald uppercase text-sm">Username</label>
              <input type="text" className="w-full p-3 border-4 border-black font-bold outline-none focus:bg-[#FFCC00]" placeholder="USER" />
            </div>
          )}
          <div className="space-y-1">
            <label className="font-black oswald uppercase text-sm">Email</label>
            <input type="email" className="w-full p-3 border-4 border-black font-bold outline-none focus:bg-[#FFCC00]" placeholder="NINJA@VILLAGE.COM" />
          </div>
          <div className="space-y-1">
            <label className="font-black oswald uppercase text-sm">Password</label>
            <input type="password" className="w-full p-3 border-4 border-black font-bold outline-none focus:bg-[#FFCC00]" placeholder="••••••••" />
          </div>
        </div>
        <Button variant={mode === 'login' ? 'yellow' : 'red'} className="w-full py-4" onClick={handleFinish}>
          {mode === 'login' ? 'ACCESS' : 'CREATE'}
        </Button>
        <div className="text-center font-bold text-sm">
          {mode === 'login' ? (
            <p>Don't have an account? <Link to="/register" className="text-[#FF3B30] underline">Join Now</Link></p>
          ) : (
            <p>Already a member? <Link to="/login" className="text-[#007AFF] underline">Login Here</Link></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
