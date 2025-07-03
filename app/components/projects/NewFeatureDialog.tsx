import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Branch, NewFeature } from './types';

function createBranchName(featureName: string): string {
  return (
    featureName
      // Convert to lowercase
      .toLowerCase()
      // Replace special characters and spaces with hyphens
      .replace(/[^a-z0-9]+/g, '-')
      // Remove leading and trailing hyphens
      .replace(/^-+|-+$/g, '')
      // Limit length to 50 characters (common git practice)
      .slice(0, 50)
      // Add feature prefix
      .replace(/^/, 'feature/')
  );
}

export const NewFeatureDialog: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  branches: Branch[];
  onCreateFeature: (feature: NewFeature) => Promise<any>;
}> = ({ open, onOpenChange, branches, onCreateFeature }) => {
  const [featureData, setFeatureData] = useState<NewFeature>({
    name: '',
    description: '',
    branchFrom: 'main',
    branchRef: createBranchName(`bolt-feature-${Date.now()}`),
  });

  const [isLoading, setIsLoading] = useState(false);

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
              Create New Feature
            </Dialog.Title>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoading(true);
                onCreateFeature({
                  ...featureData,
                  branchRef: createBranchName(featureData.name),
                }).finally(() => {
                  setFeatureData({
                    name: '',
                    description: '',
                    branchFrom: 'main',
                    branchRef: createBranchName(`bolt-feature-${Date.now()}`),
                  });
                  onOpenChange(false);
                  setIsLoading(false);
                });
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Feature Name
                  </label>
                  <input
                    type="text"
                    value={featureData.name}
                    onChange={(e) => setFeatureData({ ...featureData, name: e.target.value })}
                    placeholder="Enter feature name"
                    className="w-full text-gray-700 dark:text-gray-300 px-4 py-3 rounded-lg bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea
                    value={featureData.description}
                    onChange={(e) => setFeatureData({ ...featureData, description: e.target.value })}
                    placeholder="Describe the feature"
                    className="w-full text-gray-700 dark:text-gray-300 px-4 py-3 rounded-lg bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Branch From</label>
                  <select
                    value={featureData.branchFrom}
                    onChange={(e) => {
                      const srcOid = branches.find((b) => b.name === e.target.value)?.commitHash;
                      setFeatureData({ ...featureData, branchFrom: e.target.value, srcOid });
                    }}
                    className="w-full px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    {branches.map((branch) => (
                      <option key={branch.name} value={branch.name}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Dialog.Close className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-200 rounded-lg transition-colors">
                  Cancel
                </Dialog.Close>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  {isLoading ? 'Creating...' : 'Create Feature'}
                </button>
              </div>
            </form>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
