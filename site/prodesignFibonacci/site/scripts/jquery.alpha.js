// Use: $('selector').alpha(argument);
// fn is a jQuery propery
// simply extend the fn jQuery property using static syntax: someFunction.myStaticMember = function(){};
// alpha becomes a jQuery plug-in
$.fn.alpha = function(parm){
	return this.append('<h3 class="messageGreen">Appended tag via jQuery plug-in parameter:\t'+parm+'</h3>');	
};