// use define so that we can use this with require
//  remember::::: define must return any publicly facing members
define([''], function(){

	/* ***** Begin Private Members ***** */

	// Constructor
	var Interface = function(name, methods){
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
	Interface.ensureImplements = function(object){
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
			jLen = interface.methods.length;
			// arguments greater than 0 are Interfaces
			if(interface.constructor != Interface){
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

	/* ***** End Private Members ***** */	
	return {
		Interface:Interface
	}
	/* ***** Begin Public Members ***** */	
	
	
	
	/* ***** End Public Members ***** */		

}); // End define