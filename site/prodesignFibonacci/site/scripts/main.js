require(['fibonacci', 'urlLib'], function(math, lib){ // require.js for lazy-loading, namespacing
	var CONST = {
		queryName:'ordinal'
	};
	var node = {
		$txtInput:$('#txtNumIn0'),
		$txtOutput:$('#txtNumOut0')
	};
	var calculate =  function(){	
		lib.url.set( CONST.queryName, node.$txtInput.attr('value') ); // set location query using text input as value
		
		var strQueryValue = lib.url.getQueryValue(); // get query value
		node.$txtOutput.attr('value', math.calculate.fibonacci(strQueryValue));
	}; // End calculate
	var listener = {
		formDelegate:function(e){
			var $target = $(e.target);
			var id = $target.attr('id');

			$target.keyup(function(e){ // listen for enter key
				if(e.keyCode === 13){ // enter key
					node.$txtInput.select(); // friendly navigation, select user input
					calculate();
				}
			});
			switch(id){ // using event capturing, register id here
				case 'btn0':
					node.$txtInput.select(); // friendly navigation, select user input
					calculate();
					break;
				default:
					// do nothing, undefined case for id
			} // End switch
		},
		add:function(options){
			$('#' + options.id).bind(options.e, {anyData:''}, options.listener);
		}
	};
	(function init(){
		var nodeId = 'frm0';
		listener.add({id:nodeId, e:'click', listener:listener.formDelegate}); // use event capturing
		$('#' + nodeId).trigger('click'); // register form events on-the-fly. This strategy registers the <Enter> key press event
	})(); // init

}); // End require()