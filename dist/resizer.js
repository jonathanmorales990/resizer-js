resizer = {
	original_width: 0,
	original_height: 0,
	original_x: 0,
	original_y: 0,
	original_mouse_x: 0,
	original_mouse_y: 0,
	minimum_size: 20,
	maxWidth: 0,
	element: null,
	parent: {
		paddingLeft: 0,
		paddingTop: 0,
		marginLeft: 0,
		marginTop: 0
	}
}
resizer.applyResizer = function (element) {
	element.style.position = 'absolute';
	this.addCorners(element);
	this.onClickEvent(element);
	this.onMoveEvent(element);
}
resizer.onResizeEvent = function (event) {
	var maxLeft = resizer.parent.paddingLeft + resizer.parent.marginLeft;
	var maxTop = resizer.parent.paddingTop + resizer.parent.marginTop;
	var maxWidth = resizer.maxWidth - resizer.original_x;
	if (resizer.hasClass(resizer.currect_corner, 'bottom-right')) {
		var width = resizer.original_width + (event.pageX - resizer.original_mouse_x);
		var height = resizer.original_height + (event.pageY - resizer.original_mouse_y);
		if (width > resizer.minimum_size) {
			if(width <= maxWidth)
				resizer.element.style.width = width + 'px';
			else
				resizer.element.style.width = maxWidth + 'px';
		}
		if (height > resizer.minimum_size) {
			resizer.element.style.height = height + 'px';
		}
	}
	if (resizer.hasClass(resizer.currect_corner, 'bottom-left')) {
		var width = resizer.original_width - (event.pageX - resizer.original_mouse_x);
		var height = resizer.original_height + (event.pageY - resizer.original_mouse_y);
		if (height > resizer.minimum_size) {
			resizer.element.style.height = height + 'px';
		}
		if (width > resizer.minimum_size ) {
			var left_calc = (resizer.original_x + (event.pageX - resizer.original_mouse_x));
			if (left_calc >= maxLeft) {
				resizer.element.style.width = width + 'px';
				resizer.element.style.left = left_calc + 'px';
			} else {
				resizer.element.style.width = ((width + left_calc) - maxLeft) + 'px';
				resizer.element.style.left = maxLeft + 'px';
			}
		}
	}
	if (resizer.hasClass(resizer.currect_corner, 'top-right')) {
		var width = resizer.original_width + (event.pageX - resizer.original_mouse_x);
		var height = resizer.original_height - (event.pageY - resizer.original_mouse_y);
		if (height > resizer.minimum_size) {
			var top_calc = (resizer.original_y + (event.pageY - resizer.original_mouse_y));
			if (top_calc > maxTop) {
				resizer.element.style.height = height + 'px';
				resizer.element.style.top = top_calc + 'px';
			} else {
				resizer.element.style.height = ((height + top_calc) - maxTop) + 'px';
				resizer.element.style.top = maxTop + 'px';
			}
		}
		if (width > resizer.minimum_size ) {
			if(width <= maxWidth)
				resizer.element.style.width = width + 'px';
			else
				resizer.element.style.width = maxWidth + 'px';
		}
	}
	if (resizer.hasClass(resizer.currect_corner, 'top-left')) {
		var width = resizer.original_width - (event.pageX - resizer.original_mouse_x);
		var height = resizer.original_height - (event.pageY - resizer.original_mouse_y);
		if (width > resizer.minimum_size ) {
			var left_calc = (resizer.original_x + (event.pageX - resizer.original_mouse_x));
			if (left_calc >= maxLeft) {
				resizer.element.style.width = width + 'px';
				resizer.element.style.left = left_calc + 'px';
			} else {
				resizer.element.style.width = ((width + left_calc) - maxLeft) + 'px';
				resizer.element.style.left = maxLeft + 'px';
			}
		}
		if (height > resizer.minimum_size) {
			var top_calc = (resizer.original_y + (event.pageY - resizer.original_mouse_y));
			if (top_calc > maxTop) {
				resizer.element.style.height = height + 'px';
				resizer.element.style.top = top_calc + 'px';
			} else {
				resizer.element.style.height = ((height + top_calc) - maxTop) + 'px';
				resizer.element.style.top = maxTop + 'px';
			}
		}		
	}
}
resizer.addCorners = function (element) {
	var nodeCorner = document.createElement('div');
	this.setAttributes(nodeCorner, {'class': 'corner top-left'});
	element.appendChild(nodeCorner);
	nodeCorner = nodeCorner.cloneNode(true);
	this.setAttributes(nodeCorner, {'class': 'corner top-right'});
	element.appendChild(nodeCorner);
	nodeCorner = nodeCorner.cloneNode(true);
	this.setAttributes(nodeCorner, {'class': 'corner bottom-right'});
	element.appendChild(nodeCorner);
	nodeCorner = nodeCorner.cloneNode(true);
	this.setAttributes(nodeCorner, {'class': 'corner bottom-left'});
	element.appendChild(nodeCorner);
}
resizer.onClickEvent = function (element) {
	element.addEventListener('mousedown', function (event) { 
		element.style.border = '1px solid black';
		resizer.element = element;
		resizer.addClass(element, 'enable-resizer');
		event.stopPropagation();
	});
	window.addEventListener('mousedown', function (event) {
		element.style.border = 'none';
		resizer.element = null;
		resizer.removeClass(element, 'enable-resizer');
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
			resizer.maxWidth = parseFloat(getComputedStyle(element.parentNode, null).getPropertyValue('width').replace('px', ''));
			resizer.parent.paddingLeft = parseFloat(getComputedStyle(resizer.element.parentNode, null).getPropertyValue('padding-left').replace('px', ''));
			resizer.parent.paddingTop = parseFloat(getComputedStyle(resizer.element.parentNode, null).getPropertyValue('padding-top').replace('px', ''));
			resizer.parent.marginLeft = parseFloat(getComputedStyle(resizer.element.parentNode, null).getPropertyValue('margin-left').replace('px', ''));
			resizer.parent.marginTop = parseFloat(getComputedStyle(resizer.element.parentNode, null).getPropertyValue('margin-top').replace('px', ''));
			resizer.original_mouse_x = event.pageX;
			resizer.original_mouse_y = event.pageY;
			resizer.currect_corner = event.target;
			window.addEventListener('mousemove', resizer.onResizeEvent);
			window.addEventListener('mouseup', endMove);
		});
	}
}
resizer.hasClass = function (el, className) {
	if (el.classList)
		return el.classList.contains(className);
	return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}
resizer.addClass = function (el, className) {
	if (el.classList)
		el.classList.add(className)
	else if (!this.hasClass(el, className))
		el.className += " " + className;
}
resizer.removeClass = function (el, className) {
	if (el.classList)
		el.classList.remove(className)
	else if (this.hasClass(el, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		el.className = el.className.replace(reg, ' ');
	}
}
resizer.setAttributes = function (el, attrs) {
	for (var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}