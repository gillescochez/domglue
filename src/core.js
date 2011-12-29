function domglue(selector, data, options) {
    return new domglue.init(selector, data, options);
}

domglue.settings = {
    attr: 'data-bind',
    regex: null
}

domglue.init = function(selector, data, options) {
    
    // sort instance options
    options = extend(domglue.settings, options, true);

    // grab the target
    var target = selector.nodeName ? selector : domglue.query(selector);
console.log(target);
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

domglue.update = function(instance) {
    
    for (var name in instance[0]) {
	instance[0][name].innerHTML = instance[1][name];
    }

}

// extend current instance with data based methods
domglue.extend = function(instance) {
    
    for (var name in instance[1]) {
	
	(function(name) {

	    instance[name] = function(val) {
		instance[1][name] = val;
		if (instance[0][name]) instance[0][name].innerHTML = val;
	    }

	})(name)
    }
}

// bind data to DOM element available
domglue.bind = function (instance, target, data, options) {

    var elements = target.getElementsByTagName('*'),
	len = elements.length,
	i = 0,
	attr = target.getAttribute(options.attr);

    if (attr) instance[0][attr] = target;

    for (; i < len; i++) {

	attr = elements[i].getAttribute(options.attr);

	// do we need to bind the element
	if (attr && data[attr] !== undefined) instance[0][attr] = elements[i];
    }
}
