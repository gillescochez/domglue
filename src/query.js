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
