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
var url = "https://raw.githubusercontent.com/ndduc/SER416_FP/master/WebContent/json/cust.json?token=AGBY2BB4TBZ3ZZDQOIY7J7C6MVB66";
var url2 = "https://raw.githubusercontent.com/ndduc/SER416_FP/master/WebContent/json/userDetail.json?token=AGBY2BBEIR6SGLDUWKB574C6MVCAS";
var url3 = "https://raw.githubusercontent.com/ndduc/SER416_FP/master/WebContent/json/donor.json?token=AGBY2BEZFXXRMNLNE3FGZKK6MVCBW";
//var url2 = "https://github.com/ndduc/SER416_FP/blob/master/cust.json";

$(document).ready(function(){
	
	/**
	 * Get last string from href link
	 * where
	 * last string equivalent to
	 * 	?something
	 * */
	var path = window.location.href;
	console.log("TEST");
	console.log(path);
	var path2 = path.substring(path.lastIndexOf('/') + 1);
	console.log(path.substring(path.lastIndexOf('?') + 1));	//Get Last String aka - get Identifier for user
	var path3 = path.substring(path.lastIndexOf('?') + 1);
	
 
	/*
	 * This one generate data form
	 * Check service from customer side
	 * 
	 * */
	$.ajax({
    url: url,
    dataType: 'json',
      error: function(){
        console.log('JSON FAILED for data');
      },
    success:function(results){
  /* the results is your json, you can reference the elements directly by using it here, without creating any additional variables */
 
      var cartItemsList = document.getElementById("scheduleList");
      results.Cust.schedule.forEach(function(element) {
    	 
      var client = "data=" + element.task.client;
      console.log("Test predefined client: " + path3);
      console.log("Test Client: " + client); //Check if string is successfully concated
      
      /**
       * A conditional identify the correct user
       * */
      if(client == path3) {
    	  if(element.task.status == "Vacant") {
        	  console.log("HIT");
        	  cartItemsList.insertAdjacentHTML( 'beforeend',"<tr>" + "<td  onclick=\"cust_can_vacant()\"> <font color=\"blue\">" +   element.task.id + "</td><td>" + 
            		  element.task.name+ "</td><td>" + element.task.client+ "</td><td>" + element.task.status +  "</td><td>" +
            		  element.task.type + "</td><td>" + element.task.date +"</td><td>" + element.task.duration +"</td><td>" + 
            		  element.task.fee + "</td></tr>");
          } else {
        	  cartItemsList.insertAdjacentHTML( 'beforeend',"<tr>" + "<td  onclick=\"cust_can_book()\"> <font color=\"red\">" +   element.task.id + "</td><td>" + 
            		  element.task.name+ "</td><td>" + element.task.client+ "</td><td>" + element.task.status +  "</td><td>" +
            		  element.task.type + "</td><td>" + element.task.date +"</td><td>" + element.task.duration +"</td><td>" + 
            		  element.task.fee + "</td></tr>");
            // console.log(element.task.name);
          }
      }
      });
      // end of forEach
    }  // end of success fn
   }) // end of Ajax call
   
   
   
   /**
    * Generate data for 
    * 	Volunteer user
    * 		data include
    * 			view booked schedule
    * 
    *	User is identified the same way with the previous ajax
    * */
   $.ajax({
    url: url,
    dataType: 'json',
      error: function(){
        console.log('JSON FAILED for data');
      },
    success:function(results){
  /* the results is your json, you can reference the elements directly by using it here, without creating any additional variables */
 
      var cartItemsList = document.getElementById("scheduleList_Vol_Limit");
      results.Cust.schedule.forEach(function(element) {
    	 
      var client = "data=" + element.task.volun;
      console.log("Test predefined Volun: " + path3);
      console.log("Test Volun: " + client); //Check if string is successfully concated
      
      if(client == path3) {
    	  if(element.task.status == "Vacant") {
        	  console.log("HIT");
        	  cartItemsList.insertAdjacentHTML( 'beforeend',"<tr>" + "<td  onclick=\"vol_cancel()\"> <font color=\"red\">" +   element.task.id + "</td><td>" + 
            		  element.task.name+ "</td><td>" + element.task.client+ "</td><td>" + element.task.status +  "</td><td>" +
            		  element.task.type + "</td><td>" + element.task.date +"</td><td>" + element.task.duration +"</td><td>" + 
            		  element.task.fee + "</td></tr>");
          } else {
        	  cartItemsList.insertAdjacentHTML( 'beforeend',"<tr>" + "<td  onclick=\"vol_cancel()\"> <font color=\"red\">" +   element.task.id + "</td><td>" + 
            		  element.task.name+ "</td><td>" + element.task.client+ "</td><td>" + element.task.status +  "</td><td>" +
            		  element.task.type + "</td><td>" + element.task.date +"</td><td>" + element.task.duration +"</td><td>" + 
            		  element.task.fee + "</td></tr>");
            // console.log(element.task.name);
          }
      }
      });
      // end of forEach
    }  // end of success fn
   }) // end of Ajax call
   
   
   
   /**
    * generate data for volunteer view
    * 	data	
    * 		View available schedule
    * 
    * 	additional function needed
    * 		click on item - form pop up and allow user to simulate booking scenario
    * 
    * */
   $.ajax({
    url: url,
    dataType: 'json',
      error: function(){
        console.log('JSON FAILED for data');
      },
    success:function(results){
  /* the results is your json, you can reference the elements directly by using it here, without creating any additional variables */
 
      var cartItemsList = document.getElementById("scheduleList_Vol");
      results.Cust.schedule.forEach(function(element) {
    	 
    
    	  if(element.task.status == "Vacant") {
        	  console.log("HIT");
        	  cartItemsList.insertAdjacentHTML( 'beforeend',"<tr>" + "<td  onclick=\"book()\"> <font color=\"red\">" +   element.task.id + "</td><td>" + 
            		  element.task.name+ "</td><td>" + element.task.client+ "</td><td>" + element.task.status +  "</td><td>" +
            		  element.task.type + "</td><td>" + element.task.date +"</td><td>" + element.task.duration +"</td><td>" + 
            		  element.task.fee + "</td></tr>");
          } 
      
      });
      // end of forEach

    }  // end of success fn
   }) // end of Ajax call
   
   
   /**
    * generate data for paid-employee view - I call it admin for short
    * 	data
    * 	list of all available schedule aka job which have not been booked by any volunteers
    * */
   $.ajax({
    url: url,
    dataType: 'json',
      error: function(){
        console.log('JSON FAILED for data');
      },
    success:function(results){
  /* the results is your json, you can reference the elements directly by using it here, without creating any additional variables */
 
      var cartItemsList = document.getElementById("scheduleList_Ad_Avai");
      results.Cust.schedule.forEach(function(element) {
    	 
    
    	  if(element.task.status == "Vacant") {
        	  console.log("HIT");
        	  cartItemsList.insertAdjacentHTML( 'beforeend',"<tr>" + "<td>" +   element.task.id + "</td><td>" + 
            		  element.task.name+ "</td><td>" + element.task.client+ "</td><td>" + element.task.status +  "</td><td>" +
            		  element.task.type + "</td><td>" + element.task.date +"</td><td>" + element.task.duration +"</td><td>" + 
            		  element.task.fee + "</td></tr>");
          } 
      
      });
      // end of forEach
    }  // end of success fn
   }) // end of Ajax call
   
   
    /**
    * generate data for paid-employee view - I call it admin for short
    * 	data
    * 	list of occupied available schedule aka job which have been booked by any volunteers
    * */
   
   $.ajax({
    url: url,
    dataType: 'json',
      error: function(){
        console.log('JSON FAILED for data');
      },
    success:function(results){
  /* the results is your json, you can reference the elements directly by using it here, without creating any additional variables */
 
      var cartItemsList = document.getElementById("scheduleList_Ad_Ocp");
      results.Cust.schedule.forEach(function(element) {
    	 
    
    	  if(element.task.status == "Occupy") {
        	  console.log("HIT");
        	  cartItemsList.insertAdjacentHTML( 'beforeend',"<tr>" + "<td>" +   element.task.id + "</td><td>" + 
            		  element.task.name+ "</td><td>" + element.task.client+ "</td><td>" + element.task.status +  "</td><td>" +
            		  element.task.type + "</td><td>" + element.task.date +"</td><td>" + element.task.duration +"</td><td>" + 
            		  element.task.fee + "</td></tr>");
          } 
      
      });
      // end of forEach
    }  // end of success fn
   }) // end of Ajax call
   
   
   
    /**
    * generate data for paid-employee, volunteers, customers view 
    * 	
    * 	data
    * 	parsing data to input form
    * */
   
   
   $.ajax({
	    url: url2,
	    dataType: 'json',
	      error: function(){
	        console.log('JSON FAILED for data');
	      },
	      success:function(results){
	    	/* the results is your json, you can reference the elements directly by using it here, without creating any additional variables */
	    	var uname = document.getElementById("uname");
	    	
	    	results.users.user.forEach(function(element) {
	    	  var client = "data=" + element.info.name;
	    	  
	    	  if(client == path3){
	    		  console.log(element.info.fname);
	    		  uname.insertAdjacentHTML( 'beforeend', "<b>" + element.info.fname + "</b>");
	    		  document.getElementById("inputFn").value = element.info.fname;
	    		  document.getElementById("inputLn").value = element.info.lname;
	    		  document.getElementById("inputAdd").value = element.info.address;
	    		  document.getElementById("inputCity").value = element.info.city;
	    		  document.getElementById("inputZip").value = element.info.zip;
	    		  document.getElementById("inputPhone").value = element.info.phone;
	    	  }
	    	}
	    	
	    	);
	      // end of forEach
	    }  // end of success fn
	   }) // end of Ajax call
	   
	   
	   
	/**
    * generate data for donor view 
    * 	data
    * 	list of all donation belong to this user
    * */
	   
	   
	 $.ajax({
    url: url3,
    dataType: 'json',
      error: function(){
        console.log('JSON FAILED for data');
      },
    success:function(results){
  /* the results is your json, you can reference the elements directly by using it here, without creating any additional variables */
 
      var cartItemsList = document.getElementById("donaList");
      results.donation.donors.forEach(function(element) {
    	 
      var client = "data=" + element.info.name;
      console.log("Test predefined Donor: " + path3);
      console.log("Test Donor: " + client); //Check if string is successfully concated
      
      if(client == path3) {
    	  if(element.info.status == "accept") {
        	  console.log("HIT DONOR");
        	  cartItemsList.insertAdjacentHTML( 'beforeend',"<li><u><font color=\"blue\">" +   element.info.amount + ":  --   " + 
            		  element.info.name+ "  --   " + element.info.date+ "  --   " + element.info.status + "</font></u></li>");
          } else {
        	  cartItemsList.insertAdjacentHTML( 'beforeend',"<li>" +   element.info.amount + ":  --   " + 
            		  element.info.name+ "  --   " + element.info.date+ "  --   " + element.info.status + "</li>");
            // console.log(element.task.name);
          }
      }
      });
      // end of forEach
    }  // end of success fn
   }) // end of Ajax call
   
   
   
   /**
    * generate data for donor view 
    * 	data
    * 	list of all donation belong to this user
    * */
	   
   
   $.ajax({
    url: url2,
    dataType: 'json',
      error: function(){
        console.log('JSON FAILED for data');
      },
    success:function(results){
  /* the results is your json, you can reference the elements directly by using it here, without creating any additional variables */
 
      var cartItemsList = document.getElementById("viewEmp");
      results.users.user.forEach(function(element) {
    	 
    	  	/*
        	  cartItemsList.insertAdjacentHTML( 'beforeend',"<li><u id=\"" + element.info.name + "\"/ onclick=\"emp()\">" +   element.info.name + ":  --   " + 
            		  element.info.name+ "  --   " + element.info.type+ "  --   " + element.info.fname + "</font></u></li>");*/
    	  
    	  cartItemsList.insertAdjacentHTML( 'beforeend',"<li><u id=\"" + element.info.name + "\"/ onclick=\"emp()\">" +   element.info.name + "</font></u></li>");
    	  
    	  
        	  document.getElementById(element.info.name).style.cursor="pointer";
        	  
        	  var clickVar = "data=" + element.info.name;
        	  
      });
      
      // end of forEach
    }  // end of success fn
   }
   
   
   ) // end of Ajax call
	   
  //document.getElementById("demo").innerHTML = obj.name + ", " + obj.birth; 
 }) // end of $(document).ready() function
 
 
 
 
 /**
  * 	Function designed to handle logic in Admin view
  * 	Scenario
  * 	after click on Customer List
  * 		a list of all existing customer will be generated as a viewable form
  * 		this user is allow to click on the user name on the list
  * 			a corresponded form with corresponded data will display
  * 
  * */
 
 var click_var;
 function emp() {
	 window.onclick = e => {
			click_var = e.target.innerText;
		  //  console.log("onClick Window Test: " + click_var);
		

	 console.log("onClick Window Test: " + click_var);
        console.log("Clicked");
        var prs = document.getElementById("idCntViewEmp");
        var y = prs.getElementsByTagName("li");
        
        
        for(var i = 0; i < y.length; i++) {
        	console.log(y[i].textContent);
        	if(click_var == y[i].textContent) {
        		console.log("Hit Compare For");
        		ajaxData(url2, "emp_select", y[i].textContent);
        		//break;
        	}
        }
        
        hide(document.getElementById("idCntViewEmp"), 1);
        hide(document.getElementById("idCntCheckEmp"), 2);
	 }
 }
 
 
