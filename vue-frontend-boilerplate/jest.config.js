const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.vue$": "vue-jest",
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "json", "vue"],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: "<rootDir>/" }),
        "^@/(.*)$": "<rootDir>/src/$1",
    },
};
