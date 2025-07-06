
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X, Mail, User } from 'lucide-react';
import { Task } from './TaskCard';

interface ShareTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (taskId: string, emails: string[]) => void;
  task?: Task;
}

const ShareTaskDialog = ({ isOpen, onClose, onShare, task }: ShareTaskDialogProps) => {
  const [email, setEmail] = useState('');
  const [sharedEmails, setSharedEmails] = useState<string[]>(task?.sharedWith || []);

  const handleAddEmail = () => {
    if (email && !sharedEmails.includes(email)) {
      setSharedEmails([...sharedEmails, email]);
      setEmail('');
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setSharedEmails(sharedEmails.filter(e => e !== emailToRemove));
  };

  const handleShare = () => {
    if (task) {
      onShare(task.id, sharedEmails);
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEmail();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Task: {task?.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Share with (email addresses)</Label>
            <div className="flex space-x-2">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="colleague@example.com"
              />
              <Button onClick={handleAddEmail} disabled={!email}>
                <Mail className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
          
          {sharedEmails.length > 0 && (
            <div>
              <Label>Shared with:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {sharedEmails.map((email) => (
                  <Badge key={email} variant="secondary" className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{email}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => handleRemoveEmail(email)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleShare}>
              Share Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareTaskDialog;
