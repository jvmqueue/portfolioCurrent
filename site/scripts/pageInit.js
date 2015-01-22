Event.observe(window, 'load', function(){
	/* use milliseconds as a query string to ensure our XML data always retrieved from server */
	var lclDate = new Date();
	var lclMiliSeconds = lclDate.getMilliseconds();
	new ClsPageInit({path:'data/dataPortfolio.xml?noCache=' + lclMiliSeconds});									   
});

var ClsXML = Class.create({
		initialize:function(parmPath){
			this.path = parmPath.path;
			this._transport();
		}, // End constructor
		_transport:function(){
			var req = new Ajax.Request(this.path, {
				method:'post',
				onFailure:function(){
					var EX = new exception.error('xml');
					util.message.xprint(['Exception: ' + EX.message], true);
				}, /* End onFailure() */
				onSuccess:function(parmTransport){
					xml.cache.portfolio.dom = parmTransport.responseXML.documentElement;
				}, /* End onSuccess() */
				onComplete:function(){
					if(xml.cache.portfolio.dom != null){
						/* bind via memo object our xml dom so that the listener can access xml data through its event object */
						document.fire('xml:cached', xml.cache.portfolio.dom);
					} /* End if() */
				} /* End onComplete() */
			}); /* End req */
		}, // End _transport()
		_handlerGetElements:function(parmNode){
			if(parmNode.nodeType == 1){
				return true;
			} /* End if() */
			else{
				return false;
			} /* End else */
		}, // End _handlerGetElements()
		getButtonText:function(parmXMLDom){
			/* use enumeration select method to access our Elements */
			var elements = $A(parmXMLDom.childNodes).select(this._handlerGetElements);
			var arrayBtnText = new Array(elements.length);
			var arrayBtnTextLength = arrayBtnText.length;
			/* access our name attributes */
			for(var i = 0; i < arrayBtnTextLength; i++){
				arrayBtnText[i] = elements[i].getAttribute('name');
			} /* End for() */
			return arrayBtnText;
		}, // End getButtonText()
		getPortfolioNodes:function(){
			var xmlFirstChilds = xml.cache.portfolio.dom.childNodes;
			var nodesXML = $A(xmlFirstChilds).select(this._handlerGetElements);
			return nodesXML;
		} // End getPortfolioNodes()
}); // End ClsXML

