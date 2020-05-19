sap.ui.controller("com.capgemini.mypath.assign_manager_facet.view.manager_facet_list", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.capgemini.mypath.assign_manager_facet.view.manager_facet_list
*/
	onInit: function() {

		var itemTemplate = createSeeAllDocumentItemTemplate("manager");
		if(!myPathContext.seeAllFlag){
			callAssignmentManager_FeedbackProviderService();
		}
		var action_data_model = new sap.ui.model.json.JSONModel();
		action_data_model.setData({modelData: myPathContext.assignmentManagerDocuments});
		asAssignManagerContext.assignManagerDocList.setModel(action_data_model);
		asAssignManagerContext.assignManagerDocList.bindRows("/modelData", itemTemplate);
	
	},
	
	onBeforeRendering: function(){
		var itemTemplate = createSeeAllDocumentItemTemplate("manager");
		if(!myPathContext.seeAllFlag){
			callAssignmentManager_FeedbackProviderService();
		}
		var action_data_model = new sap.ui.model.json.JSONModel();
		action_data_model.setData({modelData: myPathContext.assignmentManagerDocuments});
		asAssignManagerContext.assignManagerDocList.setModel(action_data_model);
		asAssignManagerContext.assignManagerDocList.bindRows("/modelData", itemTemplate);
		asAssignManagerContext.applyFilter();
	}

});