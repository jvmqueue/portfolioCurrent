// ['Dependency Names'] // dependency array
// dependency function will be called to define the module, once dependencies have loaded
// function(dependencies passed to the definition function)
define(['booksData'], function(dataBooks){

	var Book = function(){
		// private
		var title = '';
		var isbn = null;
		var bookIndex = -1;
		var that = this;
		// privaleged
		this.setTitle = function(parmTitle){
			title = parmTitle;
		};
		this.getTitle = function(){
			return title;
		};
		// TODO: render book relative to isbn
		this.getIsbn = function(){
			console.log('Reached this.getIsbn isbn:\t', isbn);
		};
		this.setIsbn = function(parmTitle){ // setIsbn relative to title
			$(dataBooks.book).each(function(index, elm){ // iterate over our bookData JSON object
				if(!!elm.title.match(title)){ // exit if private title found in our book data
					isbn = elm.isbn; // found title; so, let's set our private isbn
					bookIndex = index;
					return void(0); // optimization exit when title found
				}
			}); // End each
		
		}; // End setIsbn
		this.display = function(parmNodeId, parmNodeErrorId){
			var $nodeException = $('#' + parmNodeErrorId);
			$nodeException.removeClass('warning');
			// TODO: check isbn
			// passes 10 digit isbn checksum
			// b.checkIsbn('0123-4-5-6782');
			// passes 13 digit isbn checksum
			// b.checkIsbn('0123-4-5-6782133');
			// TODO: checkIsbn should 0return custom error messages
			if( !that.checkIsbn(isbn).valid ){
				
				console.log('Reached display checkIsbn FAILED that.checkIsbn(isbn).exception:\t', that.checkIsbn(isbn).exception);
				$('#' + parmNodeErrorId).html(that.checkIsbn(isbn).exception);
				$nodeException.addClass('warning');
				$('#' + parmNodeId).attr('src', './images/bookException.png');
				
				return void(0); // exit when error is raised
				
			}
			$('#' + parmNodeId).attr('src', './images/' + dataBooks.book[bookIndex].image);
		}; // End display



	};
	// public
	Book.prototype = {
		checkIsbn:function(parmIsbn){
			console.log('Reached checkIsbn typeof isbn:\t', typeof parmIsbn);
			var isbn = parmIsbn;
			var checksum = -111;
			
			if(isbn == undefined || typeof isbn != 'string'){
				return {valid:false, exception:'checkIsbn Exception: isbn not defined or not string'};
			}
			isbn = isbn.replace(/-/g, ''); // remove dashes
			// isbn anything other than length 10 or 13
			// ie 9 is not 10 AND not 13; thus, 9 fails
			if(isbn.length != 10 && isbn.length != 13){
				return {valid:false, exception:'checkIsbn Exception: isbn length must be either 10 OR 13'};
			}
			var sum = 0;
			if(isbn.length === 10){ // 10 digit isbn
				if(!isbn.match(/^\d{9}/)){ // first 9 chars are NOT integers
					return {valid:false, exception:'checkIsbn Exception: first 9 digits must be integers'};
				}
				for(var i = 0; i < 9; i++){ // sum on 1 through 8 inclusively
					sum += isbn.charAt(i) * (10 - i);
				} // End for()
				checksum = sum % 11; // checksum between 0 AND 10 verify integrity of isbn
				

				if(checksum === 10){ // gaurentee checksum fails by assigning a non-digit to checksum
					checksum = 'X';
				}
				
				if( isbn.charAt(9) != checksum ){ // failed checksum
					return {valid:false, exception:'checkIsbn Exception: 10 digit isbn failed checksum:  ' + checksum};
				}				
				
			} /* End if(isbn.length === 10) */ else{ // 13 digit isbn
				if(!isbn.match(/^\d{12}/)){ // first 12 digits must be integers
					return {valid:false, exception:'checkIsbn Exception: first 12 digits must be integers'};
				}
				
				for(var i = 0; i < 12; i++){ // sum on 1 through 12 inclusively
					sum += isbn.charAt(i) * ( i % 2 === 0 ? 1 : 2);
				} // End for()

				checksum = sum % 10; // checksum between 0 AND 9 verify integrity of isbn

				if( isbn.charAt(12) != checksum ){ // 13 character failed checksum
					return {valid:false, exception:'checkIsbn Exception: 13 digit isbn failed checksum:   ' + checksum};
				}
				
			} /* End else 13-digit isbn */
			// all tests passed
			console.log('passed all tests');
			return {valid:true};
		}, // End checkIsbn()
		getAuthor:function(){},
		setAuthor:function(){},
		getName:function(){return 'Book';}
	};
	
	return{
		Book:Book
	}

}); // End defineiu