function ajaxData(source, option, arg_1) {
	if (option == "emp_select") {
	$.ajax({
	    url: source,
	    dataType: 'json',
	      error: function(){
	        console.log('JSON FAILED for data');
	      },
	    success:function(results){
	      results.users.user.forEach(function(element) {
	        	  var client = "data=" + element.info.name;
	        	  var test = "data=" + arg_1;
	        	  if(client == test) {
	        		  document.getElementById("inputFnEmp").value = element.info.fname;
    	    		  document.getElementById("inputLnEmp").value = element.info.lname;
    	    		  document.getElementById("inputAddEmp").value = element.info.address;
    	    		  document.getElementById("inputCityEmp").value = element.info.city;
    	    		  document.getElementById("inputZipEmp").value = element.info.zip;
    	    		  document.getElementById("inputPhoneEmp").value = element.info.phone;
    	    		 // break;
	        	  }
	      });
	      // end of forEach
	    }  // end of success fn
	   }
	   ) // end of Ajax call
	}
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
 * Book function for volunteer on the available list
 * If click on an item on id column a confirm window will pop up and ask weather you want to add this item to your job list
 * Though this is just for showing; the adding data to existing database will not be implemented in this program
 * */

function book() {
    
    window.onclick = e => {
			console.log(e.target.innerText);
			var test = e.target.innerText;
			
			if(test.length < 2 || test.length > 0) {	//condition terminate scenario when user click on empty row
				var yes = window.confirm("Confirm book service #" + test + "?")
				if (yes) {
					alert("Scenario: service " + test + " has been added to your job list");
					console.log("Not Implemented");
				}
				else {
					alert("Scenario: service " + test + " has been canceled");
					console.log("Not Implemented");
				}
			}
			
			
    }
}


function vol_cancel() {
	 window.onclick = e => {
			console.log(e.target.innerText);
			var test = e.target.innerText;
			if(test.length < 2 || test.length > 0) {	//condition terminate scenario when user click on empty row
				var yes = window.confirm("Confirm the cancellation of service #" + test + "?")
				if (yes) {
					alert("Scenario: service " + test + " has been canceled removed from job list");
					console.log("Not Implemented");
				}
				else {
					alert("Scenario: service " + test + " still remain in your job list");
					console.log("Not Implemented");
				}
			}
	 }
}
function cust_can_vacant() {
	window.onclick = e => {
		/**
		 * Get last string from href link
		 * where
		 * last string equivalent to
		 * 	?something
		 * */
		var path = window.location.href;
		console.log("TEST");
		console.log(path);
		var path2 = path.substring(path.lastIndexOf('/') + 1);
		console.log(path.substring(path.lastIndexOf('?') + 1));	//Get Last String aka - get Identifier for user
		var path3 = path.substring(path.lastIndexOf('?') + 1);
		
		console.log(e.target.innerText);
		var test = e.target.innerText;
		if(test.length < 2 || test.length > 0) {	//condition terminate scenario when user click on empty row
			var yes = window.confirm("Confirm the cancellation of service #" + test + "?")
			if (yes) {
				alert("Scenario: service " + test + " has been canceled removed from job list");
				$.ajax({
				    url: url,
				    dataType: 'json',
				      error: function(){
				        console.log('JSON FAILED for data');
				      },
				    success:function(results){
				     var cartItemsList = document.getElementById("scheduleList");
				     document.getElementById("scheduleList").innerHTML = "";
				     cartItemsList.insertAdjacentHTML('beforeend',"<tr><th>ID</th><th>Name</th> <th>Client</th><th>Status</th><th>Type</th><th>Date</th><th>Duration</th><th>Fee</th></tr>");
				      results.Cust.schedule.forEach(function(element) {
				    	  var client = "data=" + element.task.client;
				          console.log("Test predefined client: " + path3);
				          console.log("Test Client: " + client); //Check if string is successfully concated
				          if(client == path3) {
					    	  if(element.task.id == test) {
					    		  delete element.task;		//remove temporary data - for showing
					          } else {
					        	  cartItemsList.insertAdjacentHTML( 'beforeend',"<tr>" + "<td  onclick=\"cust_can_book()\"> <font color=\"red\">" +   element.task.id + "</td><td>" + 
					            		  element.task.name+ "</td><td>" + element.task.client+ "</td><td>" + element.task.status +  "</td><td>" +
					            		  element.task.type + "</td><td>" + element.task.date +"</td><td>" + element.task.duration +"</td><td>" + 
					            		  element.task.fee + "</td></tr>");
					          } 
				          }
				      }
				      );
				      // end of forEach
				    }  // end of success fn
				   }) // end of Ajax call
				   
				   console.log(JSON.parse(url));
			}
			else {
				alert("Scenario: service " + test + " still remain in your job list");
				console.log("Not Implemented");
			}
		}
 }
}
function cust_can_book() {
	window.onclick = e => {
		/**
		 * Get last string from href link
		 * where
		 * last string equivalent to
		 * 	?something
		 * */
		var path = window.location.href;
		console.log("TEST");
		console.log(path);
		var path2 = path.substring(path.lastIndexOf('/') + 1);
		console.log(path.substring(path.lastIndexOf('?') + 1));	//Get Last String aka - get Identifier for user
		var path3 = path.substring(path.lastIndexOf('?') + 1);
		
		console.log(e.target.innerText);
		var test = e.target.innerText;
		if(test.length < 2 || test.length > 0) {	//condition terminate scenario when user click on empty row
			var yes = window.confirm("Confirm the cancellation of service (Booked - penalty might apply) #" + test + "?")
			if (yes) {
				alert("Scenario: service " + test + " has been canceled removed from job list");
				$.ajax({
				    url: url,
				    dataType: 'json',
				      error: function(){
				        console.log('JSON FAILED for data');
				      },
				    success:function(results){
				     var cartItemsList = document.getElementById("scheduleList");
				     document.getElementById("scheduleList").innerHTML = "";
				     cartItemsList.insertAdjacentHTML('beforeend',"<tr><th>ID</th><th>Name</th> <th>Client</th><th>Status</th><th>Type</th><th>Date</th><th>Duration</th><th>Fee</th></tr>");
				      results.Cust.schedule.forEach(function(element) {
				    	  var client = "data=" + element.task.client;
				          console.log("Test predefined client: " + path3);
				          console.log("Test Client: " + client); //Check if string is successfully concated
				          if(client == path3) {
					    	  if(element.task.id == test) {
					    		  delete element.task;		//remove temporary data - for showing
					          } else {
					        	  cartItemsList.insertAdjacentHTML( 'beforeend',"<tr>" + "<td  onclick=\"cust_can_book()\"> <font color=\"red\">" +   element.task.id + "</td><td>" + 
					            		  element.task.name+ "</td><td>" + element.task.client+ "</td><td>" + element.task.status +  "</td><td>" +
					            		  element.task.type + "</td><td>" + element.task.date +"</td><td>" + element.task.duration +"</td><td>" + 
					            		  element.task.fee + "</td></tr>");
					          } 
				          }
				      }
				      );
				      // end of forEach
				    }  // end of success fn
				   }) // end of Ajax call
				   
				   console.log(JSON.parse(url));
			}
			else {
				alert("Scenario: service " + test + " still remain in your job list");
				console.log("Not Implemented");
			}
		}
 }
}


function empReportShow() {
	var no = 0;
	  var fe = 0;
	  var feMoney;
	  
	$.ajax({
	    url: url,
	    dataType: 'json',
	      error: function(){
	        console.log('JSON FAILED for data');
	      },
	    success:function(results){
	      var cartItemsList = document.getElementById("ulReport");
	      results.Cust.schedule.forEach(function(element) {
	    	  if(element.task.fee == "None") {
	    		  no = no + 1;
	        	  console.log("None " + no);
	        	 /* cartItemsList.insertAdjacentHTML( 'beforeend',"<tr>" + "<td>" +   element.task.id + "</td><td>" + 
	            		  element.task.name+ "</td><td>" + element.task.client+ "</td><td>" + element.task.status +  "</td><td>" +
	            		  element.task.type + "</td><td>" + element.task.date +"</td><td>" + element.task.duration +"</td><td>" + 
	            		  element.task.fee + "</td></tr>");*/
	        	  
	          } else if (element.task.fee !="None") {
	        	  fe = fe + 1;
	        	  console.log("Fee " + fe);
	        	  feMoney = feMoney + element.task.fee;
	        	  console.log("Money " + feMoney);
	        	  
	          }
	      }
	      );
	      cartItemsList.insertAdjacentHTML('beforeend',
    			  "<li><b>" + "Number of free service: " + no +
    			  "</b></li>");
	      
	      cartItemsList.insertAdjacentHTML('beforeend',
    			  "<li><b>" + "Number of paid service: " + fe +
    			  "</b></li><li><b>" + "Amount earn from paid service: $" + feMoney
    			  + "</b></li>");
	      // end of forEach
	    }  // end of success fn
	   }) // end of Ajax call
	   
}

function custSubJson() {
	alert("Your request has been submitted");
}

function custInfo() {
	alert("Your changes have been submitted");
}
 
 