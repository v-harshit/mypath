sap.ui.controller("com.capgemini.mypath.feedback.view.feedback_for_others", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.capgemini.mypath.feedback.view.feedback_for_others
*/
	onInit: function() {
		showBusy();
		var odatamodel =  feedbackContext.feedback_oDataModel;	
		var readRequestURL = "GetFeedbackDetailsSet?$filter=Appraisalid eq '"+myPathContext.documentId+"'";		
		odatamodel.read(readRequestURL, null, null, true, function (oData,oResponse) {
			hideBusy();
			feedbackContext.feedback_input.setValue(oData.results[0].Feedback);
			feedbackContext.relationship_input.setValue(oData.results[0].Relation);
			 
		},
		function(oError)
		{
			hideBusy();
		});
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf com.capgemini.mypath.feedback.view.feedback_for_others
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf com.capgemini.mypath.feedback.view.feedback_for_others
*/
	onAfterRendering: function() {
		feedbackContext.from_date.setText(feedbackContext.feedback_from_date.getValue());
		feedbackContext.to_date.setText(feedbackContext.feedback_to_date.getValue());
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf com.capgemini.mypath.feedback.view.feedback_for_others
*/
//	onExit: function() {
//
//	}
provideFeedback:function()
{
	showBusy();
	setTimeout(function(){
	if(feedbackContext.relationship_input.getValue().toString().trim()!="" && feedbackContext.feedback_input.getValue().toString().trim()!="")
	{
		
		var odatamodel = feedbackContext.feedback_oDataModel;
		odatamodel.setHeaders({
			"X-Requested-With" : "XMLHttpRequest",
			"Content-Type" : "application/atom+xml",
			"DataServiceVersion" : "2.0"
		});
		//showBusy();
		
		var provide_feedback_request = "ProvideFeedbackSet";
		
		var provide_feedback_data = {
				Appraisalid:myPathContext.documentId,
			    Relation:feedbackContext.relationship_input.getValue(),
				Feedback:feedbackContext.feedback_input.getValue()
			};
		//setTimeout(function(){
		//Call service to create feedback
		odatamodel.create(provide_feedback_request, provide_feedback_data, null, 
		
		//success function for create feedback service call		
		function(oData,oResponse) {
			if(oResponse.headers.status.toUpperCase() == "S")
			{
				hideBusy();
				var success_msg = decodeURI(oResponse.headers.message);
				  sap.m.MessageToast.show(success_msg, {
	                  duration: 3000,                  
	                  width: "40%",                   
	                  my: "center center",             
	                  at: "center center",             
	                  onClose: function(){
	                	  myPathContext.isEdited = false;
	                	  myPathContext.back();
	                  },                   
	                  animationDuration: 500,        
	              });
				
			}
			else
			{
				var error_msg = decodeURI(oResponse.headers.message);
				sap.ui.commons.MessageBox.alert(error_msg);
				hideBusy();
			}
		},
		
		//error function for create feedback service call
		function (oError) {
			hideBusy();
				
		});	
	//	}, 0);
	}
	else
		sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("Please_fill_all"));
	
	    hideBusy();
	}, 0);
	},
	saveFeedback:function()
	{
		showBusy();
		setTimeout(function(){
		feedback_ns.saveFeedback();
		}, 0);
	}
});

feedback_ns.saveFeedback = function()
{
  if(feedbackContext.relationship_input.getValue().toString().trim()!="" && feedbackContext.feedback_input.getValue().toString().trim()!="")
  {
	var odatamodel = feedbackContext.feedback_oDataModel;
	odatamodel.setHeaders({
		"X-Requested-With" : "XMLHttpRequest",
		"Content-Type" : "application/atom+xml",
		"DataServiceVersion" : "2.0"
	});
	//showBusy();
	var save_feedback_request = "SaveFeedbackSet";
	
	var save_feedback_data = {		
			Appraisalid:myPathContext.documentId,
			Relation:feedbackContext.relationship_input.getValue(),
			Feedback:feedbackContext.feedback_input.getValue()
		};
	//setTimeout(function(){
	//Call service to create feedback
	odatamodel.create(save_feedback_request, save_feedback_data, null, 
	
	//success function for create feedback service call		
	function(oData,oResponse) {
		hideBusy();
		
		if(oResponse.headers.status.toUpperCase() == "S")
		{
			var success_msg = decodeURI(oResponse.headers.message);
			sap.m.MessageToast.show(success_msg, {
                duration: 3000,                  
                width: "40%",                   
                my: "center center",             
                at: "center center",             
                onClose: function(){
                	myPathContext.isEdited = false;
                },                   
                animationDuration: 500,        
            });
			
		}
		else
		{
			var error_msg = decodeURI(oResponse.headers.message);
			sap.ui.commons.MessageBox.alert(error_msg);
			hideBusy();
		}
	},
	
	//error function for create feedback service call
	function (oError) {
		hideBusy();
			
	});	
	//}, 0);
  }
  else
		sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("Please_fill_all"));
  
  hideBusy();

	};
	

	