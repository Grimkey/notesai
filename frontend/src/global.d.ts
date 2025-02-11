export {};

declare global {
  interface Window {
    electron: {
      getNotes: () => Promise<string[]>;
      readNote: (filename: string) => Promise<string>;
      saveNote: (filename: string, content: string) => Promise<void>;
      createNote: () => Promise<string>;
      deleteNote: (filename: string) => Promise<void>;
    };
  }
}