var _jvm = _jvm || {};

_jvm['util'] = (function($, w, d, undefined){
  var _utilConsole = function(options){
  
        if(!window['console']  && !window['console']['group']){
          return void(0);
        }
        console.group(options.header);
        console.log(options.label +':\t', options.message);
        console.groupEnd();
  };
	/* dynamically adding nodes will cause _setListeners to fail, because node is not immedietly part of DOM  */	
	/* solution is to use an interval. Clear it once node discovered */
  var _setListeners = function(options){ // generic setup for defining any listener
		var objInterval = setInterval(function(){ // ensure DOM node available
			if( !!$(options.selector) ){
				$(options.selector).on(options.e, options.data, options.listener);
				clearInterval(objInterval);
			}		
		}, 333);		
  };	

  var _extend = function(subClass, superClass){
   var F = function(){}; // optimization: create an empty container
   F.prototype = superClass.prototype; // assign our empty containers prototype to the super classes prototype set
   subClass.prototype = new F(); // now assign the subclasses prototype collection to a new instance of our empty Function. 
   subClass.prototype.constructor = subClass; // assigning the subclasses prototype collection destroys its constructor attribute
  };
  
  var _appendNamespace = function(paramNamespace, paramNameSpacesString){
    console.log('appendNamespace Reached Begin');
	var ns = paramNamespace;
    var namespacesToAppend = paramNameSpacesString;    
    var blnIsMultiDimensional = null;
    
    namespacesToAppend.indexOf('.') === -1 ? blnIsMultiDimensional = false : blnIsMultiDimensional = true;
    
    if( (blnIsMultiDimensional === false) && !!!(ns[namespacesToAppend]) ){ // add single namespace requested
	  ns[namespacesToAppend] = {};
	  return ns;
    }else{
		var strNamespace = ns + '';
		throw new Error('Exception: utils.appendNamespace attempting to add existing namespace ' + namespacesToAppend + ' which currently exists');
	}
    
    namespacesToAppend = namespacesToAppend.split('.'); // multi-dimensional namespace requested, deep namespacing
    
    for(var i = 0, len = namespacesToAppend.length; i < len; i++){        
        switch(i){
          case 0:
             ns[namespacesToAppend[i]] = ns[namespacesToAppend[i]] || {}; // ensure we do not overwrite existing object
            break;
          case 1:
            ns[namespacesToAppend[0]][namespacesToAppend[i]] = ns[namespacesToAppend[0]][namespacesToAppend[i]] || {};
            break;
          case 2:
            ns[namespacesToAppend[0]][namespacesToAppend[1]][namespacesToAppend[i]] = ns[namespacesToAppend[0]][namespacesToAppend[1]][namespacesToAppend[i]] || {};
            break;
          case 3:
            ns[namespacesToAppend[0]][namespacesToAppend[1]][namespacesToAppend[2]][namespacesToAppend[i]] = ns[namespacesToAppend[0]][namespacesToAppend[1]][namespacesToAppend[2]][namespacesToAppend[i]] || {};
            break;
          default:
            throw new Error('Exception: _jvm.util.appendNamespace can only build namespaces 4 deep');
        }
    }
  };
  
  
  
  	// Constructor
	var _Interface = function(name, methods){
		// must be exactly 2 arguments: the name of the interface, array of methods the interface exposes as public
		if(arguments.length != 2){
			throw new Error('Exception: Interface constructor called with ' + arguments.length + ' but expects exactly 2');
		}

		this.name = name;
		this.methods = [];
		var len = methods.length;
		
		for(var i = 0; i < len; i++){
			if(typeof methods[i] != 'string'){
				throw new Error('Exception: Interface constructor expects method names to be passed in as string');
			}
			this.methods.push(methods[i]);
		}
	};
	// static method; so, this is simply for organization. That is ensureImplements belongs to Interface
	// because ensureImplements is static, we will need to pass instances. Static methods do not have access to its parents instance members
	_Interface.ensureImplements = function(object){
		var len = arguments.length;
		// we must have at least 2 arguments: the function, at least one Interface
		if(len < 2){
			throw new Error('Exception: Interface.ensureImplements called with ' + arguments.length + ' but expects 2 or more');
		}
		
		var interface = null;
		var jLen = -1;
		var method = null;
		for(var i = 1; i < len; i++){
			interface = arguments[i];
			
		if( !!interface.methods === false){
			throw new Error('Exception: _interface.ensureImplements found object passed is not an interface OR does not contain any methods');
		}
			
			jLen = interface.methods.length;
			// arguments greater than 0 are Interfaces
			if(interface.constructor != _Interface){
				throw new Error('Exception: Interface.ensureImplements expects arguments 2 and above to be instances of Interface');
			}
			
			for(var j = 0; j < jLen; j++){
				method = interface.methods[j];
				if( (!object[method]) || (typeof object[method] !== 'function') ){
					throw new Error('Exception: Interface.ensureImplements object does not implement ' + interface.name + ' interface.method ' + method + ' was not found');
				}
			}
		}
		
	};
	
	var _AjaxRequester = function(options){
		this.path = options.jsonPath;
		this.method = options.method;
		this.callback = options.respCallBack;
		this.exceptionMessage = options.exceptionMessage;
		
		var that = this; // scoping
		var lclAjax = $.ajax({
		  url:that.path,
		  context:d.body
		});
		 
		lclAjax.done(function(parmData){
		  that.callback.call(this, parmData);
		});    
		
		lclAjax.fail(function errorAjaxFailure(params){ // generic ajax failure
		  throw new Error(that.exceptionMessage+ ':\t' +  params.status);
		});    

	  };	
	


  return{ // public members
    console:_utilConsole,
	Interface:_Interface,
    extend:_extend,
    appendNamespace:_appendNamespace,
	setListeners:_setListeners,
	AjaxRequester:_AjaxRequester
  }
  
})(jQuery, window, document);