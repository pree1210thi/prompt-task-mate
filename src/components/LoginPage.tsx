
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, Github, Mail } from 'lucide-react';

interface LoginPageProps {
  onLogin: (provider: string) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckSquare className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to TodoFlow</CardTitle>
          <CardDescription>
            Manage your tasks efficiently with real-time collaboration
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Button 
            onClick={() => onLogin('google')} 
            className="w-full bg-red-600 hover:bg-red-700"
          >
            <Mail className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          
          <Button 
            onClick={() => onLogin('github')} 
            variant="outline" 
            className="w-full"
          >
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
          
          <div className="text-xs text-gray-500 text-center mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
