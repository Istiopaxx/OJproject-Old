module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "semi": [
            1,
            "always"
        ],
        // suppress errors for missing 'import React' in files
        "react/react-in-jsx-scope": "off",
        // allow jsx syntax in js files (for next.js project)
        //should add ".ts" if typescript project
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/prop-types": "off",
        "no-unused-vars": 0,
        "no-use-before-define": 1,
        
    }
};
