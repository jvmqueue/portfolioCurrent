(function($, w, d, undefined){

	var config = function(){
		var that = {};
		that.config = {
			query:{
				consumer:'hello=consumer',
				physician:'hello=physician'
			},
			nodes:{
				$consumer:$('.consumer'),
				$physician:$('.physician'),
				$mainForm:$('.formUhid'),
				$imageLeft:$('.imgLeft')
			},
			cssClasses:{
				mainFormConsumer:'jsFormConsumer',
				hide:'hide',
				physician:'imgPhysician',
				consumer:'imgConsumer'
			}
		};
		return that.config; 		
	};
	var main = function(){
		var strQuery = window.location.search.toString().replace('?', ''); // TODO: we need a more precise query regEx depending on Rally requirements
		var objConfig = config();
		switch(strQuery){
			case objConfig.query.consumer: // consumer page state
				objConfig.nodes.$mainForm.addClass(objConfig.cssClasses.mainFormConsumer);
				objConfig.nodes.$physician.addClass(objConfig.cssClasses.hide);
				objConfig.nodes.$consumer.removeClass(objConfig.cssClasses.hide);
				objConfig.nodes.$imageLeft.removeClass(objConfig.cssClasses.physician).addClass(objConfig.cssClasses.consumer); // swapout physian image for consumer image
				break;
			case objConfig.query.physician: // physician page state
				// intentionally empty
			default: // page state defaults to physician
				objConfig.nodes.$consumer.addClass(objConfig.cssClasses.hide);
				objConfig.nodes.$physician.removeClass(objConfig.cssClasses.hide);
				objConfig.nodes.$imageLeft.removeClass(objConfig.cssClasses.consumer).addClass(objConfig.cssClasses.physician); // swapout physian image for consumer image
		}
	};
	
	main();

})(jQuery, window, document);