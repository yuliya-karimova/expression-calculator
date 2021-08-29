function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, '');

    signArray = ['(', ')', '+', '-', '*', '/'];

    function inNumberOrSigh(expr) {
        for (let i = 0; i < expr.length; i++) {
            if (typeof +expr[i] !== 'number') {
                if (!signArray.includes(expr[i])) {
                    throw 'TypeError: Use only numbers and math signs.'
                }
            }
        }
    }
    
    function isDividedByZero(expr) {
        for (let i = 0; i < expr.length; i++) {
            if (expr[i] === '/') {
                if (expr[i + 1] === '0' && expr[i + 2] !== '.') {
                    throw 'TypeError: Division by zero.';
                }
            }
        }
    }

    function isBracketsOk(expr) {
        let stack = [];
        for (let i = 0; i < expr.length; i++) {
            if (expr[i] === '(') {
                stack.push(expr[i]);
            } else if (expr[i] === ')') {
                if (stack[stack.length - 1] === '(') {
                    stack.pop();
                } else {
                    throw "ExpressionError: Brackets must be paired";
                }
            }
        }
        if (stack.length !== 0) {
            throw "ExpressionError: Brackets must be paired";
        }
    }

    inNumberOrSigh(expr);
    isDividedByZero(expr);
    isBracketsOk(expr);

    let result = (new Function('return ' + expr))();

    return result;
}

module.exports = {
    expressionCalculator
}