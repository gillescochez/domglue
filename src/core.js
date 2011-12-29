/*  
    Usage aimed for

	// bind to exsisting dom
	var dom = domglue('#dom', {foo:'foo'});

	dom.foo('FOO');
	dom._(); // data
	dom.$(); // new selector
*/
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

    // an object to store elements that are binded to data
    this[0] = {};

    // store the data
    this[1] = data;

    // bind DOM to data 
    domglue.bind(this, target, data, options); 

    // extend self with data based methods
    domglue.extend(this, data);

    // return self
    return this;
}

// extend current instance with data based methods
domglue.extend = function(instance, data) {
    
    for (var name in data) {
	
	(function(name) {

	    instance[name] = function(val) {

		instance[1][name] = val;

		if (instance[0][name]) instance[0][name].innerHTML = val;

	    }

	})(name);


    }

}

// bind data to DOM element available
domglue.bind = function (instance, target, data, options) {
    
    var elements = target.getElementsByTagName('*'),
	len = elements.length,
	i = 0,
	attr;

    for (; i < len; i++) {

	attr = elements[i].getAttribute(options.attr);

	// do we need to bind the element
	if (attr && data[attr] !== undefined) instance[0][attr] = elements[i];
    }
}

// query the dom accept (id => #foo, tag => div, class = div.class)
domglue.query = function(selector) {

    var hash = selector.substr(0,1),
	tagName,
	tagClass,
	elements,
	cbits,
	ebits,
	temp,
	len
	eq,
	i;

    if (hash === '#') return document.getElementById(selector.replace(hash, ''));
    else {

	// look for class or : bits
	cbits = selector.split('.');
	ebits = selector.split(':');

	// class base
	if (cbits[1]) {

	    tagClass = ebits[1] ? cbits[1].replace(ebits[1], '') : cbits[1];
	    tagName = cbits[0];

	// tag based
	} else {

	    tagClass = null;
	    tagName = ebits[1] ? selector.replace(ebits[1], '') : selector;
	}

	// grab elements
	elements = document.getElementsByTagName(tagName);

	if (tagClass) {

	    temp = [];

	    for (i = 0, len = elements.length; i < len; i++) {
		if (this.className.indexOf(tagClass) !== -1) temp.push(elements[i]);
	    }
	    
	    elements = temp;
	}

	if (ebits[1]) {
	    elements = elements[ebits[1]];
	}

	return elements;

    }
}
