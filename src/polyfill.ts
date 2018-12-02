export function is_scalar(mixedVar) { // eslint-disable-line camelcase
    //  discuss at: http://locutus.io/php/is_scalar/
    // original by: Paulo Freitas
    //   example 1: is_scalar(186.31)
    //   returns 1: true
    //   example 2: is_scalar({0: 'Kevin van Zonneveld'})
    //   returns 2: false

    return (/boolean|number|string/).test(typeof mixedVar)
}

//Polyfill
if (!Array.isArray) {
    Array.prototype['isArray'] = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}