//new component declaration
jQuery.sap.declare("com.capgemini.mypath.feedback.Component");
jQuery.sap.require("com.capgemini.mypath.util.MyPathText");
//define a new (simple) UIComponent
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("com.capgemini.mypath.feedback.scripts.scripts");

//new component declaration
//jQuery.sap.declare("mypath_feedback.Component");

//new Component initialization
sap.ui.core.UIComponent.extend("com.capgemini.mypath.feedback.Component", {

	metadata : {
		properties : {
			text : "string"
		}
	}
}); 
 
com.capgemini.mypath.feedback.Component.prototype.createContent = function() {
	openEmpDetails(myPathContext.appraiseeId);
		
	
	//create object for the application context
	
	if( !sap.ui.getCore().myPathContext){
		sap.ui.getCore().myPathContext = new Object();	
		myPathContext = sap.ui.getCore().myPathContext;
	
	}
	
	if(!myPathContext.feedback_template_loaded)
	{
		jQuery.sap.includeStyleSheet(feedback_ns.url_app + "com/capgemini/mypath/feedback/css/feedback_style.css");
		getFeedbackTemplateService();
	}
	myPathContext.feedbackContext = new Object();	
	feedbackContext = myPathContext.feedbackContext;
	
	//setting global isEdited flag as false
	myPathContext.isEdited = false;
	
	feedbackContext.FileArray = [];
	
//	feedbackContext.doc_count = getDocCount(myPathContext.documentId,false);
	
 	 //Create odata model for feedback service
	 serviceURL = feedback_ns.url_root + "ZGW_MYPATH_GENERAL_FEEDBACK_SRV";//?sap-client=300";
     var feedback_oDataModel = new sap.ui.model.odata.ODataModel(serviceURL);
     feedbackContext.feedback_oDataModel = feedback_oDataModel;
     
     //Create odata model for Performance service
	 serviceURL = feedback_ns.url_root + "ZGW_MYPATH_PERFORMANCE_SRV";
     var performance_oDataModel = new sap.ui.model.odata.ODataModel(serviceURL);
     feedbackContext.performance_oDataModel = performance_oDataModel;
     
  // set i18n model 
 /*	var i18nModel = new sap.ui.model.resource.ResourceModel({ 
 		bundleName:"com.capgemini.mypath.feedback.i18n.translation",
 		bundleLocale:"EN"
 	});
 	
 	var sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();	
 	feedbackContext.oBundle = jQuery.sap.resources({url : feedback_ns.url_app+"com/capgemini/mypath/feedback/i18n/translation.properties", locale: sCurrentLocale});
     */
	var oView="";	
	
	//Declaring whether it is reviewer or not
	if(myPathContext.employeeId == myPathContext.appraiseeId)	
		myPathContext.isReviewer = false;	
	else
		myPathContext.isReviewer = true;
	
	
	feedbackContext.doc_count = getDocCount(myPathContext.documentId,false);	
	
	if(myPathContext.flag_generalfeedback && myPathContext.flag_generalfeedback.toUpperCase() == "CREATE")
	{
		feedbackContext.myGF = true ;
		myPathContext.flag_generalfeedback = "";
		// create root view
		oView = sap.ui.view({
			id : "mypath_feedback",
			viewName : "com.capgemini.mypath.feedback.view.create_feedback",
			type : "JS",
			viewData : {
				component : this
			}
		});  
		
		myPathContext.uploadContentVisible = true ;
		
		feedbackContext.isCalledFromFeedback = true;
		feedbackContext.isCalledFromDisplayFeedback = false;
	}

	
	
	//else if(myPathContext.isReviewer && myPathContext.flag_generalfeedback.toUpperCase() == "V")
	else if(myPathContext.isReviewer && myPathContext.subStatus == "V")
	{
		feedbackContext.myGF = false ;		
	// create root view
	oView = sap.ui.view({
		id : "mypath_feedback",
		viewName : "com.capgemini.mypath.feedback.view.feedback_for_others",
		type : "JS",
		viewData : {
			component : this
		}
	});  
	
	myPathContext.uploadContentVisible = true ;
	feedbackContext.isCalledFromFeedback = true;
	feedbackContext.isCalledFromDisplayFeedback = false;
	}
	
	else 
	{

		showBusy();
		var odatamodel =  feedbackContext.feedback_oDataModel;	
		var readRequestURL = "GetFeedbackDetailsSet?$filter=Appraisalid eq '"+myPathContext.documentId+"'";		
		odatamodel.read(readRequestURL, null, null, false, function (oData,oResponse) {
			hideBusy();
			feedbackContext.feedback_input_readOnly_data = oData.results[0].Feedback;
			feedbackContext.relationship_input_readOnly_data = oData.results[0].Relation;
			
			feedbackContext.myGF = false;
			// create root view
			oView = sap.ui.view({
				id : "mypath_feedback",
				viewName : "com.capgemini.mypath.feedback.view.display_feedback",
				type : "JS",
				viewData : {
					component : this
				}
			});    
			
			myPathContext.uploadContentVisible = false ;
			feedbackContext.isCalledFromFeedback = true;
			feedbackContext.isCalledFromDisplayFeedback = true;
					
		},
		function(oError)
		{
			hideBusy();
		
		});
	
	
	}
	
	
	//declaring flag
	feedbackContext.isCalledFromNext = false;
	
	
	//setting feedback flag to null
	myPathContext.flag_generalfeedback = "";	
	oView.setModel(myPathContext.i18nModel, "i18n");
	
	

	return oView;
};