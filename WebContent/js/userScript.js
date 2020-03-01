 function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'https://raw.githubusercontent.com/ndduc/SER416_FP/master/WebContent/json/user.json?token=AGBY2BGHVXHWCZWWWLD6BAC6MVCZ2', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 
 function init() {
	 //https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
	 var actual_JSON;
	 var test1;
	 loadJSON(function(response) {
	  // Parse JSON string into object
	    actual_JSON = JSON.parse(response);
	     test1 = actual_JSON.duc;
	    
	  console.log(test1.test1);
	 });

//	 return actual_JSON;
}
 
 
 /**
  * 	Fire event on Login button
  */


function login() {
 	
	var tmpU= "ndduc";
 	var tmpP = "123456";
 	
 	var inputU = document.getElementById("idtxtU").value;
 	var inputP = document.getElementById("idtxtP").value;
 	
 	
 	
	//https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
 	//https://stackoverflow.com/questions/8430336/get-keys-of-json-object-in-javascript
	 var actual_JSON;
	 var test1;
	 loadJSON(function(response) {
	  // Parse JSON string into object
	    actual_JSON = JSON.parse(response);
	     test1 = actual_JSON.duc;
	    
	 //    console.log(test1.test1);
	     
	   //  var sub_key;
	     for(var i in actual_JSON){//1st round
	    	    var userName = i;
	    	    var test = actual_JSON[i];	//2nd round
	    	    if(inputU == userName) {
	    	    	
	    	    	//console.log("T: " + actual_JSON[i].pass);
	    	    	if(inputP == actual_JSON[i].pass) {
	    	    		if(actual_JSON[i].role == "paid") {
	    	    			console.log("HIT - PAID");
	    	    			console.log(inputU);
	    	    			window.location.href = "emp.html?data="+inputU;		//indicate sending valid user name to another page
	    	    			return 0;
	    	    		} else if (actual_JSON[i].role == "volunteer") {
	    	    			console.log("HIT - volunteer");
	    	    			//window.location.href = 'volun.html';
	    	    			window.location.href = "volun.html?data="+inputU;		//indicate sending valid user name to another page
	    	    			return 0;
	    	    		} else if (actual_JSON[i].role == "customer") {
	    	    			console.log("HIT - customer");
	    	    			//window.location.href = 'cust.html';
	    	    			window.location.href = "cust.html?data="+inputU;		//indicate sending valid user name to another page
	    	    			return 0;
	    	    		} else if (actual_JSON[i].role == "donor") {
	    	    			console.log("HIT - donor");
	    	    			//window.location.href = 'donor.html';
	    	    			window.location.href = "donor.html?data="+inputU;		//indicate sending valid user name to another page
	    	    			return 0;
	    	    		} 
	    	    	}
	    	    }
	    	 //   console.log(userName);
	    }
	     
	  	
	 	


	 	alert("Incorrect Username or Password");
	 	
	 });
	 
	 
	
 }
