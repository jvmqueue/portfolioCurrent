(function($){
	$(function(){
		var dom = {
			menu:{
				container:$('#tabContainer'),
				tabs:$('#tabContainer li dl'),
				toggle:function(e){
					// ensure children of menu do not cause menu close
					if(e.target.nodeName.toUpperCase() == 'SPAN'){
						dom.menu.resett($(e.target).next());
						$(e.target).next().toggle();					
					}
				}, // toggle			
				resett:function(parmNode){
					(dom.menu.tabs).each(function(index, elm){
						// reset all menus except the one which was clicked
						if(parmNode.attr('id') != $(this).attr('id')){
							$(this).css({'display':'none'});
						}						
					});// each
				}// resett
			},// menu
			setListener:function(parms){
				$(parms).each(function(index, options){
					$(options.node).bind(options.event, options.listener);
				});// each				
			}// setListener
		};// dom
		var init = {
			controller:(function(){
				$(dom.menu.tabs).each(function(index, elm){
					var that = $(this);
					(that).toggle();
					dom.setListener([
						{node:that.parent(), 'event':'click', listener:dom.menu.toggle}			 
					]);
				});// each
			})()// controller
		};// init
	});// DOM Loaded
})(jQuery);// self-executing singleton