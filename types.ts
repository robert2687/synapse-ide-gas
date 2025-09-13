// Fix: Define File, Directory, and FileSystemNode types for the application's file system model.
export interface File {
  type: 'file';
  name: string;
  path: string;
  content: string;
}

export interface Directory {
  type: 'directory';
  name: string;
  path: string;
  children: FileSystemNode[];
}

export type FileSystemNode = File | Directory;

// Fix: Define ChatMessage type for the AI Assistant component.
export interface ChatMessage {
    id: number;
    sender: 'user' | 'ai';
    text: string;
    isLoading?: boolean;
}

// Fix: Define GitStatus type for version control features.
export interface GitStatus {
  staged: string[];
  unstaged: string[];
  untracked: string[];
}
