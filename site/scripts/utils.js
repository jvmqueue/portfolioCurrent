/* Begin member level utilities */

var util = {
		doc:{
			topHeaderCss:'#topHeader0 span',
			topHeaderNode:''
		}, /* End doc */
		message:{
			isError:false,
			echo:function(parmMessage){
				Try.these(
					function(){console.log(parmMessage);},
					function(){confirm(parmMessage);}
				); /* End Try.these() */
			}, /* End echo */
			handlerPrint:function(parmText){
				var blnIsError = util.message.isError;
				var newNodeBreak = new Element('br', {'class':'jsNoClass'});
				var newNodeHTML = new Element('span', blnIsError == true ? {'class':'jsDataError'} : {'class':'jsData'});				
				newNodeHTML.update(parmText);
				util.doc.topHeaderNode.insert(newNodeBreak);
				util.doc.topHeaderNode.insert(newNodeHTML);
			}, /* End handlerPrint */
			xprint:function(parmArrayText, parmIsError){
				util.message.isError = parmIsError;
				util.doc.topHeaderNode == '' ? util.doc.topHeaderNode = $$(util.doc.topHeaderCss)[0] : '';				
				if(parmArrayText.constructor.toString().indexOf('Array') == -1){
					util.message.isError = true;
					var ex = new exception.error('notArray');
					util.message.handlerPrint('ex.message: ' + ex.message);
					return false;
				} /* End if() */
				else{
					parmArrayText.each(util.message.handlerPrint);					
				} /* End else */
			}, /* End xprint */
			clear:function(){
				util.doc.topHeaderNode == '' ? util.doc.topHeaderNode = $$(util.doc.topHeaderCss)[0] : '';
				util.doc.topHeaderNode.innerHTML = '';
			} /* End clear */
		}, /* End message */
		windows:{
			dim:{
				left:"10px",
				top:"10px",
				width:"860px",
				height:"660px"
			}, /* End dim */
			popUpWinName:0,
			popup:function(parmURL){
				smallWindowWidth = screen.width * (90/100);	
				smallWindowHeight = screen.height * (95/100);		
				if(util.windows.popUpWinName)
				{
					if(!util.windows.popUpWinName.closed) util.windows.popUpWinName.close();
				}
				util.windows.popUpWinName = open(parmURL, 'popUpWinName', 'toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,copyhistory=yes,width='+ util.windows.dim.width +',height='+ util.windows.dim.height +',left='+ util.windows.dim.left +', top='+ util.windows.dim.top +',screenX='+ util.windows.dim.width +',screenY='+ util.windows.dim.height +'');
			} /* End popup() */
		} /* End windows */
}; /* End util */

/* End member level utilities */