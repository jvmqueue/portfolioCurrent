/* Begin errors */

var exception = {
		error:function(parmError){
			this.message;
			switch(parmError){
				case 'notArray':
					this.message = 'Parameter expects an Array Object';
					break;
				case 'undefinedCase':
					this.message = 'Undefined case in switch';
					break;
				case 'xml':
					this.message = 'XML transport failed';
					break;
				default:
					this.message = 'Generic error thrown'
					break;
			} /* End switch() */
		} /* End error */
}; /* End exception */

/* End errors */