// Type definitions
export interface Feature {
  id: string;
  name: string;
  branchRef: string;
  status: 'in-progress' | 'completed' | 'pending';
  description?: string;
  branchFrom: string;
  head: string;
}

export interface Branch {
  name: string;
  author: string;
  updated: string;
  commitHash?: string;
}

export interface Project {
  id: string;
  name: string;
  gitUrl: string;
  features: Feature[];
  branches: Branch[];
  lastUpdated?: string;
  description?: string;
}

export interface NewFeature {
  name: string;
  branchRef: string;
  description: string;
  branchFrom: string;
  srcOid?: string;
}
