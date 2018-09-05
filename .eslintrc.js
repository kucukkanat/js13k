module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "mocha": true
  },
  "extends": ["eslint:recommended", "plugin:prettier/recommended"],
  "plugins": [
    "prettier"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "rules": {
    "comma-dangle": 0,
    "arrow-parens": 0,
    "no-console": 0,
    "prettier/prettier": ["error", { "trailingComma": "es5", "singleQuote": true }]
  }
};