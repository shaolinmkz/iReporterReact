module.exports = {
  coverageDirectory: 'coverage',
  setupFiles: ['<rootDir>/enzyme.config.js'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/', '/src/__tests__/assetsTransformer.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/assets/img'],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!jest.config.js',
    '!webpack.config.js',
    '!**/src/app/index.jsx',
    '!**/src/app/App.jsx',
    '!**/src/app/routes.jsx',
    '!**/coverage/**',
    '!**/src/__tests__/**',
    '!**/src/components/GoogleMapPlaces.jsx',
    '!**/server.js',
    '!**/dist/**'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg|css)$': '<rootDir>/src/__tests__/assetsTransformer.js'
  },
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
