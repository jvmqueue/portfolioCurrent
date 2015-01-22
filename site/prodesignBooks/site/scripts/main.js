// TODO: static
// TODO: private
// TODO: privaleged
// TODO: public
require(['bookLib', 'interface'], function(libBook, utilInterface){
	(function init($){
		// define new interface
		// Book class must satisfy interface, having methods defined in interface
		var Publication = new utilInterface.Interface('Publication', 
										['getIsbn', 
										 'setIsbn', 
										 'getTitle', 
										 'setTitle', 
										 'getAuthor', 
										 'setAuthor',
										 'getName',
										 'display'
										 ]);
		var mObjBook = new libBook.Book(); // instantiate Book, we will use the same instance during application life
		utilInterface.Interface.ensureImplements(mObjBook, Publication); // ensure our book object satisfies the interface

		var listener = {
			add:function(options){
				$('#' + options.id).bind(options.e, {}, options.listener);
			},
			listBookInfo:function(e){ // select onChange event
				// access value for option selected
				var $itemSelected = $(e.target.options[e.target.selectedIndex]);
				var txt = $itemSelected.html();
				mObjBook.setTitle(txt);
				mObjBook.setIsbn(); // set isbn relative to title during setTitle
			},
			renderBookInfo:function(e){ // submit click event
				mObjBook.display('image0', 'exception0'); // either renders data or raises exception
			}			
		};
		
		listener.add({id:'books0', e:'change', listener:listener.listBookInfo});
		listener.add({id:'btn0', e:'click', listener:listener.renderBookInfo});
		
	})(jQuery); // End init
}); // End require()