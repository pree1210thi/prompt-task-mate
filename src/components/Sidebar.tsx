
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
    { id: 'all', label: 'All Tasks', icon: List, count: taskCounts.all },
    { id: 'today', label: 'Due Today', icon: Calendar, count: taskCounts.today },
    { id: 'overdue', label: 'Overdue', icon: AlertCircle, count: taskCounts.overdue },
    { id: 'shared', label: 'Shared with Me', icon: Users, count: taskCounts.shared },
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-6">
      <Button 
        onClick={onCreateTask} 
        className="w-full mb-6 bg-blue-600 hover:bg-blue-700"
      >
        <Plus className="mr-2 h-4 w-4" />
        New Task
      </Button>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeFilter === item.id ? "secondary" : "ghost"}
              className={`w-full justify-between ${
                activeFilter === item.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
              }`}
              onClick={() => onFilterChange(item.id)}
            >
              <div className="flex items-center">
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </div>
              <span className="bg-gray-200 text-xs px-2 py-1 rounded-full">
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
