var _jvm = _jvm || {};

_jvm['main'] = (function($, w, d, undefined){

	var Dom = function(options){ // Dom should be an instance having methods like renderClock
		// TODO: nodeExist should only be accessed once
		var nodeExist = d.getElementById('containerPage');
		var frag = d.createDocumentFragment();
		var nodeText = d.createTextNode(options.val);;
		var nodeNew = d.createElement('span');  // TODO: use block element and float left, clear when reach last last 
		// TODO: round top and bottom corners of last interval
		options.val === 0 ? nodeNew.setAttribute('class', 'jsFirstInterval jsClock') : nodeNew.setAttribute('class', 'jsClockInterval jsClock');
		
		nodeNew.appendChild(nodeText);
		if(options.blnLastInterval === true){		
			nodeNew.setAttribute('class', nodeNew.getAttribute('class') + ' jsLastInterval');
		}
		frag.appendChild(nodeNew);		
		nodeExist.appendChild(frag);
	};
	

	var ObjClock = function(paramIntValue){ // used for storage of clock instance properties
		this.val = paramIntValue;
	};
	ObjClock.prototype.val = null;

	var ObjPrint = function(){
		this.intCounter = 0;
		this.intArrayCounter = 0;
		this.blnShutDownTimer = false;
		// this.collection contains an array of functions in the form of: ObjPrint.set
		// how do we retrieve each function the array
		// how do we access the index for each function stored into the array
		this.collection = [];
	};
	ObjPrint.prototype.clock = function(parmIntValue){
		this.clock['val'] = parmIntValue;
	};
	ObjPrint.prototype.clock.val = 0;
	ObjPrint.prototype.get = function(paramIndex){ // return object value from a stack
		return this.collection[paramIndex];
	};	
	ObjPrint.prototype.addToStack = function(paramIndex){		
		this.collection.push(new ObjClock(paramIndex));
	};
	ObjPrint.prototype.printStack = function(options){
		var that = this;
		var intLowerBound = 0;
		var intUpperBound = options.upperBound;
		
			
		var interval = setInterval(function(){
			// Decide if first value or last value. This allows our clock to know if first interval or last interval
			intLowerBound > intUpperBound ? Dom({val:that.get(intLowerBound).val, blnLastInterval:true}) : Dom({val:that.get(intLowerBound).val, blnLastInterval:false});
				
			
			if(intLowerBound > intUpperBound){ clearInterval(interval); }
			intLowerBound++;
		
		}, options.clockInterval);
			

			



	};	


		
		var init = (function(){ // basically our controller
			var Obj = new ObjPrint();
			
			// TODO: implement interface, obj passed to class which tests interface
			// TODO: use setClockInterval instead of addToStack????
			for(var i = 0; i < 10; i++){ // add any instance properties
				Obj.addToStack(i);
			}

			var that = Obj; // scoping, setTimeout redefines the scope of this
			setTimeout(function(){
				that.printStack({upperBound:7, clockInterval:500});
			}, 777);		
		})();
	
// TODO: AJAX call on binary tree



})(jQuery, window, document); // End main