extend(domglue, {

    // update the DOM with the data object values
    update: function(instance) {

	var name, len, i;

	for (name in instance[0]) {
	    for (i = 0, len = instance[0][name].length; i < len; i++ ){
		instance[0][name][i].innerHTML = instance[1][name];
	    }
	}

    },

    // extend current instance with data based methods
    extend: function(instance) {
	
	var name, len, i;
	
	for (name in instance[1]) {
	    
	    (function(name) {

		instance[name] = function(val) {

		    instance[1][name] = val;

		    if (instance[0][name]) {
			for (i = 0, len = instance[0][name].length; i < len; i++) {
			    instance[0][name][i].innerHTML = val;
			}
		    }
		}

	    })(name)
	}
    },

    // bind data to DOM element available
    bind: function (instance, target, data, options) {

	var elements, len, attr, i;

	if (target.length) {
	    for (i = 0, len = target.length; i < len; i++) {
		domglue.bind(instance, target[i], data, options);
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
