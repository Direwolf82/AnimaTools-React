var app;
(function (app) {
    var miscelaneous;
    (function (miscelaneous) {
        var Utils = (function () {
            function Utils() {
            }
            Utils.uuid = function () {
                var i, random;
                var uuid = '';
                for (i = 0; i < 32; i++) {
                    random = Math.random() * 16 | 0;
                    if (i === 8 || i === 12 || i === 16 || i === 20) {
                        uuid += '_';
                    }
                    if (i === 12) {
                        uuid += 4
                            .toString(16);
                    }
                    else {
                        if (i === 16) {
                            uuid += random & 3 | 8;
                        }
                        else {
                            uuid += random
                                .toString(16);
                        }
                    }
                }
                return uuid;
            };
            Utils.pluralize = function (count, word) {
                if (count === 1) {
                    return word;
                }
                else {
                    return word + 's';
                }
            };
            Utils.store = function (namespace, data) {
                if (data) {
                    return localStorage.setItem(namespace, JSON.stringify(data));
                }
                var store = localStorage.getItem(namespace);
                return (store && JSON.parse(store)) || [];
            };
            Utils.extend = function () {
                var objs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    objs[_i - 0] = arguments[_i];
                }
                var newObj = {};
                for (var i = 0; i < objs.length; i++) {
                    var obj = objs[i];
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            newObj[key] = obj[key];
                        }
                    }
                }
                return newObj;
            };
            return Utils;
        }());
        miscelaneous.Utils = Utils;
    })(miscelaneous = app.miscelaneous || (app.miscelaneous = {}));
})(app || (app = {}));
