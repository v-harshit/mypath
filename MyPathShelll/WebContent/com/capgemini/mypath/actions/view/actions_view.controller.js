sap.ui.controller("com.capgemini.mypath.actions.view.actions_view", {
	onInit: function(){
		
		var itemTemplate = createSeeAllDocumentItemTemplate("action");
		if(!myPathContext.seeAllFlag){
			//callActionCountService();
			callEmployeeDocumentService();
			callAssignmentManager_FeedbackProviderService();
			callPerformanceReviewerService();
		}
		var action_data_model = new sap.ui.model.json.JSONModel();
		action_data_model.setData({modelData: myPathContext.actionDocuments});
		myPathContext.actionsDocList.setModel(action_data_model);
		myPathContext.actionsDocList.bindRows("/modelData", itemTemplate);
		
		 if ( undefined !=  myPathContext.ActionsCountACT)
             myPathContext.ActionsCountACT.setText(action_data_model.oData.modelData.length)
		
	},
	
	onBeforeRendering: function(){
		var itemTemplate = createSeeAllDocumentItemTemplate("action");
		if(!myPathContext.seeAllFlag){
			//callActionCountService();
			callEmployeeDocumentService();
			callAssignmentManager_FeedbackProviderService();
			callPerformanceReviewerService();
		}
		var action_data_model = new sap.ui.model.json.JSONModel();
		action_data_model.setData({modelData: myPathContext.actionDocuments});
		myPathContext.actionsDocList.setModel(action_data_model);
		myPathContext.actionsDocList.bindRows("/modelData", itemTemplate);
		
		 if ( undefined !=  myPathContext.ActionsCountACT)
             myPathContext.ActionsCountACT.setText(action_data_model.oData.modelData.length)
	},
	
	onAfterRendering: function(){
		//myPathContext.ActionsCountACT.setText("12");
	}
});