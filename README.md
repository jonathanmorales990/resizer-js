# Resizer JS
Writed with Vanilla JavaScript .
<br>[LIVE DEMO.](https://codepen.io/jonathanmorales990/pen/BaBddVK)

## **How to use**<br/>
Clone or download from github and include the script and css on the head.<br/> 
```
<head>
	<script type="text/javascript" src="resizer-js/dist/resizer.js"></script>
	<link rel="stylesheet" type="text/css" href="resizer-js/dist/resizer.css"/>
</head>
```
Apply the resizer.<br/> 
```
<script type="text/javascript">
	document.addEventListener("DOMContentLoaded", function (event) {
		var element = document.getElementById('resizer');
		resizer.applyResizer(element);
	});
</script>
```
