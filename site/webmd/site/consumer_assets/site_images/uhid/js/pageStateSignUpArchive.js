var webmd = webmd || {};
webmd['uhidPageStateSignUp'] = (function($, w, d, undefined){

	var config = function(){
		var that = {};
		that['config'] = {
			query:{
				consumer:'hello=consumer',
				physician:'hello=physician'
			},
			nodes:{
				$consumer:$('.consumer'),
				$physician:$('.physician'),
				$mainForm:$('.formUhid'),
				$imageLeft:$('.imgLeft'),
				$btnSigninPhysician:$('#btnSigninPhysician'),
				$btnSigninPhysicianConsumer:$('#btnSigninPhysician, #btnSigninConsumer'),
				$btnSigninConsumer:$('#btnSigninConsumer')
			},
			cssClasses:{
				mainFormConsumer:'jsFormConsumer',
				hide:'hide',
				physician:'imgPhysician',
				consumer:'imgConsumer',
				error:'error'
			},
			blnIsPhysician:false
		};
		return that.config; 		
	};
	var changePageState = function(paramConfig){
		if(paramConfig.blnIsPhysician === false){
			paramConfig.nodes.$physician.each(function(){
				$(this).removeClass('physician').addClass('consumer');
			});
		}
	};
	var listenerCheckFieldEmpty = function(e){
		var objConfig = e.data.config;
		var $nodes = $('input', objConfig.nodes.$mainForm);
		var blnHasEmptyFields = false;
		var $that = null;
		var strClass = null;

		objConfig.blnIsPhysician === true ? strClass = 'physician' : strClass = 'consumer';
		$nodes.each(function(){
			 $that = $(this);
			if( ($that.val().length === 0) && ($that.hasClass(strClass))){
				$that.addClass(objConfig.cssClasses.error);
				blnHasEmptyFields = true;
			}else{
				$that.removeClass(objConfig.cssClasses.error);	
			}
			if(blnHasEmptyFields === true){ e.preventDefault(); }
		});
	};
	var main = function(){
		var strQuery = window.location.search.toString().replace('?', ''); // TODO: we need a more precise query regEx depending on Rally requirements
		var objConfig = config();
		switch(strQuery){
			case objConfig.query.consumer: // consumer page state
				objConfig.nodes.$imageLeft.removeClass(objConfig.cssClasses.physician).addClass(objConfig.cssClasses.consumer); // swapout physian image for consumer image
				break;
			case objConfig.query.physician: // physician page state
				// intentionally empty
			default: // page state defaults to physician
				objConfig.nodes.$imageLeft.removeClass(objConfig.cssClasses.consumer).addClass(objConfig.cssClasses.physician); // swapout physian image for consumer image
				objConfig.blnIsPhysician = true;
		}
		changePageState(objConfig);  // change css classes relative consumer or physician
		objConfig.nodes.$btnSigninPhysicianConsumer.on('click', {config:objConfig}, listenerCheckFieldEmpty); // click listener, send config as part of the listeners data
	};
	
	main();

})(jQuery, window, document);