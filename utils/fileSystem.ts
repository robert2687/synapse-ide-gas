
import { type FileSystemNode, type File } from '../types';

export function findFile(nodes: FileSystemNode[], path: string): File | null {
  for (const node of nodes) {
    if (node.path === path && node.type === 'file') {
      return node;
    }
    if (node.type === 'directory') {
      const found = findFile(node.children, path);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

export function updateFileContent(nodes: FileSystemNode[], path: string, newContent: string): FileSystemNode[] {
    return nodes.map(node => {
        if (node.path === path && node.type === 'file') {
            return { ...node, content: newContent };
        }
        if (node.type === 'directory') {
            return { ...node, children: updateFileContent(node.children, path, newContent) };
        }
        return node;
    });
}
