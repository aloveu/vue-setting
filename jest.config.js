module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    transform: {
        '.*\\.(vue)$': 'vue-jest',
        '^.+\\.ts?$': 'ts-jest',
    },
    testMatch: ['**/tests/**/*.spec.{j,t}s?(x)'],
};
