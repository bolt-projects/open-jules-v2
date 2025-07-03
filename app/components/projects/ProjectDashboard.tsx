import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EmptyProjectsList } from './EmptyStates';
import { ProjectCard } from './ProjectCard';
import { Breadcrumb } from './Breadcrumb';
import { ProjectView } from './ProjectView';
import { AddProjectDialog } from './AddProjectDialog';
import { useProjectHistory } from '~/lib/persistence/useProjectHistory';
import type { Project } from './types';

export const ProjectDashboard = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { addNewProject, projects, refreshProject, deleteProject, editProject } = useProjectHistory(
    selectedProject?.id,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleProjectAdd = useCallback(
    async (name: string, gitUrl: string) => {
      const project: Project = {
        id: gitUrl,
        name: `${name}`,
        gitUrl,
        features: [],
        branches: [],
      };
      await addNewProject(project);
      await refreshProject(gitUrl);
    },
    [addNewProject],
  );

  return (
    <div className="min-h-screen w-full bg-bolt-elements-background-depth-1">
      <AnimatePresence mode="wait">
        {!selectedProject ? (
          <motion.div
            key="projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full px-4 py-8 md:px-8"
          >
            {/* Header Container - Full width with centered content */}
            <div className="w-full mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Projects</h1>
                {projects?.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                    onClick={() => setDialogOpen(true)}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Add Project
                  </motion.button>
                )}
              </div>

              {/* Content Container */}
              <div className="w-full">
                {projects.length === 0 ? (
                  <EmptyProjectsList onAddProject={() => setDialogOpen(true)} />
                ) : (
                  <div className="w-full flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
                      {projects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          onClick={() => setSelectedProject(project)}
                          onDelete={(id) => {
                            deleteProject(id);
                          }}
                          onEdit={(id, newName) => {
                            editProject(id, { ...project, name: newName });
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="project-details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full px-4 py-8 md:px-8"
          >
            <div className="w-full mx-auto">
              <Breadcrumb project={selectedProject} onBack={() => setSelectedProject(null)} />
              <ProjectView project={selectedProject} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AddProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAddProject={(name, gitUrl) => {
          handleProjectAdd(name, gitUrl);
        }}
      />
    </div>
  );
};
