
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Bell, Shield, Trash2, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SettingsProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onClose: () => void;
  onLogout: () => void;
}

const Settings = ({ user, onClose, onLogout }: SettingsProps) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [notifications, setNotifications] = useState(true);
  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
        variant: "destructive",
      });
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 px-6 py-4 shadow-lg">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onClose} className="hover:bg-blue-50 rounded-full p-3">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Settings
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-8 space-y-8">
        {/* Profile Settings */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              <span>Profile</span>
            </CardTitle>
            <CardDescription className="text-lg">
              Manage your profile information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6 mb-8">
              <div className="relative">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-20 w-20 rounded-full ring-4 ring-blue-200 shadow-lg" />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <User className="h-10 w-10 text-white" />
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow-lg border-2 border-blue-200">
                  <Camera className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <Button variant="outline" className="hover:bg-blue-50 border-blue-200 text-blue-700 font-semibold">
                Change Avatar
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-lg font-semibold text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white/60"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-lg font-semibold text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white/60"
                />
              </div>
            </div>
            
            <Button onClick={handleSaveProfile} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg font-semibold">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <span>Notifications</span>
            </CardTitle>
            <CardDescription className="text-lg">
              Manage your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-white/30">
              <div>
                <Label className="text-lg font-semibold text-gray-700">Task Reminders</Label>
                <p className="text-gray-600 mt-1">Get notified about upcoming deadlines</p>
              </div>
              <Button
                variant={notifications ? "default" : "outline"}
                onClick={() => setNotifications(!notifications)}
                className={notifications ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white" : ""}
              >
                {notifications ? "Enabled" : "Disabled"}
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-white/30">
              <div>
                <Label className="text-lg font-semibold text-gray-700">Shared Task Updates</Label>
                <p className="text-gray-600 mt-1">Get notified when shared tasks are updated</p>
              </div>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                Enabled
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span>Security</span>
            </CardTitle>
            <CardDescription className="text-lg">
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="hover:bg-yellow-50 border-yellow-200 text-yellow-700 font-semibold">
              Change Password
            </Button>
            <Button variant="outline" className="hover:bg-yellow-50 border-yellow-200 text-yellow-700 font-semibold ml-4">
              Two-Factor Authentication
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 bg-red-50/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-red-600 text-2xl">
              <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
                <Trash2 className="h-5 w-5 text-white" />
              </div>
              <span>Danger Zone</span>
            </CardTitle>
            <CardDescription className="text-lg">
              Irreversible and destructive actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 text-lg font-semibold"
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
