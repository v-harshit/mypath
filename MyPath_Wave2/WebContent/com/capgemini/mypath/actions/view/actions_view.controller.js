sap.ui.controller("com.capgemini.mypath.actions.view.actions_view", {
	onInit: function(){
		
		var itemTemplate = createSeeAllDocumentItemTemplate("action");
		if(!myPathContext.seeAllFlag){
			callActionCountService();
			callEmployeeDocumentService();
			callAssignmentManager_FeedbackProviderService();
		}
		var action_data_model = new sap.ui.model.json.JSONModel();
		action_data_model.setData({modelData: myPathContext.actionDocuments});
		myPathContext.actionsDocList.setModel(action_data_model);
		myPathContext.actionsDocList.bindRows("/modelData", itemTemplate);
		
	},
	
	onBeforeRendering: function(){
		var itemTemplate = createSeeAllDocumentItemTemplate("action");
		if(!myPathContext.seeAllFlag){
			callActionCountService();
			callEmployeeDocumentService();
			callAssignmentManager_FeedbackProviderService();
		}
		var action_data_model = new sap.ui.model.json.JSONModel();
		action_data_model.setData({modelData: myPathContext.actionDocuments});
		myPathContext.actionsDocList.setModel(action_data_model);
		myPathContext.actionsDocList.bindRows("/modelData", itemTemplate);
	}
});