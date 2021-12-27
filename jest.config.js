module.exports = {
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: ['/node_modules', '/.next'],
	moduleDirectories: ['node_modules', 'src'],
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.ts(x)?', '!src/**/stories.tsx', '!src/pages/**/*.ts', '!src/styles/**/*.ts', '!src/utils/apollo.ts'],
	setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
	modulePaths: ['<rootDir>/src/', '<rootDir>/.jest']
};