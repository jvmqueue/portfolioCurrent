/** 
 * UHID SignUp Page State
 */
define([
	'newsletter/1/cds-newsletter'
], 
function(cds, template){

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
				$btnSigninConsumer:$('#btnSigninConsumer'),
				$btnCreateAccount:$('.physician.webmdBtn.btnMedscapeSignin, .consumer.webmdBtn.btnMedscapeSignin', '#formUhid'),
				$chkBox:$('.containerLineItem .checkBox input', '#formUhid')
			},
			cssClasses:{
				mainFormConsumer:'jsFormConsumer',
				hide:'hide',
				physician:'imgPhysician',
				consumer:'imgConsumer',
				error:'error',
				disabled:'uhidBtnDisabled'
			},
			errors:{
				199:'User already exists'
			},
			blnIsPhysician:false,
			blnChkBoxIsChecked:false
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
	var listenerCreateAccount = function(e){
		var objConfig = e.data.config;
		var $nodes = $('input', objConfig.nodes.$mainForm);
		var strError = null;
		var blnHasEmptyFields = false;
		var $that = null;
		var strClass = null;

		var $nodesErrors = $('.hide', '#formUhid') || null;

		e.stopPropagation();
		
		if($nodesErrors.length > 0){
			strError = objConfig.errors[$nodesErrors[0].textContent];
			$nodesErrors[0].firstChild.nodeValue = strError;
			$($nodesErrors[0]).removeClass('hide');
		}
		
		
		
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
	var listenerCheckBox = function(e){
        var objConfig = e.data.config;
        objConfig.blnChkBoxIsChecked = false;
        
        e.stopPropagation();
        
        if(!!e.target.checked){
            objConfig.nodes.$btnCreateAccount.removeClass(objConfig.cssClasses.disabled);
            objConfig.blnChkBoxIsChecked = true;
        }else{
            objConfig.nodes.$btnCreateAccount.addClass(objConfig.cssClasses.disabled);
        }
	};	
	
	var module = {
		main:function(){
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
		objConfig.nodes.$btnSigninPhysicianConsumer.on('click', {config:objConfig}, listenerCreateAccount); // click listener, send config as part of the listeners data
		objConfig.nodes.$chkBox.on('click', {config:objConfig}, listenerCheckBox); // I accept the WebMD Terms of use...			
		}
	};

		return module;
});