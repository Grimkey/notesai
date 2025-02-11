module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/tests"],
    moduleFileExtensions: ["ts", "tsx", "js"],
    testMatch: ["**/tests/**/*.test.ts"],
    moduleNameMapper: {
        "^electron$": "<rootDir>/tests/electron/__mocks__/electron.ts",
    },
  };