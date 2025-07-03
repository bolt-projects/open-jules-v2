import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { FeatureCard } from './FeatureCard';
import { EmptyFeatureState } from './EmptyStates';
import { NewFeatureDialog } from './NewFeatureDialog';
import { useProjectHistory } from '~/lib/persistence/useProjectHistory';
import { IconButton } from '~/components/ui/IconButton';
import type { Feature, Project } from './types';

export const ProjectView: React.FC<{ project: Project }> = ({ project }) => {
  const [newFeatureDialogOpen, setNewFeatureDialogOpen] = useState(false);
  const { addFeature, refreshProject, isProjectsLoading } = useProjectHistory(project.id);

  const handlePrejectRefresh = useCallback(async () => {
    await refreshProject(project.id);
  }, [project]);
  const handleDeleteBranch = useCallback(async (featureId: string) => {
    // await deleteFeature(featureId)
    console.log(featureId);
  }, []);
  const handleStatusChange = useCallback(async (featureId: string, status: Feature['status']) => {
    // await updateFeatureStatus(featureId,status)
    console.log(featureId, status);
  }, []);
  const handleMergeBranch = useCallback(async (featureId: string) => {
    // await mergeFeature(featureId)
    console.log(featureId);
  }, []);

  return (
    <div className="h-full grid grid-cols-4 gap-4">
      <div className="col-span-3 bg-white dark:bg-dark-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Features</h2>
          {project.features?.length && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setNewFeatureDialogOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              New Feature
            </motion.button>
          )}
        </div>

        {project.features.length === 0 ? (
          <EmptyFeatureState onClick={() => setNewFeatureDialogOpen(true)} />
        ) : (
          <div className="space-y-4">
            {project.features.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                onDeleteBranch={handleDeleteBranch}
                onStatusChange={handleStatusChange}
                onMergeBranch={handleMergeBranch}
              />
            ))}
          </div>
        )}

        <NewFeatureDialog
          open={newFeatureDialogOpen}
          onOpenChange={setNewFeatureDialogOpen}
          branches={project.branches}
          onCreateFeature={(newFeature) => {
            // Handle feature creation
            return addFeature(newFeature);
          }}
        />
      </div>

      <div className="bg-bolt-elements-background-depth-2 rounded-lg p-6">
        <h2 className=" flex items-center gap-2 text-xl font-semibold mb-4 text-bolt-elements-textPrimary">
          <span>Branches</span>
          <IconButton title="Refresh Branches" onClick={handlePrejectRefresh}>
            <div className="i-ph:arrow-counter-clockwise-thin" />
          </IconButton>
          <span>{isProjectsLoading ? 'Loading...' : project.branches.length}</span>
        </h2>
        <div className="space-y-3">
          {project.branches.map((branch, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3 hover:bg-bolt-elements-background-depth-3 rounded-lg cursor-pointer transition-theme"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm text-bolt-elements-textPrimary">{branch.name}</p>
                  <p className="text-bolt-elements-textTertiary text-xs">{branch.author}</p>
                </div>
                <span className="text-bolt-elements-textTertiary text-xs">{branch.updated}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
