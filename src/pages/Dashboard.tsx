import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import TaskCard, { Task } from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import ShareTaskDialog from '@/components/ShareTaskDialog';
import Settings from '@/components/Settings';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Draft and finalize the Q4 project proposal for client review',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date().toISOString(),
    createdBy: 'preethibby1210@gmail.com',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Team standup meeting',
    description: 'Daily standup with development team',
    status: 'completed',
    priority: 'medium',
    dueDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    createdBy: 'preethibby1210@gmail.com',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Code review for authentication module',
    description: 'Review pull request #234 for OAuth implementation',
    status: 'todo',
    priority: 'high',
    dueDate: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    sharedWith: ['alice@example.com'],
    createdBy: 'bob@example.com',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Update documentation',
    description: 'Update API documentation with new endpoints',
    status: 'todo',
    priority: 'low',
    dueDate: new Date(Date.now() - 86400000).toISOString(), // Overdue
    createdBy: 'preethibby1210@gmail.com',
    createdAt: new Date().toISOString(),
  },
];

const mockUser = {
  name: 'Preethi',
  email: 'preethibby1210@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
};

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const getFilteredTasks = () => {
    const today = new Date().toDateString();
    
    switch (activeFilter) {
      case 'today':
        return tasks.filter(task => 
          task.dueDate && new Date(task.dueDate).toDateString() === today
        );
      case 'overdue':
        return tasks.filter(task => 
          task.dueDate && 
          new Date(task.dueDate) < new Date() && 
          task.status !== 'completed'
        );
      case 'shared':
        return tasks.filter(task => task.sharedWith && task.sharedWith.length > 0);
      default:
        return tasks;
    }
  };

  const getTaskCounts = () => {
    const today = new Date().toDateString();
    return {
      all: tasks.length,
      today: tasks.filter(task => 
        task.dueDate && new Date(task.dueDate).toDateString() === today
      ).length,
      overdue: tasks.filter(task => 
        task.dueDate && 
        new Date(task.dueDate) < new Date() && 
        task.status !== 'completed'
      ).length,
      shared: tasks.filter(task => task.sharedWith && task.sharedWith.length > 0).length,
    };
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsTaskFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsTaskFormOpen(true);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (taskData.id) {
      // Update existing task
      setTasks(prev => prev.map(task => 
        task.id === taskData.id ? { ...task, ...taskData } : task
      ));
      toast({
        title: "Task updated",
        description: "Your task has been successfully updated.",
      });
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskData.title!,
        description: taskData.description,
        status: taskData.status!,
        priority: taskData.priority!,
        dueDate: taskData.dueDate,
        createdBy: mockUser.email,
        createdAt: new Date().toISOString(),
      };
      setTasks(prev => [newTask, ...prev]);
      toast({
        title: "Task created",
        description: "Your new task has been successfully created.",
      });
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "The task has been permanently deleted.",
    });
  };

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
    toast({
      title: "Task status updated",
      description: `Task marked as ${status.replace('-', ' ')}.`,
    });
  };

  const handleShareTask = (task: Task) => {
    setSelectedTask(task);
    setIsShareDialogOpen(true);
  };

  const handleShare = (taskId: string, emails: string[]) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, sharedWith: emails } : task
    ));
    toast({
      title: "Task shared",
      description: `Task shared with ${emails.length} people.`,
    });
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  const filteredTasks = getFilteredTasks();
  const taskCounts = getTaskCounts();

  if (isSettingsOpen) {
    return (
      <Settings 
        user={mockUser} 
        onClose={handleCloseSettings}
        onLogout={onLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header user={mockUser} onLogout={onLogout} onOpenSettings={handleOpenSettings} />
      
      <div className="flex">
        <Sidebar 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onCreateTask={handleCreateTask}
          taskCounts={taskCounts}
        />
        
        <main className="flex-1 p-8">
          <div className="mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {activeFilter === 'all' && 'All Tasks'}
                {activeFilter === 'today' && 'Due Today'}
                {activeFilter === 'overdue' && 'Overdue Tasks'}
                {activeFilter === 'shared' && 'Shared with Me'}
              </h2>
              <p className="text-gray-600 text-lg">
                {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} to manage
              </p>
            </div>
          </div>
          
          <div className="grid gap-6">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </div>
                  <p className="text-gray-500 text-xl mb-2">No tasks found</p>
                  <p className="text-gray-400">Create your first task to get started</p>
                </div>
              </div>
            ) : (
              filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                  onShare={handleShareTask}
                />
              ))
            )}
          </div>
        </main>
      </div>
      
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSave={handleSaveTask}
        task={selectedTask}
      />
      
      <ShareTaskDialog
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        onShare={handleShare}
        task={selectedTask}
      />
    </div>
  );
};

export default Dashboard;
