
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  User, 
  MoreHorizontal, 
  Check,
  Clock,
  AlertTriangle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  sharedWith?: string[];
  createdBy: string;
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
  onShare: (task: Task) => void;
}

const TaskCard = ({ task, onEdit, onDelete, onStatusChange, onShare }: TaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200';
      case 'medium': return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200';
      default: return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800';
      case 'in-progress': return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800';
      default: return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';
  const isDueToday = task.dueDate && new Date(task.dueDate).toDateString() === new Date().toDateString();

  return (
    <Card className={`transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/70 backdrop-blur-sm border-white/20 ${
      task.status === 'completed' ? 'opacity-75' : ''
    } ${isOverdue ? 'ring-2 ring-red-200' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className={`font-bold text-xl ${
              task.status === 'completed' 
                ? 'line-through text-gray-500' 
                : 'text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text'
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">{task.description}</p>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 rounded-full">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-md shadow-xl border-white/20">
              <DropdownMenuItem onClick={() => onEdit(task)} className="hover:bg-blue-50">
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onShare(task)} className="hover:bg-purple-50">
                Share Task
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(task.id)}
                className="text-red-600 hover:bg-red-50"
              >
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge className={`${getPriorityColor(task.priority)} font-semibold shadow-sm`}>
              {task.priority}
            </Badge>
            <Badge className={`${getStatusColor(task.status)} font-semibold shadow-sm`}>
              {task.status.replace('-', ' ')}
            </Badge>
            {task.sharedWith && task.sharedWith.length > 0 && (
              <Badge variant="outline" className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-700">
                <User className="mr-1 h-3 w-3" />
                Shared
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {task.dueDate && (
              <div className={`flex items-center text-sm px-3 py-1 rounded-full ${
                isOverdue ? 'text-red-600 bg-red-50' : 
                isDueToday ? 'text-orange-600 bg-orange-50' : 
                'text-gray-500 bg-gray-50'
              }`}>
                {isOverdue ? (
                  <AlertTriangle className="mr-1 h-3 w-3" />
                ) : (
                  <Calendar className="mr-1 h-3 w-3" />
                )}
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
            
            <Button
              size="sm"
              variant={task.status === 'completed' ? 'secondary' : 'outline'}
              onClick={() => onStatusChange(
                task.id, 
                task.status === 'completed' ? 'todo' : 'completed'
              )}
              className={`rounded-full shadow-sm transition-all duration-300 ${
                task.status === 'completed' 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'hover:bg-green-50 hover:text-green-700 hover:border-green-300'
              }`}
            >
              <Check className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
