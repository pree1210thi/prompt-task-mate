
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, Github, Mail, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLogin: (provider: string) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/4 right-10 w-16 h-16 bg-purple-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-pink-400 rounded-full opacity-20 animate-pulse delay-500"></div>
        <div className="absolute bottom-10 right-1/4 w-8 h-8 bg-cyan-400 rounded-full opacity-20 animate-pulse delay-700"></div>
      </div>

      <Card className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl border-white/20 relative z-10">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                <CheckSquare className="h-12 w-12 text-white" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome to TodoFlow
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 leading-relaxed">
            Manage your tasks efficiently with real-time collaboration and beautiful design
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 pb-8">
          <Button 
            onClick={() => onLogin('google')} 
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-semibold rounded-xl"
          >
            <Mail className="mr-3 h-5 w-5" />
            Continue with Google
          </Button>
          
          <Button 
            onClick={() => onLogin('github')} 
            variant="outline" 
            className="w-full border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 py-3 text-lg font-semibold rounded-xl bg-white/60 backdrop-blur-sm"
          >
            <Github className="mr-3 h-5 w-5" />
            Continue with GitHub
          </Button>
          
          <div className="text-xs text-gray-500 text-center mt-8 px-4 leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
