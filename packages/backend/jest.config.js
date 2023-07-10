export const roots = ['<rootDir>/tests'];
export const collectCoverage = true;
export const collectCoverageFrom = [
  '**/*.{js,jsx}',
  '!**/node_modules/**',
  '!**/vendor/**',
];
export const coverageDirectory = 'coverage';
export const transform = {
  '^.+\\.(js|jsx)?$': 'babel-jest',
};
export const moduleNameMapper = {
  '^@/(.*)$': '<rootDir>/src/$1',
};
export const setupFilesAfterEnv = ['<rootDir>/jest.setup.js'];
export const coverageReporters = ['json', 'lcov', 'text', 'clover'];
export const watchman = true;
export const snapshotSerializers = ['jest-serializer-path'];
