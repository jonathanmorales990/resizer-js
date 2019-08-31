resizer = {
	original_width: 0,
	original_height: 0,
	original_x: 0,
	original_y: 0,
	original_mouse_x: 0,
	original_mouse_y: 0,
	minimum_size: 20,
	element: null
}
resizer.applyResizer = function (element) {
	element.style.position = 'absolute';
	this.addCorners(element);
	this.onClickEvent(element);
	this.onMoveEvent(element);
}
resizer.onResizeEvent = function (event) {
	if (hasClass(resizer.currect_corner, 'bottom-right')) {
		var width = resizer.original_width + (event.pageX - resizer.original_mouse_x);
		var height = resizer.original_height + (event.pageY - resizer.original_mouse_y);
		if (width > resizer.minimum_size) {
			resizer.element.style.width = width + 'px';
		}
		if (height > resizer.minimum_size) {
			resizer.element.style.height = height + 'px';
		}
	}
	if (hasClass(resizer.currect_corner, 'bottom-left')) {
		var width = resizer.original_width - (event.pageX - resizer.original_mouse_x);
		var height = resizer.original_height + (event.pageY - resizer.original_mouse_y);
		if (height > resizer.minimum_size) {
			resizer.element.style.height = height + 'px';
		}
		if (width > resizer.minimum_size ) {
			var left_calc = (resizer.original_x + (event.pageX - resizer.original_mouse_x));
			if (left_calc > 0) {
				resizer.element.style.width = width + 'px';
				resizer.element.style.left = left_calc + 'px';
			}
		}
	}
	if (hasClass(resizer.currect_corner, 'top-right')) {
		var width = resizer.original_width + (event.pageX - resizer.original_mouse_x);
		var height = resizer.original_height - (event.pageY - resizer.original_mouse_y);
		if (height > resizer.minimum_size) {
			var top_calc = (resizer.original_y + (event.pageY - resizer.original_mouse_y));
			if (top_calc > 0) {
				resizer.element.style.height = height + 'px';
				resizer.element.style.top = top_calc + 'px';
			}
		}
		if (width > resizer.minimum_size ) {
			resizer.element.style.width = width + 'px';
		}
	}
	if (hasClass(resizer.currect_corner, 'top-left')) {
		var width = resizer.original_width - (event.pageX - resizer.original_mouse_x);
		var height = resizer.original_height - (event.pageY - resizer.original_mouse_y);
		if (width > resizer.minimum_size ) {
			var left_calc = (resizer.original_x + (event.pageX - resizer.original_mouse_x));
			if (left_calc > 0) {
				resizer.element.style.width = width + 'px';
				resizer.element.style.left = left_calc + 'px'; 
			}
		}
		if (height > resizer.minimum_size) {
			var top_calc = (resizer.original_y + (event.pageY - resizer.original_mouse_y));
			if (top_calc > 0) {
				resizer.element.style.height = height + 'px';
				resizer.element.style.top = top_calc + 'px';
			}
		}		
	}
}
resizer.addCorners = function (element) {
	var nodeCorner = document.createElement('div');
	setAttributes(nodeCorner, {'class': 'corner top-left'});
	element.appendChild(nodeCorner);
	nodeCorner = nodeCorner.cloneNode(true);
	setAttributes(nodeCorner, {'class': 'corner top-right'});
	element.appendChild(nodeCorner);
	nodeCorner = nodeCorner.cloneNode(true);
	setAttributes(nodeCorner, {'class': 'corner bottom-right'});
	element.appendChild(nodeCorner);
	nodeCorner = nodeCorner.cloneNode(true);
	setAttributes(nodeCorner, {'class': 'corner bottom-left'});
	element.appendChild(nodeCorner);
}
resizer.onClickEvent = function (element) {
	element.addEventListener('mousedown', function (event) { 
		element.style.border = '1px solid black';
		resizer.element = element;
		addClass(element, 'enable-resizer');
		event.stopPropagation();
	});
	window.addEventListener('mousedown', function (event) {
		element.style.border = 'none';
		resizer.element = null;
		removeClass(element, 'enable-resizer');
	});
}
resizer.onMoveEvent = function (element) {
	var corners = element.getElementsByClassName('corner');

	var endMove = function () {
		window.removeEventListener('mousemove', resizer.onResizeEvent);
		window.removeEventListener('mouseup', endMove);
	};
	for (i=0; i< corners.length; i++) {
		corners[i].addEventListener('mousedown', function (event) {
			event.stopPropagation();
			resizer.original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
			resizer.original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
			resizer.original_x = parseFloat(getComputedStyle(element, null).getPropertyValue('left').replace('px', ''));
			resizer.original_y = parseFloat(getComputedStyle(element, null).getPropertyValue('top').replace('px', ''));
			resizer.original_mouse_x = event.pageX;
			resizer.original_mouse_y = event.pageY;
			resizer.currect_corner = event.target;
			console.log(getComputedStyle(element, null).getPropertyValue('top'))
			window.addEventListener('mousemove', resizer.onResizeEvent);
			window.addEventListener('mouseup', endMove);
		});
	}
}
function hasClass (el, className) {
	if (el.classList)
		return el.classList.contains(className);
	return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}
function addClass (el, className) {
	if (el.classList)
		el.classList.add(className)
	else if (!hasClass(el, className))
		el.className += " " + className;
}
function removeClass (el, className) {
	if (el.classList)
		el.classList.remove(className)
	else if (hasClass(el, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		el.className = el.className.replace(reg, ' ');
	}
}
function setAttributes(el, attrs) {
	for (var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}