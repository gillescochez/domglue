function domglue(selector, data, options) {
    return new domglue.init(selector, data, options);
}

// initialization method
domglue.init = function(target, data, options) {
	
    // sort instance options
    options = extend(domglue.settings, options, true);

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
