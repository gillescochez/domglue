test('Setup', function(){

    expect(3);

    // detect presence
    ok(domglue, 'exposed');

    // check default settings
    equal(domglue.settings.attr, 'data-bind', 'default attribute is "data-bind"');
    equal(domglue.settings.regex, null, 'default regex is null');

});

test('DOM queries', function() {

    expect(5);

    deepEqual(domglue.query('#testId'), document.getElementById('testId'), 'id based query');
    deepEqual(domglue.query('div'), document.getElementsByTagName('div'), 'tag based query');

    // testing just resulting array generate error even tho result is as expected so we do a couple of less perfect test
    deepEqual(domglue.query('div.testClass').length, document.getElementsByClassName('testClass').length, 'class based query');
    deepEqual(domglue.query('div.testClass')[0], document.getElementsByClassName('testClass')[0], 'class based query'); 

    deepEqual(domglue.query('div.testClass:1'), document.getElementsByClassName('testClass')[1], 'class based query and selecting a specific element inside the elements class array');

});

test('Methods', function() {

    expect(3);

    // we build a fake object to be able to test internal methods
    var obj = {};
    obj[1] = {foo:'foo'};
    obj[0] = {};
    obj[0].foo = [document.getElementById('testId')];

    // extend method test
    domglue.extend(obj),
    ok(obj.foo, 'extend');

    // update name test
    domglue.updateName(obj, 'foo');
    equal(obj[0].foo[0].innerHTML, 'foo', 'updateName');

    // update test
    obj[1].foo = 'FOO'; // change data object value
    domglue.update(obj);
    equal(obj[0].foo[0].innerHTML, 'FOO', 'update');

});

test('Templates', function() {

    expect(3);
    
    // id based test
    domglue('#testId', {foo:'foohoo'});
    equal(document.getElementById('testId').innerHTML, 'foohoo', 'domglue(id, data)');

    // class based test
    domglue('div.testClass', {foo:'foohoo'});
    var els = document.getElementsByClassName('testClass'),
	len = els.length,
	str = '',
	i = 0;
    for (; i < len; i++) str += els[i].innerHTML;
    equal(str, 'foohoofoohoofoohoo', 'domglue(class, data)');
    
    // id based with custom attribute
    domglue('#boo', {foo:'foohoo'}, {attr:'data-key'});
    equal(document.getElementById('boo').innerHTML, 'foohoo', 'domglue(id, data, options)');

});
