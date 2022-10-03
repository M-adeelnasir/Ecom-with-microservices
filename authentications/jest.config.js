/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testMatch: ['**/**/*.test.ts'],
  forceExit: true,
  setupFilesAfterEnv: [
    "./src/test/setup.ts"
  ]
  // clearMocks:true
};
