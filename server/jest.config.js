/* eslint-disable import/no-extraneous-dependencies */
/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    typeguards: "<rootDir>/../types/typeguards.ts",
  },
};
