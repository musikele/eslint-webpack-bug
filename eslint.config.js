const globals = require("globals");
const pluginReact = require("eslint-plugin-react");
const eslintConfigPrettier = require("eslint-config-prettier");
const pluginJest = require("eslint-plugin-jest");
const hooksPlugin = require("eslint-plugin-react-hooks");
const jsxA11y = require("eslint-plugin-jsx-a11y");
const importPlugin = require("eslint-plugin-import");
const js = require("@eslint/js");
const storybook = require("eslint-plugin-storybook");

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
    {
        ignores: ["coverage/**", "dist/**", "tests/mock/**", "!.storybook"],
    },
    {
        settings: {
            react: {
                version: "detect",
            },
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                $V: true,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },
    js.configs.recommended,
    pluginReact.configs.flat.recommended,
    eslintConfigPrettier,
    pluginJest.configs["flat/recommended"],
    ...storybook.configs["flat/recommended"],
    {
        ...importPlugin.flatConfigs.recommended,
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: "module",
        },
        settings: {
            "import/resolver": {
                node: {
                    extensions: [".js", ".jsx"],
                },
                alias: {
                    map: [
                        ["scripts", "./scripts"],
                        ["tests", "./tests"],
                        ["src", "./src"],
                        ["config", "./config"],
                    ],
                    extensions: [".js", ".jsx"],
                },
            },
        },
    },
    {
        plugins: {
            "react-hooks": hooksPlugin,
        },
        rules: hooksPlugin.configs.recommended.rules,
    },
    {
        plugins: {
            "jsx-a11y": jsxA11y,
        },
    },
    {
        rules: {
            "jest/expect-expect": "warn",
            "no-unused-vars": "warn",
            "react/display-name": "warn",
            "jest/no-identical-title": "warn",
            "jest/no-standalone-expect": "warn",
            "react/prop-types": "warn",
            "jest/no-conditional-expect": "warn",
            "jest/valid-expect": "warn",
            "jest/no-done-callback": "warn",
            "react/jsx-key": "warn",
            "jest/no-alias-methods": "warn",
            "jest/valid-title": "warn",
            "prefer-rest-params": "error",
            curly: "error",
            "no-console": "warn",
            "prefer-arrow-callback": "error",
            "consistent-return": "error",
            "no-new": "error",
            "class-methods-use-this": "warn",
            "jsx-a11y/control-has-associated-label": "warn",
            "no-shadow": "error",
            "no-param-reassign": "error",
            "no-await-in-loop": "error",
            "no-template-curly-in-string": "error",
            "prefer-const": "error",
            "no-restricted-syntax": "error",
            "no-cond-assign": "error",
        },
    },
];
