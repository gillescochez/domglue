/*! github.com/gillescochez/domglue */

(function(){

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

extend(domglue, {

    // update the DOM with the data object values
    update: function(instance, key) {

	var name, len, i;

	if (key) this.updateName(instance, key);
	else {
	    for (name in instance[0]) this.updateName(instance, name);
	}
    },

    // update a specific data key
    updateName: function(instance, name) {
	for (i = 0, len = instance[0][name].length; i < len; i++ ) instance[0][name][i].innerHTML = instance[1][name];
    },

    // extend current instance with data based methods
    extend: function(instance) {
	
	var name, len, i;
	
	for (name in instance[1]) {
	    
	    (function(name) {

		instance[name] = function(val) {
		    instance[1][name] = val;
		    if (instance[0][name]) domglue.updateName(instance, name);
		}

	    })(name)
	}
    },

    // bind data to DOM element available
    bind: function (instance, target, data, options) {

	var elements, len, attr, i;

	if (target.length) {
	    for (i = 0, len = target.length; i < len; i++) {
		this.bind(instance, target[i], data, options);
	    }
	    return;
	}

	elements = target.getElementsByTagName('*');
	len = elements.length;
	i = 0;
	attr = target.getAttribute(options.attr);

	if (attr) {
	    if (!instance[0][attr]) instance[0][attr] = [];
	    instance[0][attr].push(target);
	}

	for (; i < len; i++) {

	    attr = elements[i].getAttribute(options.attr);

	    // do we need to bind the element
	    if (attr && data[attr] !== undefined) {
		if (!instance[0][attr]) instance[0][attr] = [];
		instance[0][attr].push(elements[i]);
	    }
	}
    }
});

// query the dom accept (id => #foo, tag => div, class = div.class)
domglue.query = function(selector) {

    var hash = selector.substr(0,1),
	tagName,
	tagClass,
	elements,
	cbits,
	ebits,
	temp,
	len,
	i;

    if (hash === '#') return document.getElementById(selector.replace(hash, ''));
    else {

	// look for class or : bits
	cbits = selector.split('.');
	ebits = selector.split(':');

	// class base
	if (cbits[1]) {

	    tagClass = ebits[1] ? cbits[1].replace(':'+ebits[1], '') : cbits[1];
	    tagName = cbits[0];

	// tag based
	} else {

	    tagClass = null;
	    tagName = ebits[1] ? selector.replace(ebits[1], '') : selector;
	}

	// grab elements
	elements = document.getElementsByTagName(tagName);

	if (tagClass) {

	    if (document.getElementsByClassName) elements = document.getElementsByClassName(tagClass);
	    else {
		temp = [];

		for (i = 0, len = elements.length; i < len; i++) {
		    if (elements[i].className.indexOf(tagClass) !== -1) temp.push(elements[i]);
		}
	    
		elements = temp;
	    }
	}

	if (ebits[1]) elements = elements[ebits[1]];

	return elements;
    }
}

domglue.settings = {
    attr: 'data-bind'
}

// helper function to extend objects
function extend(target, options, newObj) {

    if (!options) return target;

    // function scope variables
    var name, src, copy,
	obj = {};

    // extend object with target if needed 
    if (newObj) extend(obj, target);

    // extend the base object
    for (name in options) {
	
	// grab original and new value
	src = target[name];
	copy = options[name];

	// Prevent never-ending loop
	if (target === copy) continue;

	// Don't copy undefined values
	if (copy !== undefined) (newObj ? obj : target)[name] = copy;
    }

    return newObj ? obj : target;
}

// object type check helper
function isObject(it) {
    return typeof it  === 'object';
}

// array type check helper
function isArray(it) {
    if (isObject(it)) return it.constructor == Array;
    else return false;
}

window.domglue = domglue;})();
