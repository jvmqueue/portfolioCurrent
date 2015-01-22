define([''], function(){
	// TODO: calculate is in an external file; so, use interface.js to ensure methods exist
	var calculate = {
		fibonacci:function(parmOrdinal){
			var intOrdinal = parseInt(parmOrdinal);
			if(intOrdinal === 0){
				return 0;
			}else if(intOrdinal === 1){
				return 1;
			}else if(intOrdinal > 1){
				return calculate.fibonacci(intOrdinal-1) + calculate.fibonacci(intOrdinal-2);
			}
		}
	}; // End calculate{}

	return{
		calculate:calculate
	}
});