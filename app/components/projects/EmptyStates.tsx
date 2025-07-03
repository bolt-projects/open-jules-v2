import { motion } from 'framer-motion';

export const EmptyFeatureState: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center p-12 bg-white dark:bg-dark-800 rounded-xl text-center"
  >
    <div className="w-24 h-24 mb-6 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center"></div>
    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">No features yet</h3>
    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
      Start developing new features by creating a feature branch.
    </p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg hover:opacity-90 transition-opacity"
    >
      Create New Feature
    </motion.button>
  </motion.div>
);

export const EmptyProjectsList: React.FC<{ onAddProject: () => void }> = ({ onAddProject }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto mt-12">
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 flex items-center justify-center"
      >
        <svg
          className="w-16 h-16 text-blue-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M13 7L11.8845 4.76892C11.5634 4.1268 11.4029 3.80573 11.1634 3.57116C10.9516 3.36373 10.6963 3.20597 10.4161 3.10931C10.0984 3 9.74021 3 9.02378 3H5.2C4.0799 3 3.51984 3 3.09202 3.21799C2.71569 3.40973 2.40973 3.71569 2.21799 4.09202C2 4.51984 2 5.0799 2 6.2V7M2 7H17.2C18.8802 7 19.7202 7 20.362 7.32698C20.9265 7.6146 21.3854 8.07354 21.673 8.63803C22 9.27976 22 10.1198 22 11.8V16.2C22 17.8802 22 18.7202 21.673 19.362C21.3854 19.9265 20.9265 20.3854 20.362 20.673C19.7202 21 18.8802 21 17.2 21H6.8C5.11984 21 4.27976 21 3.63803 20.673C3.07354 20.3854 2.6146 19.9265 2.32698 19.362C2 18.7202 2 17.8802 2 16.2V7Z" />
          <path d="M12 17V11M9 14H15" strokeLinecap="round" />
        </svg>
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100"
      >
        No projects yet
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto"
      >
        Get started by adding your first Git repository. You can track your projects, manage features, and collaborate
        with your team.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddProject}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Add Your First Project
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
          {[
            {
              icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M9 3H4.2C3.0799 3 2.51984 3 2.09202 3.21799C1.71569 3.40973 1.40973 3.71569 1.21799 4.09202C1 4.51984 1 5.0799 1 6.2V17.8C1 18.9201 1 19.4802 1.21799 19.908C1.40973 20.2843 1.71569 20.5903 2.09202 20.782C2.51984 21 3.0799 21 4.2 21H19.8C20.9201 21 21.4802 21 21.908 20.782C22.2843 20.5903 22.5903 20.2843 22.782 19.908C23 19.4802 23 18.9201 23 17.8V12M21 3.6V8.4C21 8.96005 21 9.24008 20.891 9.45399C20.7951 9.64215 20.6422 9.79513 20.454 9.89101C20.2401 10 19.9601 10 19.4 10H13.6C13.0399 10 12.7599 10 12.546 9.89101C12.3578 9.79513 12.2049 9.64215 12.109 9.45399C12 9.24008 12 8.96005 12 8.4V3.6C12 3.03995 12 2.75992 12.109 2.54601C12.2049 2.35785 12.3578 2.20487 12.546 2.10899C12.7599 2 13.0399 2 13.6 2H19.4C19.9601 2 20.2401 2 20.454 2.10899C20.6422 2.20487 20.7951 2.35785 20.891 2.54601C21 2.75992 21 3.03995 21 3.6Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
              title: 'Track Projects',
              description: 'Import your Git repositories and keep track of all your projects in one place.',
            },
            {
              icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M6 3V15M6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21C7.65685 21 9 19.6569 9 18M6 15C7.65685 15 9 16.3431 9 18M18 3V9M18 9C16.3431 9 15 10.3431 15 12C15 13.6569 16.3431 15 18 15C19.6569 15 21 13.6569 21 12C21 10.3431 19.6569 9 18 9Z"
                    strokeLinecap="round"
                  />
                </svg>
              ),
              title: 'Manage Features',
              description: 'Create and track feature branches, manage development progress efficiently.',
            },
            {
              icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M15 19C15 16.7909 12.3137 15 9 15C5.68629 15 3 16.7909 3 19M9 12C6.79086 12 5 10.2091 5 8C5 5.79086 6.79086 4 9 4C11.2091 4 13 5.79086 13 8C13 10.2091 11.2091 12 9 12ZM21 19C21 16.7909 18.3137 15 15 15C14.7773 15 14.5587 15.0116 14.3447 15.0343M15 12C12.7909 12 11 10.2091 11 8C11 5.79086 12.7909 4 15 4C17.2091 4 19 5.79086 19 8C19 10.2091 17.2091 12 15 12Z"
                    strokeLinecap="round"
                  />
                </svg>
              ),
              title: 'Collaborate',
              description: 'Work together with your team, review changes, and keep everyone in sync.',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-6 bg-white dark:bg-dark-800 rounded-xl"
            >
              <div className="w-12 h-12 mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </motion.div>
);
