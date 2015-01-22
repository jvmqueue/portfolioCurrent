define([''], function(){
	// TODO: calculate is in an external file; so, use interface.js to ensure methods exist
	var calculate = {
		fibonacci:function(parmOrdinal){
			// TODO: ensure parm is integer greater than 0
			console.log('Reached fibonacci');
		}
	}; // End calculate{}

	return{
		calculate:calculate
	}
});