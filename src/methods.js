extend(domglue, {
    update: function(instance) {
	
	for (var name in instance[0]) {
	    instance[0][name].innerHTML = instance[1][name];
	}

    },

    // extend current instance with data based methods
    extend: function(instance) {
	
	for (var name in instance[1]) {
	    
	    (function(name) {

		instance[name] = function(val) {
		    instance[1][name] = val;
		    if (instance[0][name]) instance[0][name].innerHTML = val;
		}

	    })(name)
	}
    },

    // bind data to DOM element available
    bind: function (instance, target, data, options) {

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
});
