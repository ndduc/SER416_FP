/*
 * custScript
 * Purpose:
 * 	Parsing customer schedule
 * 	Assume user name: cust 
 *  login to the system
 *  customer then click on check schedule
 *  	any scheduled was created by this user will be parsed on the schedule list
 *  	Black string indicates - vacant schedule
 *  	Blue string indicate - occupied schedule - meaning schedule is already accept by a volunteer
 *  
 *  
 *  If use login as Volunteer or Admin then the list will show schedule of all customer
 *  	Color indicate the same definition with customer view
 *  */
var url = "json/userDetail.json";
//var url2 = "https://github.com/ndduc/SER416_FP/blob/master/cust.json";
/* this tells the page to wait until jQuery has loaded, so you can use the Ajax call */

$(document).ready(function(){
	var path = window.location.href;
	console.log("TEST");
	console.log(path);
	var path2 = path.substring(path.lastIndexOf('/') + 1);
	console.log(path.substring(path.lastIndexOf('?') + 1));	//Get Last String aka - get Identifier for user
	var path3 = path.substring(path.lastIndexOf('?') + 1);
	
  $.ajax({
    url: url,
    dataType: 'json',
      error: function(){
        console.log('JSON FAILED for data');
      },
    success:function(results){
  /* the results is your json, you can reference the elements directly by using it here, without creating any additional variables */
 
   //   var cartItemsList = document.getElementById("info");
      results.users.usr.forEach(function(element) {
    	 
      var client = "data=" + element.info.name;
      console.log("Test predefined client: " + path3);
      console.log("Test Client: " + client); //Check if string is successfully concated
      
      if(client == path3) {
    	  console.log(client.info.fname);
      }
      });
      // end of forEach
    }  // end of success fn
   }) // end of Ajax call
   
  //document.getElementById("demo").innerHTML = obj.name + ", " + obj.birth; 
 }) // end of $(document).ready() function