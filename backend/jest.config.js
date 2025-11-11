export default {
    testEnvironment: "node",
    roots: ["<rootDir>/src/tests"],
    verbose: true,
    transform: {},
    moduleFileExtensions: ["js", "json"],
    setupFilesAfterEnv: ["<rootDir>/src/tests/setup/jest.setup.js"],
};
