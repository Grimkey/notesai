import fileManager from "../../electron/fileManager";
import fs from "fs";
import path from "path";

const testDir = path.join(__dirname, "test-notes", "notes");


// Setup a test directory
beforeAll(() => {
  console.log(`[Test Setup] Creating test directory at: ${testDir}`);
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
});

// Cleanup after tests
afterAll(() => {
  console.log(`[Test Cleanup] Removing test directory: ${testDir}`);
  fs.rmSync(testDir, { recursive: true, force: true });
});

describe("FileManager Tests", () => {
  test("should create a new note", () => {
    const filename = fileManager.createNote();
    console.log(`[Test] Created file: ${filename}`);
  
    const filePath = path.join(testDir, filename);
    console.log(`[Test] Expected file path: ${filePath}`);
    console.log(`[Test] File exists before assertion: ${fs.existsSync(filePath)}`);
 
    expect(filename).toMatch(/note-\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d+Z\.md/);
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test("should list markdown files", () => {
    const files = fileManager.getNotes();
    expect(Array.isArray(files)).toBe(true);
    expect(files.some((file) => file.endsWith(".md"))).toBe(true);
  });

  test("should read a note", () => {
    const filename = fileManager.createNote();
    const content = fileManager.readNote(filename);
    expect(content).toContain("# New Note");
  });

  test("should save a note", () => {
    const filename = fileManager.createNote();
    const newContent = "# Updated Content";
    fileManager.saveNote(filename, newContent);
    const updatedContent = fileManager.readNote(filename);
    expect(updatedContent).toBe(newContent);
  });

  test("should delete a note", () => {
    const filename = fileManager.createNote();
    fileManager.deleteNote(filename);
    expect(fs.existsSync(path.join(testDir, filename))).toBe(false);
  });
});