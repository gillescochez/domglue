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

    expect(2);

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

});
