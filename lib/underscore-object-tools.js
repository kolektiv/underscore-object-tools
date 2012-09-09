var _ = require('underscore');

function flatten (obj, target, prefix) {
    target = target || {};
    prefix = prefix || '';

    _.each(obj, function (val, key) {
        var pre = prefix === '' 
                ? key 
                : prefix + '.' + key;

        if (!_.isObject(val)) {
            target[pre] = val;
        } else {
            flatten(val, target, pre);
        }
    });

    return target;
};

function unflatten (obj) {
    var target = {};
    var current = target;
    
    _.each(obj, function (val, key) {
        var parts = key.split('.');
        
        while (parts.length > 1) {
            var part = parts.shift();
            
            if (!current[part]) {
                current[part] = {};
            }
            
            current = current[part];
        }
        
        current[parts.shift()] = isNaN(val) 
            ? val 
            : +val;
        current = target;
    });
    
    return target;
};

module.exports = {
    flatten: flatten,
    unflatten: unflatten
};
