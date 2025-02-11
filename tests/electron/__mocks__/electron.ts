import path from "path";

const testNotesPath = path.resolve(__dirname, "../test-notes");

export const app = {
  getPath: jest.fn(() => testNotesPath), 
};