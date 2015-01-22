/* Purpose: custom user class maintains: */
	/* the body div that is unique to page in view: divIdBodyThisPage */
	/* the last character in the body div that is unique to this page: divIdBodyLastChr */
	/* last anchor clicked state: idNavButtonLastClicked  */	
	/* tab constant used by a horizontal nav bar: ConstParentAnchor */
var mObjNavHorizontal = new objNavHorizontal();
function objNavHorizontal()
{
	/* anchor, td, that belongs to this page */
	this.divIdBodyThisPage;
	/* last character in div body tags id */
	this.divIdBodyLastChr;
	/* last anchor that was clicked */
	this.idNavButtonLastClicked;
	/* constant prefix: table data nested in an anchor tag, used for concatenation with with page body div ordinal */
	this.constParentAnchor = "navCell";
}

/* Purpose: function that initializes page state */
function initializePage(IdTdTag)
{
	/* set the divIdBodyThisPage to the body div that is used on this page */
	mObjNavHorizontal.divIdBodyThisPage = IdTdTag;
	/* use the function that returns the div bodies last character */	
	var intBodyDivLastChr = getUniqueLastIdChr();
	/* assign our custom user object's member the last character in the div body tag that corresponds to the page in view */
	mObjNavHorizontal.divIdBodyLastChr = intBodyDivLastChr;
	/* use our custom user object's constParentAnchor and append the div bodies last character */
	var strTdCorspsToPage = mObjNavHorizontal.constParentAnchor;
	/* assign our custom user object member to the last character in body div tag that corresponds to the page in view */
	mObjNavHorizontal.divIdBodyLastChr = intBodyDivLastChr;
	/* get the object by using a concatenate string */
	strTdCorspsToPage += intBodyDivLastChr;	
	/* change the tag colour that corresponds to this page */
	colorTabCorrToThis(strTdCorspsToPage);
}
function hoverAnchorImage(strIdTdTag)
{
	alert("welcome to hover");
}
/* Purpose: style the nav button that corresponds to the page in view */
/* Parameters: objIdTdTag = tags id value */
function colorTabCorrToThis(objIdTdTag)
{
	var objButtonSelected;
	objButtonSelected = document.getElementById(objIdTdTag);
	with(objButtonSelected.style)
	{
		/* maroon background */
		backgroundImage="url(images/tabSmallRectangleBrown.png)";
		/* white text */
		color = "#4B0000";
	}
}

/* Purpose: A new button was clicked, change it's styling */
/* Parameters: objIdTdTag = tags id value */
function ColorSlctdTab(objIdTdTag)
{
	var objButtonSelected;
	objButtonSelected = document.getElementById(objIdTdTag);
	with(objButtonSelected.style)
	{
		/* maroon background */
		backgroundImage="url(images/tabSmallRectangle5.png)";
		/* white text */
		color = "#FFFFFF";
	}
}
/* Purpose: A new button was clicked; change td styling for the last button that was clicked */
/* Parameters: strIdTdTag = an id value of a document tag */
function ColorNotSlctdTab(strIdTdTag)
{
	var objBtnPreviousSelctd;
	objBtnPreviousSelctd = document.getElementById(strIdTdTag);
	with(objBtnPreviousSelctd.style)
	{
		/* gray background */
		backgroundImage="url(images/tabSmallRectangleOff6.png)";
		/* Maroon text color */
		color="4B0000";
	}
}

/* Purpose: locate a the div that is a parent to body contents */
/* Ues: keep the tab a maroon color that corresponds to this page */
function getUniqueLastIdChr()
{
	var docInView = document.getElementsByTagName("div");
	var blnDivBodyCorpsToPage = false;
	var strLength;
	var strLastChr;
	for(var i = 0; i < docInView.length; i++)
	{
		if(docInView[i].id == mObjNavHorizontal.divIdBodyThisPage)
		{
			/* get last character of div body tag */
			strLength = docInView[i].id.length;
			strLastChr = docInView[i].id.substring(strLength, strLength - 1);
			blnDivBodyCorpsToPage = true;
		}

	}
	/* last character, integer, in div body that corresponds to page in view */
	return strLastChr;
}
/* Purpose: return the last character in an object's id string */
function lastCharInId(strTdTag)
{
	var strIdTd = strTdTag;
	var intStrLngthIdTd = strIdTd.length;
	var chrLastChrter = strIdTd.substring(intStrLngthIdTd, intStrLngthIdTd - 1);
	/* return last character in objects id value */
	return chrLastChrter;
}

/* Purpose: controls  horizontal tab background images relative to the contents in the body div tag */
/* Parameters: IdAnchorTag = the button on horizontal menu that has been clicked */
function changeAnchorImage(IdTdTag)
{
	var intDivBodyTagLstChr;
	var intAnchorTagLastChr;
	var strPreviousTabClicked;
	strPreviousTabClicked = mObjNavHorizontal.idNavButtonLastClicked;
	intAnchorTagLastChr = lastCharInId(IdTdTag);
	/* if selected tab is not the tab that corresponds to the page in view */
	if(intAnchorTagLastChr != mObjNavHorizontal.divIdBodyLastChr)
	{
		/* change it's style to maroon */
		ColorSlctdTab(IdTdTag);
	}
		
	/* if the strPreviosTabClicked is null */
	if(strPreviousTabClicked == null)
	{
		/* do nothing with previous tab clicked */
	}
	else
	{
		intAnchorTagLastChr = lastCharInId(strPreviousTabClicked);
		/* if the previous tab that was clicked is not the tab that corresponds to the page in view */
		if(intAnchorTagLastChr != mObjNavHorizontal.divIdBodyLastChr)
		{
			/* change it's style to gray */
			/* if we click the previous tab then it's colour changes to the gray "previos tag colour" */
			/* if previous tab is the same as IdTdTag do nothing */
			if(strPreviousTabClicked != IdTdTag)
			{
				ColorNotSlctdTab(strPreviousTabClicked);
			}
		}
		
	}
		
	
	/* assign our custom user object's member to the last tab that was clicked */
	mObjNavHorizontal.idNavButtonLastClicked = IdTdTag;
	
}
/* Purpose: change styles during onMouseOut Event */
function mouseOut(IdTdTag)
{
	var IdTdTagLastChr;
	IdTdTagLastChr = lastCharInId(IdTdTag);
	/* if the IdTdTag last character matches the last character in our current body div tag's id, do nothing */
	if(IdTdTagLastChr != mObjNavHorizontal.divIdBodyLastChr)
	{
		var objTag = document.getElementById(IdTdTag);
		with(objTag.style)
		{
			textDecoration = "none";
		}
	}
}
/* Purpose: change styles during onMouseOver Event */
function mouseOver(IdTdTag)
{
	var IdTdTagLastChr;
	IdTdTagLastChr = lastCharInId(IdTdTag);
	/* if the IdTdTag last character matches the last character in our current body div tag's id, do nothing */
	if(IdTdTagLastChr != mObjNavHorizontal.divIdBodyLastChr)
	{
		var objTag = document.getElementById(IdTdTag);
		with(objTag.style)
		{
			
			textDecoration = "overline";
		}
	}
}













