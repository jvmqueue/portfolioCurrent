define([''], function(){ // require.js syntax

	var url = {
		set:function(parmName, parmValue){ // reset and repopulate
			window.location = '#' + parmName + '=' + parmValue;
		},
		getQueryValue:function(){
			// match first word after =
			var strArrValue = String(window.location).match(/=\w+/g) || '=-1';

			if(strArrValue == '=-1'){ // query string does not contain a word after the = sign
				return void(0);
			}
			
			strArrValue = strArrValue[0].match(/\w+/)[0];
			
			return strArrValue || '';
		}			
	}; // End url{}

	return{
		url:url
	}
});