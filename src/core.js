function domglue(selector, data, options) {
    return new domglue.init(selector, data, options);
}

// initialization method
domglue.init = function(selector, data, options) {
	
    // sort instance options
    options = extend(domglue.settings, options, true);

    // if selector is an object we assume HTML Element or Array of elements
    var target = isObject(selector) ? selector : domglue.query(selector);

    // an object to store elements that are binded to data
    this[0] = {};

    // store the data
    this[1] = data;

    // bind DOM to data 
    domglue.bind(this, target, data, options); 

    // extend self with data based methods
    domglue.extend(this);

    // set original data
    domglue.update(this);

    // return self
    return this;
}
