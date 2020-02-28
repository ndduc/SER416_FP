 function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'json/datajson.json', true); // Replace 'my_data' with the path to your file
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
	 loadJSON(function(response) {
	  // Parse JSON string into object
	    var actual_JSON = JSON.parse(response);
	    var test1 = actual_JSON.duc;
	    
	    console.log(test1.test1);
	 });
}
 