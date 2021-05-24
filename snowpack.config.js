export default {
    plugins: ['@snowpack/plugin-typescript'],
    exclude: [
        '**/node_modules/**/*',
        '**/Dockerfile',
        '**/azure-pipelines.yml',
        '**/jest.config.js',
        '**/package.json',
        '**/package-lock.json',
        '**/tsconfig.json',
        '**/snowpack.config.js',
        '**/dist/**/*',
        '**/coverage/**/*',
    ]
};