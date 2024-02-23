module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    moduleNameMapper: {
        '^query-string$': '<rootDir>/node_modules/query-string/index.js',
      },
      transformIgnorePatterns: ["/node_modules/(?!query-string)/"],
}