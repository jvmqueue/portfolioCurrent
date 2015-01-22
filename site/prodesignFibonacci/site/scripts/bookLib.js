define([''], function(){ // require.js syntax for namespacing, lazyloading, scoping
			
	var Book = (function(){ // singleton provides closure
		// private static
		var numOfBooks = 0;
		
		// private static method
		function checkIsbn(parmIsbn){
			
			if(parmIsbn == undefined || typeof parmIsbn != 'string'){
				return {exception:'isbn undefined or not type string'};
			}
			
			var isbn = parmIsbn.replace(/-/g, ''); // remove dashes
			
			if( (isbn.length !== 10) && (isbn.length !== 13) ){ // isbn must be either 10 digits or 13 digits
				return {exception:'invalid isbn length'};
			}
			
			var sum = 0;
			var checkSum = -1;
			
			if(isbn.length === 10){
				
				if(!!!isbn.match(/^\d{9}/)){ // first 9 characters must be digits
					return {exception:'isbn must contain only dashes and digits'};
				}
				
				for(var i = 0; i < 9; i++){
					sum += isbn.charAt(i) * (10 - i);
				}
				
				checkSum = sum % 11;
				
				if(checkSum === 10){ checkSum = 'X'; }

				if(isbn.charAt(9) != checkSum){ 
					return {exception:'isbn failed checksum'};
				}				
			} /* End if(isbn.length === 10) */ else{ // 13 digit isbn
				if(!!!isbn.match(/^\d{12}/)){
					return {exception:'isbn 13 in length, but first 12 chars must be digits'};
				}
				
				for(var i = 0; i < 12; i++){
					sum += isbn.charAt(i) * ( (i % 2  === 0) ? 1 : 3 );
				}
				
				checkSum = sum % 10;

				if(isbn.charAt(12) != checkSum){
					return {exception:'isbn is length 13, but failed checksum'};
				}				
				
			} // End else
			
			return true; // all tests passed

		} // End checkIsbn()
		
		// return the constructor
		return function(options){
			// private attributes
			var isbn, title, author, imageSource, $nodeImage, $nodeException, blnIsbnIsValid, exception;
			
			// privilaged methods
			this.getIsbn = function(){
				return isbn;
			}; // End this.getIsbn
			this.setIsbn = function(newIsbn){
				if( !!checkIsbn(newIsbn).exception ){
					blnIsbnIsValid = false; // use private var to indicate to display that isbn is not valid
					exception = checkIsbn(newIsbn).exception;
				}
				isbn = newIsbn;
				blnIsbnIsValid = true; // use private var to indicate to display that isbn is valid
			}; // End this.setIsbn			
			this.getTitle = function(){
				return title;
			}; // End this.getTitle
			this.setTitle = function(newTitle){
				title = newTitle || 'No title specified';
			}; // End this.setTitle			
			this.getAuthor = function(){
				return author;
			}; // End this.getAuthor
			this.setAuthor = function(newAuthor){
				author = newAuthor || 'No author specified';
			}; // End this.setAuthor
			this.getImageSource = function(){
				return imageSource;
			}; // End this.getImageSource
			this.setImageSource = function(newSource){
				imageSource = newSource || 'No Source specified';
			}; // End this.setImageSource			
			this.getNodeImage = function(){
				return $nodeImage;
			}; // End this.setNodeImage			
			this.setNodeImage = function(newImageId){
				$nodeImage = $('#' + newImageId) || 'No node Image id specified';
			}; // End this.setNodeImage
			this.getException = function(){
				return exception;
			}; // End this.setException
			this.setNodeException = function(newExceptionNodeId){
				$nodeException = $('#' + newExceptionNodeId) || 'No Exception node Id specified';
			}; // End this.setNodeException
			this.getNodeException = function(newExceptionNodeId){
				return $nodeException;
			}; // End this.setNodeException			
			
			// constructor code
			numOfBooks++; 	// keep track of how many books have been instantiated
							// with private static attribute
			if(numOfBooks > 5){
				exception = 'Book: only 5 instances of Book can be created';
			}
			// initialize our instance state
			this.setIsbn(options.isbn);
			this.setTitle(options.title);
			this.setAuthor(options.author);
			this.setImageSource(options.imgSrc);
			this.setNodeImage(options.nodeIdImage);
			this.setNodeException(options.nodeIdException);
			
		} // End return constructor
		
		
	})(); // End singleton Book
	
	// Public static method example only, we are not using it
	Book.convertToTitleCase = function(inputString){
		
	};
	
	// Public non-privilaged methods
	Book.prototype = {
		display:function(){ // only succeeds if no exception thrown
		
			if(!!this.getException()){
				var node = this.getNodeException();
				node.html( this.getException() ); 
				node.removeClass('hide');
				return void(0);
			}
			var nodeExist = this.getNodeImage();
			var imgSource = this.getImageSource();
			var path = './images/';
			nodeExist.attr('src', path + imgSource);

		}
	};
	

	return{ // using require.js So, we need to return members for public scope
		Book:Book
	}
});