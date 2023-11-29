import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  clearMocks: true,
  preset: "ts-jest",
  testMatch: ["**/**/*.spec.ts"],
  coverageProvider: "v8",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "/build/", "/dist/", "/prisma/"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};

export default config;
