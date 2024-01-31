const config = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ["<rootDir>/src"],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    // '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    // '^@/components/(.*)$': '<rootDir>/src/components/$1',
    // '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    // '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    // '^@/config/(.*)$': '<rootDir>/src/config/$1',
    // '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Indicates whether the coverage information should be collected while executing the test
  // collectCoverage: true,

  // The directory where Jest should output its coverage files
  // coverageDirectory: 'coverage',

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: [
  //   'src/**/*.{js,jsx,ts,tsx}',
  //   '!src/**/*.d.ts',
  //   '!src/index.tsx',
  //   '!src/reportWebVitals.ts',
  //   '!src/setupTests.ts',
  // ],

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: [
    // "@testing-library/react/cleanup-after-each",
    // "@testing-library/jest-dom/extend-expect",
  ],
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/jest.setup.js"],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;
