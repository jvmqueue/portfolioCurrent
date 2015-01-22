/* Purpose: switch image during onMouseOver event */
/* Parameters: */
	/* image id */
	/*  div id */
function changeImgOver(imgId, divTxtOrdinal)
{
	/* image nested in anchor tag */
	var objBtn = document.getElementById(imgId);
	objBtn.src = "images/btnLeftSideBarOvr.png";
	var objBtnTxt = document.getElementById(divTxtOrdinal);
	objBtnTxt.style.color = "#949494";
}

/* Purpose: switch image during onMouseOut event */
/* Parameters: */
	/* image id */
	/*  div id */
function changeImgOut(imgId, divTxtOrdinal)
{
	var objBtn = document.getElementById(imgId);
	objBtn.src = "images/btnLeftSideBar.png";
	var objBtnTxt = document.getElementById(divTxtOrdinal);
	objBtnTxt.style.color = "#660000";
}