// moveTo(0,0); resizeTo(screen.availWidth,screen.availWidth)
function windowOpn()
{
	// '_top' ensures document is opened in the same window
	var myWindow = window.open('index0.htm', '_top', 'toolbar=yes, directories=yes, location=yes, status=yes, menubar=yes, resizable=yes, scrollbars=yes, width=1200, height=1200, screenX=0,screenY=0,left=0,top=0');
	myWindow.resizeTo(1200, 1200);
	myWindow.outerHeight = 1200; 
	myWindow.outerWidth = 1200; 
	myWindow.moveTo(0, 0);
}

/* Begin unused function */
var qDuration=600; 
var qCounter=0; 
function quake() 
{ // the horizontal displacement 
var deltaX=1; // make sure the browser support the moveBy method 
if (window.moveBy) 
{
	for (qCounter=0; qCounter<qDuration; qCounter++) 
	{ // shake left 
		if ((qCounter%4)==0) 
		{ 
			window.moveBy(deltaX, 0); 
		} // shake right else 
		if ((qCounter%4)==2) 
		{ 
			window.moveBy(-deltaX, 0); 
		} // speed up or slow down every X cycles 
		if ((qCounter%30)==0) 
		{ // speed up halfway 
			if (qCounter<qDuration/2) 
			{ 
				deltaX++; 
			} // slow down after halfway of the duration 
			else 
			{ 
				deltaX--; 
			} 
		} 
	} 
} 
}

/* End unused function */