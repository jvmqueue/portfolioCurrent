/*TEST*/
var webmd = webmd || {};
webmd['p'] = {uhid:{js:null}};
webmd.p.uhid.js = (function($, w, d, undefined){

	var config = function(){
		var that = {};
		var $context = $('#formUhid');

		that['config'] = {
			query:{
				consumer:'hello=consumer',
				physician:'hello=physician'
			},
/*				$('.footerRight.floatRight.physician.signin').addClass('hide');
				$('.footerRight.floatRight.consumer.register').removeClass('hide');
							*/
			nodes:{
				$consumer:$('.consumer'),
				$physician:$('.physician'),
				$mainForm:$('.formUhid'),
				$imageLeft:$('.imgLeft'),
				$btnSigninPhysician:$('#btnSigninPhysician'),
				$btnSigninWebMDAccnt:('#btnSigninWebMDAccnt', $context),
				$btnSigninPhysicianConsumer:$('#btnSigninPhysician, #btnSigninConsumer'),
				$btnUhidGoToPage:$('#btnUhidGoToPage'),
				$btnSigninConsumer:$('#btnSigninConsumer'),
				$btnCreateAccount:$('#btnCreateAccount', $context),
				$btnSubmitCreateAcctFrm:$('#btnCreateAccount', $context),
				$btnSigninAlreadyHaveAccount:$('#btnSigninAlreadyHaveAccount'),
				$btnUhidCreateAccount:$('#btnUhidCreateAccount', $context),
				$btnSignUpCreateAccount:$('#btnSignUpCreateAccount'),
				$chkBox:$('.containerLineItem .checkBox input', '#formUhid'),
				$exceptionNode:$('.hide.exception', '#formUhid')
			},
			formNodes:{
				$FirstName:$('#firstName', $context),
				$LastName:$('#lastName', $context),
				$Email:$('#email', $context),
				$Password:$('#password', $context),
				$ConfirmPassword:$('#passwordConfirm', $context),
				$dateOfBirthField:$('#dateOfBirthFields', $context),
				$Dob:$('#dobDay', $context),
				$Mob:$('#dobMonth', $context),
				$Yob:$('#dobYear', $context),
				$TC:$('input#checkBoxTc', $context),
				$RM:$('input#checkBoxRm', $context) 				 
			},
			formNodesSignIn:{
				$Email:$('#email', $context),
				$Password:$('#password', $context)
			},
			modalNodes:{
				$uhidModalAccountLocked:$('#uhidModalAccountLocked')
			},
			selectorModalBtns:{
				btnsCloseModalAccountLocked:'#btnModalAccountLocked , #btnTopRightCloseButton',
			},
			cssClasses:{
				mainFormConsumer:'jsFormConsumer',
				hide:'hide',
				physician:'imgPhysician',
				consumer:'imgConsumer',
				error:'error',
				disabled:'uhidBtnDisabled',
				footerConsumerRegister:'.footerRight.floatRight.consumer.register',
				footerPhysicianRegister:'.footerRight.floatRight.physician.signin',
				footerSignIn:'.footerRight.floatRight.signin',
				register:'register'
			},
			errors:{
				'-791':'Invalid Format',
				'-792':'Missing Field',
				'-793':'Please enter a valid date',
				'-794':'Minimum Length Offense',
				'-795':'Maximum Length Offense'
			},
			urls:{
				visitorSignIn:'/signin',
				visitorSignUp:'/register'
			},
			blnIsPhysician:false,
			blnChkBoxIsChecked:false,
			blnFormHasInvalidFields:false
		};

		return that.config; 		
	};
	var changePageState = function(paramConfig, paramBlnIsPhysician){
		var config = paramConfig;
		var blnIsPhysician = paramBlnIsPhysician;
		
		if(blnIsPhysician === false){
			$('.footerRight.floatRight.physician.signin').addClass('hide');			
			$('.footerRight.floatRight.consumer.register').removeClass('hide');
		}


	};
	var goToRegister = function(e, paramConfig){
		var strQuery = window.location.search;
		window.location = paramConfig.urls.visitorSignUp + strQuery;
	};
	var goToCreateMyAccount = function(e, paramConfig){

	};	
	var goToSignIn = function(e, paramConfig){
		e.preventDefault;
		var strQuery = window.location.search;
		window.location = paramConfig.urls.visitorSignIn + strQuery;
	};
	var submitSignInToWebMdForm = function(e, paramConfig){
		blnInvalidFieldValExist = false;
		if(blnInvalidFieldValExist == true){
			return false;
		}
		
	};		


	var populateForm = function(paramForm, paramConfig){
		var objForm = paramForm;
		var config = paramConfig;
		objForm.getData();
		objForm.checkForException(config);
		objForm.populateData(config);
		objForm.validateInput(config); // TODO: move this method call to a form listener()
	};

	var objForm = {}; // namespace for organization
	/* static methods no need for instance because we are not trying to remember state */
	objForm.checkFormBeforeSubmit = function(optionNodes){ // pass any hash containting inputs which you want to validate
		
		var nodesForm = optionNodes;
		var blnFlagFormNoInvalidEntries = true;

		var nodeId = null;
		// TODO: switch structure to differentiate between signup or signIN Submit
		var hash = null;

		for(var id in nodesForm){			
			nodeId = nodesForm[id].attr('id');
			if( typeof objForm[nodeId] !== 'function' ){continue;} // validation function not defined on this node
			hash = nodesForm[nodeId];
			objForm[nodeId](nodesForm[id]); // execute relative to nodes id
		}
		var nodesFormExceptionBlocks = $('.exception.block');




		for(var i = 0, len = nodesFormExceptionBlocks.length; i < len; i++){
			var $node = $(nodesFormExceptionBlocks[i]);
			if( !$node.hasClass('hide') == true ){ // any error labels showing return false
				blnFlagFormNoInvalidEntries = false;
				break;
			}
		}

		return blnFlagFormNoInvalidEntries;

		
	};
	objForm.checkForException = function(options){ // can check a single node or multiple nodes
		var blnFoundDateError = false;
		for(var id in options){
			if( typeof objForm[id] !== 'function' ){continue;} // validation funciton not defined on this node
			blnFoundDateError = objForm[id](options[id]) || false; // execute relative to nodes id
			if(blnFoundDateError == true){break;} // found an error do not check remaining fields
		}
	};
	objForm.firstName = function(paramNode){
		var $node = $(paramNode);
		$node.next().addClass('hide').html(''); // reset
		var strValue = $node.val();
		if(strValue.length  <= 1 ){
			$node.next().removeClass('hide').html('First name must be longer than 2 characters');
		}
	};
	objForm.lastName = function(paramNode){
		var $node = $(paramNode);
		$node.next().addClass('hide').html(''); // reset
		var strValue = $node.val();
		if(strValue.length  <= 1 ){
			$node.next().removeClass('hide').html('Last name must be longer than 2 characters');
		}
	};
	objForm.email = function(paramNode){
		var $node = $(paramNode);
		$node.next().addClass('hide').html(''); // reset
		var strValue = $node.val();
		var blnMatch = strValue.match(/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i);

		if(!blnMatch){
			$node.next().removeClass('hide').html('Email is invalid');
		}
	};
	objForm.password = function(paramNode){
		var $node = $(paramNode);
		$node.next().addClass('hide').html(''); // reset
		var strValue = $node.val();
		if(strValue.length == 0 ){
			$node.next().removeClass('hide').html('Password missing');
		}
	};
	objForm.passwordConfirm = function(paramNode){
		var $node = $(paramNode);
		var objConfig = config();
		var $nodePassword = objConfig.formNodes.$Password;
		$node.next().addClass('hide').html(''); // reset
		var strValue = $node.val();
		if( strValue != $nodePassword.val() ){
			$node.next().removeClass('hide').html('Password does not match');
		}else if(strValue.length < 1){
			$node.next().removeClass('hide').html('Confirm Password missing');
		}
	};
	objForm.dobDay = function(paramNode){

		var objConfig = config();
		var $nodeDobContainer = objConfig.formNodes.$dateOfBirthField;
		var $nodeExceptionBlock = $nodeDobContainer.next('.exception.block');
		var blnIsNotANumber = true;
		var blnFoundError = false;

		$nodeExceptionBlock.addClass('hide').html(''); // reset		

		if( !!$nodeDobContainer.siblings('.exception.block').hasClass('hide') === true ){
			var $node = $(paramNode);
			var strValue = $node.val();
			blnIsNotANumber = isNaN(strValue);
			if( (strValue.length == 0) || (strValue == '0') || (blnIsNotANumber == true) ){
				$nodeExceptionBlock.removeClass('hide').html('Date of Birth is invalid');
				blnFoundError = true;
			}			
		}

		return blnFoundError;

	};
	objForm.dobMonth = function(paramNode){


		var $node = $(paramNode);
		var $nodeExceptionBlock = $node.parent('div').next('.exception.block');

		var blnIsNotANumber = true;

		$nodeExceptionBlock.addClass('hide').html(''); // reset
		var blnFoundError = false;
		
		var $node = $(paramNode);
		var strValue = $node.val();

		blnIsNotANumber = isNaN(strValue);	

		if( (strValue.length == 0) || (strValue == '0') || (blnIsNotANumber == true) ){
			$nodeExceptionBlock.removeClass('hide').html('Date of Birth is invalid');
			blnFoundError = true;
		}	

		return blnFoundError;		
		
	};
	objForm.dobYear = function(paramNode){

		var objConfig = config();
		var $nodeDobContainer = objConfig.formNodes.$dateOfBirthField;
		var $nodeExceptionBlock = $nodeDobContainer.next('.exception.block');
		var blnIsNotANumber = true;
		var blnFoundError = false;

		$nodeExceptionBlock.addClass('hide').html(''); // reset

		if( !!$nodeExceptionBlock.hasClass('hide') === true ){
			var $node = $(paramNode);
			var strValue = $node.val();
			blnIsNotANumber = isNaN(strValue);

			if( (strValue.length == 0) || (strValue == '0') || (blnIsNotANumber == true) ){
				$nodeExceptionBlock.removeClass('hide').html('Date of Birth is invalid');
				blnFoundError = true;
			}
		}
		return blnFoundError;		
	};				
	

	var bridgeCreateAccount = function(e){
		e.preventDefault();
		e.stopPropagation();
		var objConfig = e.data.config;    
		goToRegister(e, objConfig);		    
	};
	var bridgeSignIn = function(e){
		var objConfig = e.data.config;    
		goToSignIn(e, objConfig); 
	};	
	var bridgeSubmitCreateAccountFrm = function(e){
		var objConfig = e.data.config;		
		e.stopPropagation();
		var target = e.target;
		var blnFormOkToSubmit = objForm.checkFormBeforeSubmit(objConfig.formNodes);

		if(blnFormOkToSubmit === false){
			return false; // do not submit form invalid fields
		}
		
	};	
	var bridgeSignInToWebMD = function(e){

		var nodeName = e.target.nodeName.toLowerCase();

		if( (nodeName == 'button') || nodeName == 'span' ){
			var objConfig = e.data.config;		
			e.stopPropagation();
			var target = e.target;
			var blnFormOkToSubmit = objForm.checkFormBeforeSubmit(objConfig.formNodes);

			if(blnFormOkToSubmit === false){
				return false; // do not submit form invalid fields
			}
		}

	};		
	var bridgeValidate = function(e){
		var node = e.target;
		var id = node.getAttribute('id'); // dont always need jQuery
		var classAttr = node.getAttribute('class');
		var blnIsDob = classAttr.match('birthday');
		var hash = {};
		e.stopPropagation();		
		
		if(!!blnIsDob){ // check all Dob fields
			var $nodeParent = $(node).parent('div');
			var $dobFields = $('.birthday', $nodeParent);			
			for(var i = 0, len = $dobFields.length; i < len; i++){
				var id = $dobFields[i].getAttribute('id');
				hash[id] = $dobFields[i];
			}
		}else{
			hash[id] = e.target;
		}
		
		objForm.checkForException(hash);
	};
	var bridgeSwitchView = function(e){
		var href = e.target.getAttribute('href');
		listenerSwitchView(href, e.data.config);
	};	

	var listenerRaiseModal = function(e){
        var objConfig = e.data.config;
        objConfig.blnChkBoxIsChecked = false;        
        e.stopPropagation();
        objConfig.modalNodes.$uhidModalAccountLocked.removeClass('hide');
	};
	var listenerSwitchView = function(paramHref, paramConfig){
		var strHref = paramHref;
		var config = paramConfig;
		console.log('Reached listenerSwitchView');
		switch(strHref){
			case '#goToConsumer':
				$(config.cssClasses.footerPhysicianRegister).addClass('hide');
				$(config.cssClasses.footerConsumerRegister).removeClass('hide');
				config.nodes.$imageLeft.removeClass(config.cssClasses.physician).addClass(config.cssClasses.consumer);
				break;
			default:
				$(config.cssClasses.footerPhysicianRegister).removeClass('hide');
				$(config.cssClasses.footerConsumerRegister).addClass('hide');
				config.nodes.$imageLeft.removeClass(config.cssClasses.consumer).addClass(config.cssClasses.physician);
			}
	};
	var listenerCloseModal = function(e){
        var objConfig = e.data.config;

        var $nodeModalContainer = $(this).parents('.modal');
        $nodeModalContainer.addClass('hide');
	};				
	var listenerCheckBox = function(e){
        var objConfig = e.data.config;
        objConfig.blnChkBoxIsChecked = false;        
        e.stopPropagation();

        if(!!e.target.checked){
            objConfig.nodes.$btnUhidCreateAccount.removeClass(objConfig.cssClasses.disabled);
            objConfig.nodes.$btnUhidCreateAccount.removeAttr('disabled');
            objConfig.blnChkBoxIsChecked = true;
        }else{
            objConfig.nodes.$btnUhidCreateAccount.addClass(objConfig.cssClasses.disabled);
            objConfig.nodes.$btnUhidCreateAccount.attr('disabled', 'disabled');
        }
	};
	var listenerCheckBoxRememberMe = function(e){
        var objConfig = e.data.config;
        e.stopPropagation();
        // TODO: if checked save to cookie or localStorage or both or check localStorage false then save to cookie
	};			
	
	var module = {
		main:function(){
			var blnIsPhysician = true;

			var strQuery = window.location.search.toString().replace('?', ''); // TODO: we need a more precise query regEx depending on Rally requirements
			var objConfig = config();
			switch(strQuery){
				case objConfig.query.consumer: // consumer page state
					objConfig.nodes.$imageLeft.removeClass(objConfig.cssClasses.physician).addClass(objConfig.cssClasses.consumer); // swapout physian image for consumer image
					blnIsPhysician = false;
					break;
				case objConfig.query.physician: // physician page state
					// intentionally empty
				default: // page state defaults to physician
					objConfig.nodes.$imageLeft.removeClass(objConfig.cssClasses.consumer).addClass(objConfig.cssClasses.physician); // swapout physian image for consumer image
					objConfig.blnIsPhysician = true;
			}
			
			changePageState(objConfig, blnIsPhysician);  // change css classes relative consumer or physician
			$('input[type=text], input[type=password]', '#formUhid').on('blur', {config:objConfig}, bridgeValidate);
			objConfig.nodes.$btnUhidGoToPage.on('click', {config:objConfig}, bridgeCreateAccount);
			objConfig.formNodes.$TC.on('click', {config:objConfig}, listenerCheckBox);
			objConfig.formNodes.$RM.unbind('click', false);
			objConfig.formNodes.$RM.on('click', {config:objConfig}, listenerCheckBoxRememberMe);
			objConfig.nodes.$btnSigninAlreadyHaveAccount.on('click', {config:objConfig}, bridgeSignIn);
			objConfig.nodes.$btnUhidCreateAccount.unbind();

			objConfig.nodes.$btnUhidCreateAccount.on('click', {config:objConfig}, bridgeSubmitCreateAccountFrm);
			objConfig.nodes.$btnSigninWebMDAccnt.on('click', {config:objConfig}, bridgeSignInToWebMD);

			$(objConfig.selectorModalBtns.btnsCloseModalAccountLocked).on('click', {config:objConfig}, listenerCloseModal);
			$('.footerClickHere').on('click', {config:objConfig}, bridgeSwitchView);
			
		} // end main
		
	};	

	setTimeout(function(){
		$(module.main()); // wait for DOM
	}, 771);

})(jQuery, window, document);