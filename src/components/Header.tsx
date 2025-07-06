
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckSquare, Bell, User, LogOut, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
  onOpenSettings?: () => void;
}

const Header = ({ user, onLogout, onOpenSettings }: HeaderProps) => {
  const [notifications] = useState([
    { id: 1, title: 'Task Due Soon', message: 'Complete project proposal is due today', time: '2m ago' },
    { id: 2, title: 'New Shared Task', message: 'Code review task shared with you', time: '1h ago' },
    { id: 3, title: 'Task Completed', message: 'Team standup meeting marked as complete', time: '3h ago' },
  ]);

  const [notificationCount, setNotificationCount] = useState(notifications.length);

  const handleNotificationClick = () => {
    setNotificationCount(0);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
          <CheckSquare className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          TodoFlow
        </h1>
      </div>
      
      {user && (
        <div className="flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative hover:bg-blue-50 rounded-full p-3"
                onClick={handleNotificationClick}
              >
                <Bell className="h-5 w-5 text-gray-600" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-white/95 backdrop-blur-md shadow-xl border-white/20" align="end">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Notifications</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{notification.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <Button variant="ghost" className="w-full text-blue-600 hover:bg-blue-50">
                    View All Notifications
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-3 hover:bg-blue-50 rounded-full px-4 py-2">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center ring-2 ring-blue-200">
                  <span className="text-white font-bold text-lg">PP</span>
                </div>
                <span className="hidden md:block font-medium text-gray-700">{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-md shadow-xl border-white/20">
              <DropdownMenuItem className="hover:bg-blue-50">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onOpenSettings} className="hover:bg-blue-50">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="hover:bg-red-50 text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </header>
  );
};

export default Header;
