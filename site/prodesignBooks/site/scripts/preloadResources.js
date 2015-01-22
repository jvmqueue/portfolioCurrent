define([''], function(){ // require.js syntax, providing namespacing and closure

	var images = function(parmArrayNames){ // preload images
		var imgs = new Array(parmArrayNames.length);
		var path = './images/';
		$.each(parmArrayNames, function(index, elm){
			imgs[index] = new Image();
			imgs[index].src = path + parmArrayNames[index]; 
		});
	};
	
	return{ // public members via require.js
		images:images
	}

});