import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const AddProjectDialog: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProject: (name: string, gitUrl: string) => void;
}> = ({ open, onOpenChange, onAddProject }) => {
  const [gitUrl, setGitUrl] = useState('');
  const [name, setName] = useState('');

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-dark-800 rounded-xl p-8 w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <Dialog.Title className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              Add New Project
            </Dialog.Title>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onAddProject(name, gitUrl);
                setGitUrl('');
                onOpenChange(false);
              }}
            >
              <div className="relative mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter A Project Name"
                  className="w-full text-gray-700 dark:text-gray-300 pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 3v12" />
                    <path d="M18 9a3 3 0 100-6 3 3 0 000 6z" />
                    <path d="M6 21a3 3 0 100-6 3 3 0 000 6z" />
                    <path d="M15 6h-4" />
                    <path d="M15 18h-4" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={gitUrl}
                  onChange={(e) => setGitUrl(e.target.value)}
                  placeholder="Enter Git URL"
                  className="w-full text-gray-700 dark:text-gray-300 pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Dialog.Close className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors">
                  Cancel
                </Dialog.Close>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Add Project
                </button>
              </div>
            </form>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
