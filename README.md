## Domglue

Domglue is a tiny (~1.2KB full, ~0.8KB) data to dom element binding engine. It provides only basic interpolation, the data keys are bind to elements found on the DOM. Everytime a data key value gets updated the DOM element gets automatically updated.

## Core API

### domglue( string | DOMElement selector, object data, object options);

Grab DOM elements, bind data to elements found and return an object containing methods based on the data keys which allows to update the data object.

The options object is optional and can be used to change the settings for the instance created

## Usage

```html
<!DOCTYPE html>
<html>
<script src="domglue.js"></script>
<body>
<div id="content">
    <h1 data-bind="title">Title</h1>
    <p data-bind="message">Message</p>
</div>
<script>
```

```javascript
var data = {
	title: 'Hellow World',
	message: 'I am filled in by domglue'
    },
    dg = domglue('#content', data); 

    // the content element now contains <h1>Hello World</h1><p>I am filled in by domglue</p>

    // this will update the Message in 3 seconds
    setTimeout(function() {
	dg.message('New message is now in place');
    }, 3000);


```

```html
</script>
</body>
</html>
```
