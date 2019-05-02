module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb/base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "allowTernary": true,
        "indent": ["error", 2],
        "space-before-blocks": "error",
        "space-infix-ops": ["error", {
            "int32Hint": false
        }],
        "padded-blocks": ["error", "always"],
        "space-in-parens": ["error", "always"],
        "array-bracket-spacing": ["error", "always"],
        "object-curly-spacing": ["error", "always"],
        "no-alert": 0,
        "prefer-const": ["error", {
            "destructuring": "any",
            "ignoreReadBeforeAssign": false
        }],
        "object-shorthand": ["error", "always", {
            "avoidQuotes": true
        }],
        "array-callback-return": "error",
        "prefer-destructuring": ["error", {
            "VariableDeclarator": {
                "array": false,
                "object": true
            },
            "AssignmentExpression": {
                "array": true,
                "object": true
            }
        }, {
            "enforceForRenamedProperties": false
        }],
        "function-paren-newline": ["error", {
            "minItems": 3
        }],
        "spaced-comment": ["error", "always", {
            "line": {
                "markers": ["/"],
                "exceptions": ["-", "+"]
            },
            "block": {
                "markers": ["!"],
                "exceptions": ["*"],
                "balanced": true
            }
        }],
        "func-style": ["error", "declaration", {
            "allowArrowFunctions": true
        }],
        "prefer-spread": "error",
        "padded-blocks": ["error", {
            "blocks": "always",
            "classes": "always",
            "switches": "always"
        }]
    }
};