module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.ts',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.ts',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
        diagnostics: {
          ignoreCodes: ['TS2739'],
        },
      },
    ],
    '^.+\\.(png|jpg|jpeg|gif|svg)$': 'jest-transform-stub',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};
