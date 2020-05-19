// define a new (simple) UIComponent
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("com.capgemini.mypath.util.scripts");
jQuery.sap.require("com.capgemini.mypath.util.FilterButton");
jQuery.sap.require("com.capgemini.mypath.util.WorkflowType");
jQuery.sap.require("com.capgemini.mypath.util.Workflow");

//new component declaration
jQuery.sap.declare("com.capgemini.mypath.shell.Component");


// new Component initialization
sap.ui.core.UIComponent.extend("com.capgemini.mypath.shell.Component", {

	metadata : {
		
		     properties: {
                    text : "string"
            }  
	}
});

com.capgemini.mypath.shell.Component.prototype.createContent = function() {
	
//Create JSON for Document Icon
	var docJSON = {
		"2B" : "./com/capgemini/mypath/images/icon_emp_objsetting.png",
		"2C" : "./com/capgemini/mypath/images/icon_with_rev.png",
		"2D" : "./com/capgemini/mypath/images/icon_signoff1.png",
		"2E" : "./com/capgemini/mypath/images/icon_signoff2.png",
		
		"3F" : "./com/capgemini/mypath/images/icon_emp_objsetting.png",
		"3G" : "./com/capgemini/mypath/images/icon_signoff2.png",
		"3H" : "./com/capgemini/mypath/images/icon_signoff1.png",
		"3I" : "./com/capgemini/mypath/images/icon_complete.png",
		
		"4J" : "./com/capgemini/mypath/images/icon_emp_objsetting.png",
		"4K" : "./com/capgemini/mypath/images/icon_with_rev.png",
		"4L" : "./com/capgemini/mypath/images/icon_calibration.png",
		"4M" : "./com/capgemini/mypath/images/icon_signoff1.png",
		"4N" : "./com/capgemini/mypath/images/icon_yearend_signoff.png",
		"4O" : "./com/capgemini/mypath/images/icon_yearend_signoff.png",
		"5U" : "./com/capgemini/mypath/images/icon_complete.png",
		
		"2P" : "./com/capgemini/mypath/images/icon_emp_objsetting.png",
		"2Q" : "./com/capgemini/mypath/images/icon_signoff3.png",
		"2Z" : "./com/capgemini/mypath/images/icon_signoff2.png",
		"3R" : "./com/capgemini/mypath/images/icon_emp_objsetting.png",
		"3S" : "./com/capgemini/mypath/images/icon_signoff2.png",
		"3T" : "./com/capgemini/mypath/images/icon_signoff1.png",
		"3X" : "./com/capgemini/mypath/images/icon_complete.png",
		
		"2V" : "./com/capgemini/mypath/images/icon_gf.png",
		"2W" : "./com/capgemini/mypath/images/icon_complete.png",
		"3W" : "./com/capgemini/mypath/images/icon_complete.png",
		"3Z" : "./com/capgemini/mypath/images/icon_complete.png",
		
		//"2" : "NH"
	};
	//console.log(docJSON("1"));
	myPathContext.docJSON = docJSON ;
	
	
//Till Here	
	
	jQuery.sap.includeStyleSheet("com/capgemini/mypath/css/mypath_style.css");
	jQuery.sap.includeStyleSheet("com/capgemini/mypath/css/filter_button_style.css");
	jQuery.sap.includeStyleSheet("com/capgemini/mypath/css/workflow_style.css");
	jQuery.sap.includeStyleSheet("com/capgemini/mypath/css/common_style.css");
	jQuery.sap.includeStyleSheet("com/capgemini/mypath/css/appraisal_style.css");
		
	jQuery.sap.require("com.capgemini.mypath.shell.scripts.scripts");
	
	var oView = null;
	
	var hidden_date_for_format = new sap.m.DatePicker({
		visible: false
	});
	hidden_date_for_format.placeAt("content");
	myPathContext.hidden_date_for_format = hidden_date_for_format;
	
	//Ajax call to standard service to get logged in user data
	/*$.ajax({
 		url: myPathContext.url_host + '/sap/bc/ui2/start_up',
 		type :'GET',
 		async:false,
 		
 		//Success function for Ajax call
 		success : function (data){
 			 var userid = data.UserId;
 			 if(userid == "" || userid ==null){
 				 userid = data.id;
  			 }
 			
 			myPathContext.userid = userid;
 			
 			var date_format = data.dateFormat;
			 if(date_format == "" || date_format ==null){
				 date_format = data.dateFormat;
 			 }
			 
 			var oFormatSettings = sap.ui.getCore().getConfiguration().getFormatSettings();
 		    oFormatSettings.setLegacyDateFormat(date_format);
 			
 			 //Call service to get employee details for logged in user
 			 var serviceURL = myPathContext.url_root + "ZGW_MYPATH_USERDASHBOARD_SRV";
             var dashboard_ODataModel = new sap.ui.model.odata.ODataModel(serviceURL);
             myPathContext.dashboard_ODataModel = dashboard_ODataModel;
             
             var readRequestURL = "/EmployeeSet?$filter=SapUname eq '"+myPathContext.userid+"'";

             dashboard_ODataModel.read(readRequestURL, null, null, false,     
             
            function(oData,oResponse){
        
        		  hideBusy();
        		  if(oResponse.headers.error)
  				  {
        			  sap.m.MessageToast.show(oResponse.headers.error, {
        				    duration: 3000,                  
        				    width: "40%",                   
        				    my: "center center",             
        				    at: "center center",             
        				    onClose: function(){
        				    	//logoff event
        						$.ajax({
        							url: myPathContext.url_host+"/sap/public/bc/icf/logoff",
        							async: false
        						}).complete(function(){
        							location.reload();
        						});
        				    },                   
        				    animationDuration: 500,        
        				});
  					
  				  }
        		  else{
        			  if(oData.results.length > 0){
                 		 
        				//Set the employee data in application context
        				 var employeeData = oData.results[0];
                 		 
                 		 myPathContext.employeeId = employeeData.Employeeid;
                     	 myPathContext.employeeName = employeeData.EmployeeName;
                     	 myPathContext.employeeBand = employeeData.EmployeeBand;
                     	 myPathContext.employeeDesg = employeeData.EmployeeDesignation;
                     	 myPathContext.reviewerId = employeeData.ReviewerEmployeeid;
                     	 myPathContext.reviewerName = employeeData.ReviewerName;
                     	 myPathContext.isUserReviewer = employeeData.IsReviewer=="X"?true:false;
                     	 
                     	 //call function to register all required module paths
                     	 myPathContext.registerModulePath();
                     	 
                     		// create root view
                     		oView = sap.ui.view({
                     			id : "mypath_mainapp",
                     			viewName : "com.capgemini.mypath.shell.view.appshell",
                     			type : "JS",
                     			viewData : {
                     				component : this
                     			}
                     		});
                     		
                     		oView.setModel(myPathContext.i18nModel, "i18n");
                   		
                 	 }
                 	 
                 	 else{
                 		 //TO DO - code to display error message
                 	 }
        		  }
        		  
            }, 
             
             function(oError){
                 hideBusy(); 
            	 //TO DO - code to display error message
            	 
             });
 		 },
 	 
 		 //Error function for Ajax call
 		 error : function (e){
 			  hideBusy();
 			 //TO DO - code to display error message
 		 }
 	});*/
	
	 
	// create root view
	oView = sap.ui.view({
		id : "mypath_mainapp",
		viewName : "com.capgemini.mypath.shell.view.appshell",
		type : "JS",
		viewData : {
			component : this
		}
	});
	
	oView.setModel(myPathContext.i18nModel, "i18n");

	return oView;
	
};