module.exports = {
  rootDir: '../',
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest', { configFile: './jest/babel.config.js' }]
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/__mocks__/file-mock.js',
    '\\.svg': '<rootDir>/jest/__mocks__/svgr-mock.js',
    '^@reach/router(.*)': '<rootDir>/node_modules/@gatsbyjs/reach-router$1'
  },
  testPathIgnorePatterns: ['node_modules', '.cache', 'public', 'coverage'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: ''
  },
  setupFiles: ['<rootDir>/jest/loadershim.js'],
  setupFilesAfterEnv: ['<rootDir>/jest/setup-test-env.ts'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/@types/**/*'],
  testEnvironment: 'jsdom'
}
