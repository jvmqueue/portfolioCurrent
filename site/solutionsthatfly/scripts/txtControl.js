/* Purpose: set font size to mI, increase font size until mI=22 */
var mI = 15;
function increaseTxtSize()
{
	var objSpan = document.getElementById("spanFirstBodyClaus");
	
	var timerIncreaseTxt = setTimeout("increaseTxtSize()", 200);
	objSpan.style.fontSize= mI + "px";
	mI++;
	if(mI >= 22)
	{
		clearTimeout(timerIncreaseTxt);
	}
}
/* Purpose: gradually change font colour from grayish to black */
var mArrayColor = new Array("#CCCCCC", "#BBBBBB", "#AAAAAA", "#999999", "#888888", "#777777","#666666", "#555555", "#444444", "#333333", "#222222", "#111111", "#000000");
var mI0 = 0;
var mChangeTxtTimer = null;
var mIsVisible = false;
function changeTxtColour(spanId)
{
	// get the object
	var objSpan = document.getElementById(spanId);
	// check if object is visible
	if(mIsVisible == false)
	{
		objSpan.style.visibility = "visible";
		mIsVisible = true;
	}
	// set the colour
	objSpan.style.color = mArrayColor[mI0];
	// increase our array index, next colour
	mI0++;
	// check if array's index is less or equal to array length
	if(mI0 <=mArrayColor.length)
	{
		// pass a function pointer to the setTimeout function, this allows us to pass the function a variable
		mChangeTxtTimer = setTimeout(function(){changeTxtColour(spanId)}, 200);
	}
	// if array's index greater than our array's length, stop the timer
	else
	{
		clearTimeout(mChangeTxtTimer);
	}
}

/* Purpose: control anchor 'Navigation' hover event */
function anchorHover(strAnchorId)
{
	var objAnchor = document.getElementById(strAnchorId);
	with(objAnchor.style)
	{
		color="#4B0000";
		textDecoration="overline";
	}

}
/* Purpose: control anchor 'Navigation' MOUSEout event */
function anchorMouseOut(strAnchorId)
{
	var objAnchor = document.getElementById(strAnchorId);
	with(objAnchor.style)
	{
		color="#4B0000";
		textDecoration="underline";
	}

}





