var ClsPageInit = Class.create({
		initialize:function(parmOptions){
			this.ClassXML = new ClsXML(parmOptions);
			this.lastNodeExistClicked = {node:null, text:null, blnDoubleClicked:false};
			this.nodesPortfolioXML = null;
			this.arrayCacheImg = null;
			this.intNumPreviousLi = null;
			this.blnIsIE6 = /msie|MSIE 6/.test(navigator.userAgent);
			this._addObservers();
		}, // End constructor
		_addObservers:function(){
			/* observe custom events which are fired relative to method completion */
			var lclListenerSetButtonTxt = this._lstnerSetButtonText.bindAsEventListener(this);
			document.observe('xml:cached', lclListenerSetButtonTxt);
			var lclListenerSetEvents = this._lstnerSetEvents.bindAsEventListener(this);
			document.observe('buttonText:set', lclListenerSetEvents);					
			var lstnerCacheImages = this._lstnerCacheImages.bindAsEventListener(this);
			document.observe('buttonEvents:set', lstnerCacheImages);				
			var lstnerSetIntlIframe = this._lstnerSetInitIframe.bindAsEventListener(this);
			document.observe('images:cached', lstnerSetIntlIframe);

		}, // End _addObservers()
		_lstnerCacheImages:function(parmEvent){
			var nodesPortfolioXML = parmEvent.memo.getElementsByTagName('portfolio');
			var nodesPortfolioLength = nodesPortfolioXML.length;
			this.arrayCacheImg = new Array(nodesPortfolioLength);
			for(var i = 0; i < nodesPortfolioLength; i++){
				this.arrayCacheImg[i] = new Image();
				this.arrayCacheImg[i].src = nodesPortfolioXML[i].attributes[2].nodeValue;
			} /* End for() */	
			document.fire('images:cached', xml.cache.portfolio.dom);
		}, // End _cacheImages()
		_lstnerSetInitIframe:function(parmEvent){
			$("right0").writeAttribute('src', parmEvent.memo.getElementsByTagName('iframe')[0].attributes[0].nodeValue);			
			this._setPageState(0);
		}, // End _lstnerSetInitIframe()
		_lstnerSetButtonText:function(parmEvent){
			/* we bound the xml dom to our event when we fired the event via the memo object */
			var arrayButtonText = this.ClassXML.getButtonText(parmEvent.memo);
			var nodesExistLis = $$('#buttons0 li');
			var nodesExistLisLength = nodesExistLis.length;
			for(var i = 0; i < nodesExistLisLength; i++){
				nodesExistLis[i].innerHTML =  arrayButtonText[i];
			} /* End for() */
			/* fire custom event and send our LI nodes as a memo object */
			document.fire('buttonText:set', nodesExistLis);			
		}, // End _setButtonText()
		_lstnerSetEvents:function(parmEvent){
			/* set our hover events here because IE does no recognize CSS hover psuedo class on LI */
			/* Begin bind mouseOver and mouseOut events to the same listener and pass it a boolean value */
			var lclEventMouseOver = this._eventMouseOverOut.bindAsEventListener(this, true);
			var lclEventMouseOut = this._eventMouseOverOut.bindAsEventListener(this, false);
			/* End bind mouseOver and mouseOut events to the same listener and pass it a boolean value */			
			var lclEventMouseClick = this._eventMouseClick.bindAsEventListener(this);
			var eventMemoLength = parmEvent.memo.length;
			for(var i = 0; i < eventMemoLength; i++){
				parmEvent.memo[i].observe('mouseover', lclEventMouseOver);
				parmEvent.memo[i].observe('mouseout', lclEventMouseOut);
				parmEvent.memo[i].observe('click', lclEventMouseClick);
			} // End for()
			document.fire('buttonEvents:set', xml.cache.portfolio.dom);
		}, // End _lstnerSetHoverEvents()
		_eventMouseOverOut:function(parmEvent, parmIsOver){
			/* add an undefined CSS class name to prevent IE failure */
			parmEvent.target.addClassName('jsNoClass');
			/* still fixing IE defects here */
			var cssClassAttbts = parmEvent.target.readAttribute('class') || parmEvent.target.getAttribute('class');

			if(cssClassAttbts.indexOf('jsMouseClick') == -1){
				/* button has not been clicked on so lets change the class name relative to mouseOver or mouseOut */
				/* essentially if a button does not have the jsMouseClick class remove all class names setting it back to default */
				parmEvent.target.removeClassName(cssClassAttbts);
			} /* End if() */			
			else{
				/* button has been clicked on so do nothing */
				/* optimization simply exit listener if the button is in the clicked state */
				return false;
			} /* End else */
			if(parmIsOver == true){
				/* optimization we are not adding mouseout class names so we dont have to remove class names here */
				parmEvent.target.addClassName('jsMouseover');
			} /* End if() */
			else{
				/* optimization: base.css has the rule ul li so simply remove class names for mouse out events */
				parmEvent.target.removeClassName(cssClassAttbts);
			} /* End else */
			parmEvent.stop();
		}, // End _eventMouseOver()
		_eventMouseClick:function(parmEvent){
			this.lastNodeExistClicked.blnDoubleClicked = false;
			var intTargetOrdinal = this._getNodeHTMLOrdinal(parmEvent.target);
			
			/* button clicked on twice */
			/* TODO: define a method that opens new window */
			if(parmEvent.target == this.lastNodeExistClicked.node){
				var strHttpSrc = $('right0').readAttribute('src');
				var blnIframeIsImageCapture = !!( strHttpSrc.lastIndexOf('.png') > -1 ); // found png in string
				if(blnIframeIsImageCapture === true){
					var attributeHttp = $('right0').readAttribute('http');
					util.windows.popup(attributeHttp + '?foundIframeHasImage=true');
					return false;
				}
				util.windows.popup($('right0').readAttribute('src'));
				this.lastNodeExistClicked.blnDoubleClicked = true;
			} /* End if() */
			/* first time button clicked or switched buttons */
			else{
				if( (this.lastNodeExistClicked.blnDoubleClicked == false) && (this.lastNodeExistClicked.node != null) ){
					/* reset last button text to its default AND remove our jsMouseClick class value */
					this.lastNodeExistClicked.node.update(this.lastNodeExistClicked.text);
					this.lastNodeExistClicked.node.removeClassName('jsMouseClick');
				} /* End if() */
				this._setPageState(intTargetOrdinal);
				this._setButtonState(parmEvent.target);
				/* scroll window to place Context Techniques within the view port */
//				window.scrollTo(100, 45);
			} /* End else */
			this.lastNodeExistClicked.node = parmEvent.target;
			parmEvent.stop();
		}, // _eventMouseClick()
		_getNodeHTMLOrdinal:function(parmNodeHTML){
			var strIdAttribute = parmNodeHTML.readAttribute('id');
			var blnIsNotANum = isNaN( parseInt( strIdAttribute.substring(strIdAttribute.length - 2, strIdAttribute.length) ) );
			var intIdOrdinal = null;
			/* assign our button ordinal relative to the last two characters in id */
			blnIsNotANum == true ? intIdOrdinal = strIdAttribute.substring(strIdAttribute.length - 1, strIdAttribute.length) : intIdOrdinal = strIdAttribute.substring(strIdAttribute.length - 2, strIdAttribute.length);
			return parseInt(intIdOrdinal);
		}, // End _getNodeHTMLOrdinal()
		_setButtonState:function(parmEventTarget){
			/* IE fix */
			var clsAttribute = parmEventTarget.readAttribute('class') || parmEventTarget.getAttribute('class');			
			/* capture the last buttons text only if it is NOT Open in new window */			
			parmEventTarget.innerHTML.indexOf('Open') == -1 ? this.lastNodeExistClicked.text = parmEventTarget.innerHTML : this.lastNodeExistClicked.text = null;
			parmEventTarget.removeClassName(clsAttribute);
			parmEventTarget.addClassName('jsMouseClick');
			parmEventTarget.update('New Window');								
		}, // End _setButtonState()
		_setPageState:function(parmIntPageOrdinal){
			/* assign our XML portfollio nodes to our instance property only if we have not collected the XML portfollio nodes */
			this.nodesPortfolioXML == null ? this.nodesPortfolioXML = this.ClassXML.getPortfolioNodes() : '';

			var objPage = {
				bkg:{img:'', color:''},
				str:{topHeader:'', context:[], httpPath:''},
				color:{topHeader:''},
				node:{topHeader:'', topCorner:'', context:''}
			}; /* End objPage */
			var nodePortfolioXML = this.nodesPortfolioXML[parmIntPageOrdinal];
			
						
			objPage.bkg.img = this.arrayCacheImg[parmIntPageOrdinal].src

			objPage.bkg.color = nodePortfolioXML.attributes[3].nodeValue;
			objPage.str.topHeader = nodePortfolioXML.getElementsByTagName('topHeader')[0].firstChild.nodeValue;
			objPage.color.topHeader = nodePortfolioXML.getElementsByTagName('topHeader')[0].attributes[0].nodeValue;
			objPage.node.topCorner = $('topCorner0');
			objPage.str.httpPath = nodePortfolioXML.getElementsByTagName('iframe')[0].getAttribute('http') || 'isEmpty';
			
			
			this.blnIsIE6 == true ? this._addAlphaImageLoader({node:objPage.node.topCorner, image:objPage.bkg.img}) : this._imageLoader({node:objPage.node.topCorner, image:objPage.bkg.img});

			objPage.node.topHeader = $$('#topHeader0 span')[0];
			objPage.node.topHeader.update(objPage.str.topHeader);
			objPage.node.topHeader.setStyle({color:objPage.color.topHeader});
			objPage.node.context = $('right1UL');
			objPage.node.context.up().setStyle({color:objPage.color.topHeader});


			/* TODO: create methods that update nodes like our image and our content and our LIs and our iframe src */
			/* TODO: Fix Bloody IE6 requires PNG filters for CSS button Sprite */
			/* TODO: fix halos around our button image map */

			/* TODO: Fix Pauls Nav tabs for FireFox */
			/* TODO: Fix SolutionsThatFly where image overlays text after animation is complet */
			/* TODO: Fix ThirtyThreeCircle Image descriptions collapse when in small window */
			/* TODO: Revise Resume XML driven */
			/* TODO: Fix Certificates when in Iframe or small window content should scale think about fluid layout */
			/* TODO: Rewrite Quiz you only need three tabs again incorporate listeners and XML feeds */
			/* TODO: clean up CSS file */
			var nodeContextXML = $A(nodePortfolioXML.getElementsByTagName('li'));
			
			var nodeContextLength = nodeContextXML.length;
			var newElmHTML = null;
			var nodeLineItemLength = null;
			for(var i = 0; i < nodeContextLength; i++){
				if(objPage.node.context.getElementsByTagName('li')[i] != undefined){
					newElmHTML = objPage.node.context.getElementsByTagName('li')[i];
					newElmHTML.update(nodeContextXML[i].firstChild.nodeValue);
				} /* End if() */
				else{
					newElmHTML = new Element('li');
					newElmHTML.update(nodeContextXML[i].firstChild.nodeValue);
					objPage.node.context.insert(newElmHTML);
				} /* End else */
				newElmHTML.setStyle({color:objPage.color.topHeader});
			} /* End for() */
			/* remove previous LIs from previous button click */
			for(var i = this.intNumPreviousLi ; i > nodeContextLength; i--){
				/* tag ordinals are base-0 so one less than our for counter */
				objPage.node.context.getElementsByTagName('li')[i-1].remove();
			} /* End for() */
			/* Heads-up! morph requires scriptaculous.js */
			$$('body')[0].morph({backgroundColor:objPage.bkg.color}, {duration:2.5});
			/* get the number of LIs inserted so that we can measure how many require removing on next click */
			this.intNumPreviousLi = nodeContextLength;
			/* set the iframes source */
			var strIFrameSrc = nodePortfolioXML.getElementsByTagName('iframe')[0].attributes[0].nodeValue;
			var intAttributeLength = nodePortfolioXML.getElementsByTagName('iframe')[0].attributes.length;
			
			if(intAttributeLength > 1){
				var strIframeHttp = nodePortfolioXML.getElementsByTagName('iframe')[0].attributes[1].nodeValue;
			}
			
			$("right0").writeAttribute('src', strIFrameSrc );
			$("right0").writeAttribute('http', objPage.str.httpPath ); // custom attribute for iframe having image as its resource instead of pointing at an actual page
			
			
			
			/* shut down scrolling if iframeHome.html is in IFrame */
			strIFrameSrc.indexOf('Home') == -1 ? $("right0").setStyle({overflow:'visible'}) : $("right0").setStyle({overflow:'hidden'});
		}, // End _setPageState()
		_addAlphaImageLoader:function(parmOptions){
			parmOptions.node.setStyle({filter:'progid:DXImageTransform.Microsoft.AlphaImageLoader(src='+parmOptions.image+ ',sizingMethod=crop' +')'});
		}, // End _addAlphaImageLoader()
		_imageLoader:function(parmOptions){
			parmOptions.node.setStyle({backgroundImage:'url('+parmOptions.image+')'});			
		} // End _imageLoader()		
}); // End ClsPageInit