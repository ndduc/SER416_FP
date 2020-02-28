/**
 * 	Background handling function
 * 
 * */
/*
$(window).load(function() {    
	var theWindow        = $(window),
	    $bg              = $("#bg"),
	    aspectRatio      = $bg.width() / $bg.height(); 			    		
	function resizeBg() {
		if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
		    $bg
		    	.removeClass()
		    	.addClass('bgheight');
		} else {
		    $bg
		    	.removeClass()
		    	.addClass('bgwidth');
		}	
	}      			
	theWindow.resize(resizeBg).trigger("resize");
});*/





/**
 *  Question event
 * 
 */

function question() {
//	alert("Question clicked");
	hideStyle1(document.getElementById("idCntMain"));
}



function custRequest() {
	
	console.log("Request is Clicked");
	hide(document.getElementById("idCntBase"), 1);
}

function custRequestShow() {
	hide(document.getElementById("idCntRequest"), 2);
}



function custCheck() {
	
	hide(document.getElementById("idCntBase"), 1);
}

function custCheckShow() {
	hide(document.getElementById("idCntViewSched"), 2);
}

function custEdit() {
	hide(document.getElementById("idCntBase"), 1);
}

function custEditShow() {
	hide(document.getElementById("idCntCheckInfo"), 2);
}

function empHuman() {
	hide(document.getElementById("idCntBase"), 1);
}

function empHumanShow() {
	hide(document.getElementById("idCntViewEmp"), 2);
}

function empReport() {
	
	hide (document.getElementById("idCntBase"), 1);
	
}

function empReportShow() {
	hide (document.getElementById("idCntViewReport"), 2);
	
}


/**
 * Request submit function
 * */

function custSubmit() {
	hide (document.getElementById("idCntRequest"), 1);
}

function custSubmitShow() {
	hide (document.getElementById("idCntBase"), 2);
}

/**
 * 	Check info submit function
 * */


function custSubmitSched() {
	hide (document.getElementById("idCntCheckInfo"), 1);
}

function custSubmitShowShed() {
	hide (document.getElementById("idCntBase"),2);
}


/**
 * Check Sched submit function
 * */

function custSubmitVS() {
	hide (document.getElementById("idCntViewSched"), 1);
}

function custSubmitShowVS() {
	hide (document.getElementById("idCntBase"),2);
}

function custSubmitEmp_Hide() {
	
	hide (document.getElementById("idCntCheckEmp"), 1);
	
}

function custSubmitEmp_Show() {
	hide (document.getElementById("idCntViewEmp"), 2);
	
}




var jsonData = {};
function custSubJson() {
	
}

/*
 * Hide element option 1 for hide and option 2 for display
 * */
function hide (elements, option) {
	  elements = elements.length ? elements : [elements];
	  
	  if (option == 1)
	  {
		  console.log("option = hidden");
		  for (var index = 0; index < elements.length; index++) {
			    elements[index].style.display = 'none';
		  }
	  } else {
		  console.log("option = visible");
		  for (var index = 0; index < elements.length; index++) {
			    elements[index].style.display = 'inline';
		  }
	  }
	  
	}
 
/**
 * Hide element with style
 */

function hideStyle1(elements) {
	/*
	-webkit-animation-name: aniCntLogin; 
	-webkit-animation-duration: 2s; 
	animation-name: aniCntLogin;
	animation-duration: 2s;*/

	elements = elements.length ? elements : [elements];
	for (var index = 0; index < elements.length; index++) {
	  elements[index].style.animationName = 'aniCntLoginHide';
	  elements[index].style.WebkitAnimationName  = 'aniCntLoginHide';
	}
}