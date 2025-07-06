
import React, { useState } from 'react';
import LoginPage from '@/components/LoginPage';
import Dashboard from './Dashboard';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const handleLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
    // Simulate login process
    setTimeout(() => {
      setIsAuthenticated(true);
      toast({
        title: "Welcome to TodoFlow!",
        description: `Successfully logged in with ${provider}.`,
      });
    }, 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} />;
};

export default Index;
