import { motion } from 'framer-motion';
import type { Project } from './types';

export const Breadcrumb: React.FC<{ project: Project; onBack: () => void }> = ({ project, onBack }) => (
  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-8">
    <button
      onClick={onBack}
      className="flex bg-transparent items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-200"
    >
      <span className="i-ph:arrow-left-light w-4 h-4" />
      <span>Projects</span>
    </button>
    <span className="text-gray-400 dark:text-gray-600">/</span>
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-semibold bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent"
    >
      {project.name}
    </motion.span>
  </motion.div>
);
