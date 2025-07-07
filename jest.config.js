module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@whttlr/ui-(.*)$': '<rootDir>/packages/$1/src',
  },
  collectCoverageFrom: [
    'packages/*/src/**/*.{ts,tsx}',
    '!packages/*/src/**/*.stories.{ts,tsx}',
    '!packages/*/src/**/*.test.{ts,tsx}',
  ],
};
