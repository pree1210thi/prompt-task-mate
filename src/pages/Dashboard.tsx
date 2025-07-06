import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import TaskCard, { Task } from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import ShareTaskDialog from '@/components/ShareTaskDialog';
import Settings from '@/components/Settings';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const getFilteredTasks = () => {
    const today = new Date().toDateString();
    let filtered = tasks;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    switch (activeFilter) {
      case 'today':
        return filtered.filter(task => 
          task.dueDate && new Date(task.dueDate).toDateString() === today
        );
      case 'overdue':
        return filtered.filter(task => 
          task.dueDate && 
          new Date(task.dueDate) < new Date() && 
          task.status !== 'completed'
        );
      case 'shared':
        return filtered.filter(task => task.sharedWith && task.sharedWith.length > 0);
      default:
        return filtered;
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

  const getCompletionStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    const inProgress = tasks.filter(task => task.status === 'in-progress').length;
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, inProgress, completionPercentage };
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
  const completionStats = getCompletionStats();

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
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/70 backdrop-blur-sm border-white/30 focus:border-blue-300 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Welcome Banner with Completion Status */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-6 lg:mb-0">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    Welcome to TaskFlow, {mockUser.name}! 🚀
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Stay organized and boost your productivity
                  </p>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 min-w-[300px]">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Overall Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">Completion Rate</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                          {completionStats.completionPercentage}%
                        </span>
                      </div>
                      <Progress value={completionStats.completionPercentage} className="h-3 bg-gray-200" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-blue-600">{completionStats.total}</div>
                        <div className="text-xs text-gray-600">Total</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-green-600">{completionStats.completed}</div>
                        <div className="text-xs text-gray-600">Done</div>
                      </div>
                      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-orange-600">{completionStats.inProgress}</div>
                        <div className="text-xs text-gray-600">In Progress</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks Section Header */}
          <div className="mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {activeFilter === 'all' && 'All Tasks'}
                {activeFilter === 'today' && 'Due Today'}
                {activeFilter === 'overdue' && 'Overdue Tasks'}
                {activeFilter === 'shared' && 'Shared with Me'}
              </h2>
              <p className="text-gray-600 text-lg">
                {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} 
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
          </div>
          
          {/* Tasks Grid */}
          <div className="grid gap-6">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </div>
                  <p className="text-gray-500 text-xl mb-2">
                    {searchQuery ? `No tasks found matching "${searchQuery}"` : 'No tasks found'}
                  </p>
                  <p className="text-gray-400">
                    {searchQuery ? 'Try adjusting your search terms' : 'Create your first task to get started'}
                  </p>
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
