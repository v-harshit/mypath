sap.ui.controller("com.capgemini.mypath.feedback.view.display_feedback", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.capgemini.mypath.feedback.view.display_feedback
*/
	onInit: function() {/*
		showBusy();
		var odatamodel =  feedbackContext.feedback_oDataModel;	
		var readRequestURL = "GetFeedbackDetailsSet?$filter=Appraisalid eq '"+myPathContext.documentId+"'";		
		odatamodel.read(readRequestURL, null, null, true, function (oData,oResponse) {
			hideBusy();
			feedbackContext.feedback_input_readOnly.setText(oData.results[0].Feedback);
			feedbackContext.relationship_input_readOnly.setText(oData.results[0].Relation);
			feedbackContext.feedback_input_readOnly.render();			
		},
		function(oError)
		{
			hideBusy();
		
		});
	*/}, 

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf com.capgemini.mypath.feedback.view.display_feedback
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf com.capgemini.mypath.feedback.view.display_feedback
*/
	onAfterRendering: function() {
		feedbackContext.from_date.setText(feedbackContext.feedback_from_date.getValue());
		feedbackContext.to_date.setText(feedbackContext.feedback_to_date.getValue());
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf com.capgemini.mypath.feedback.view.display_feedback
*/
//	onExit: function() {
//
//	}


});