// three ways to create objects: fully exposed, underscores, closure
define([''], function(){
	var vars = {
		str:null
	};
	var convertString = function(parmString, options){
		vars.str = parmString;
		var nodesExist = [$('#' + options.nodeIdToWrite0), $('#' + options.nodeIdToWrite1), $('#' + options.nodeIdToWrite2)];

		// match returns only a valid seven digit telephone number if it exists
		var arrMatch = vars.str.match(/\d{3}-\d{4}/);
		var intSearch = vars.str.search(/\belvis\b/g);
		// replace anything from elvis to alive inclusively
		var strReplace = vars.str.replace(/\belvis\b.*alive\b/, '***');

		nodesExist[0].attr('value', !!!arrMatch ?  'no match' : arrMatch[0]);
		nodesExist[1].attr('value', intSearch < 0 ?  'search less than 0' : intSearch);		
		nodesExist[2].attr('value', !!!strReplace ?  'no match' : strReplace);

/*

		// match returns only a valid seven digit telephone number if it exists
		var arrMatch = vars.str.match(/\d\d\d-\d\d\d\d/);

		// only replace - at the beginning of a word
		var strReplace = vars.str.replace(/^-/, '***');

		// test match space character via escape sequence
		var arrMatch = vars.str.match(/\s/g);
		var intSearch = vars.str.search(/\s/g);
		var strReplace = vars.str.replace(/\s/g, '');
		nodesExist[0].attr('value', !!!arrMatch ?  'no match' : arrMatch[0]);
		nodesExist[1].attr('value', intSearch < 0 ?  'search less than 0' : intSearch);		
		nodesExist[2].attr('value', !!!strReplace ?  'no match' : strReplace);

		// test if match 2 characters followed by an underscore
		var arrMatch = vars.str.match(/.._/g);
		var intSearch = vars.str.search(/.._/g);
		nodesExist[0].attr('value', !!!arrMatch ?  'no match' : arrMatch[0]);
		nodesExist[1].attr('value', intSearch < 0 ?  'search less than 0' : intSearch);		

		// test if match returned a value
		var arrMatch = vars.str.match(/06|07/g);
		nodeExist.attr('value', !!!arrMatch ?  'no match' : arrMatch[0]);

		// use match return to return each instance in string that matched
		var arrMatch = vars.str.match(/06|07/g);
		nodeExist.attr('value', arrMatch);

		// replace 06 OR 07 using global switch
		nodeExist.attr('value', vars.str.replace(/06|07/g, ''));

		// replace all 06 with nothing
		nodeExist.attr('value', vars.str.replace(/06/g, ''));

		if( vars.str.search('06') >= 0 ){
			nodeExist.attr('value', vars.str);
		}else{
			nodeExist.attr('value', 'regEx no match');
		}
*/
		
	};
	
	return{
		convertString:convertString
	}
}); // End define for require.js