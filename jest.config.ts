const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.redis-mock.ts'],
  verbose: true,
};

export default config;