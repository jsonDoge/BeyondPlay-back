const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.redis-mock.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  verbose: true,
};

export default config;
