import fileManager from "../../electron/fileManager";
import fs from "fs";
import path from "path";
import sinon from "sinon";

const testDir = path.join(__dirname, "test-notes", "notes");

let clock: sinon.SinonFakeTimers;
let statStub: sinon.SinonStub;

beforeAll(() => {
  console.log(`[Test Setup] Creating test directory at: ${testDir}`);
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }

  const frozenTime = new Date("2025-01-01T12:00:00Z").getTime();
  clock = sinon.useFakeTimers(frozenTime);

  statStub = sinon.stub(fs, "statSync").callsFake((filePath) => {
    return {
      isFile: () => true,
      isDirectory: () => false,
      birthtimeMs: frozenTime, // Force a fixed timestamp
    } as fs.Stats;
  });
});

afterAll(() => {
  console.log(`[Test Cleanup] Removing test directory: ${testDir}`);
  fs.rmSync(testDir, { recursive: true, force: true });
  clock.restore();
  statStub.restore(); // Restore `fs.statSync`
});

beforeEach(() => {
  fs.rmSync(testDir, { recursive: true, force: true });
  fs.mkdirSync(testDir, { recursive: true });
});

describe("FileManager Tests", () => {
  test("should create a new note with a valid frozen timestamp", () => {
    const filename = fileManager.createNote();
    console.log(`[Test] Created file: ${filename}`);

    const filePath = path.join(testDir, filename);
    expect(fs.existsSync(filePath)).toBe(true);

    // ✅ Verify timestamps
    const files = fileManager.getNotes();
    const note = files.find((file) => file.name === filename);

    expect(note).toBeDefined();
    expect(note!.createdAt).toBe(new Date("2025-01-01T12:00:00Z").getTime());
  });

  test("should rename a note", () => {
    const oldFilename = fileManager.createNote();
    const newFilename = `renamed-${oldFilename}`;

    fileManager.renameNote(oldFilename, newFilename);
    const files = fileManager.getNotes();

    expect(files.some((file) => file.name === newFilename)).toBe(true);
    expect(files.some((file) => file.name === oldFilename)).toBe(false);
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