// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  silent: true,
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "./tsconfig.json" }],
  },
  transformIgnorePatterns: ["/node_modules/", "\\.css$"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
  },
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  watchPlugins: [],
};
