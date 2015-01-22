var objIntervals = new intervals();
function intervals()
{
	this.int1500Move = 260;
	this.timer1500Move;
}
var objDocId = new docId();
function docId()
{
	this.LendsPrImg = "LeondsParaImg";
}
var mIn1500LeonImg = "LeondsParaImg";
function in1500Leon()
{
	var objDivLeon1500;
	objDivLeon1500 = document.getElementById(objDocId.LendsPrImg);
	
	with(objDivLeon1500.style)
	{
		top = objIntervals.int1500Move + "px";
	}
	
	objIntervals.int1500Move = objIntervals.int1500Move - .5;
	
	if(objIntervals.int1500Move >= 0)
	{
		objIntervals.timer1500Move = setTimeout(function() {in1500Leon()}, 2);
	}
	else
	{
		clearTimeout(objIntervals.timer1500Move);
	}
}




