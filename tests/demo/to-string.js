var toString = function (variable) {
    return Array.isArray(variable)
        ? "[" + variable.toString() + "]"
        : typeof variable === 'object' && variable !== null
            ? JSON.stringify(variable)
            : typeof variable === 'symbol'
                ? variable.description || ''
                : variable === null
                    ? 'null'
                    : typeof variable === 'undefined'
                        ? 'undefined'
                        : variable.toString();
};
console.log(toString({
    a: {
        b: {
            c: 1
        }
    }
}));
