
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  AlertCircle, 
  Users, 
  List,
  Plus
} from 'lucide-react';

interface SidebarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onCreateTask: () => void;
  taskCounts: {
    all: number;
    today: number;
    overdue: number;
    shared: number;
  };
}

const Sidebar = ({ activeFilter, onFilterChange, onCreateTask, taskCounts }: SidebarProps) => {
  const menuItems = [
    { id: 'all', label: 'All Tasks', icon: List, count: taskCounts.all, color: 'from-blue-500 to-cyan-500' },
    { id: 'today', label: 'Due Today', icon: Calendar, count: taskCounts.today, color: 'from-green-500 to-emerald-500' },
    { id: 'overdue', label: 'Overdue', icon: AlertCircle, count: taskCounts.overdue, color: 'from-red-500 to-pink-500' },
    { id: 'shared', label: 'Shared with Me', icon: Users, count: taskCounts.shared, color: 'from-purple-500 to-violet-500' },
  ];

  return (
    <aside className="w-72 bg-white/40 backdrop-blur-md border-r border-white/20 p-6 shadow-lg">
      <Button 
        onClick={onCreateTask} 
        className="w-full mb-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-3 text-lg font-semibold"
      >
        <Plus className="mr-2 h-5 w-5" />
        Create New Task
      </Button>
      
      <nav className="space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeFilter === item.id;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-between p-4 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-md border border-blue-200' 
                  : 'text-gray-700 hover:bg-white/60 hover:shadow-md'
              }`}
              onClick={() => onFilterChange(item.id)}
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} mr-3 shadow-sm`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium">{item.label}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                isActive 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {item.count}
              </span>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
