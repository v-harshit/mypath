sap.ui.controller("com.capgemini.mypath.employee_facet.view.emp_facet_list", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.capgemini.mypath.employee_facet.view.emp_facet_list
*/
	onInit: function() {
		
		this.getView().setModel(asAnEmpContext.i18nModel, "i18n");
		if(! myPathContext.seeAllFlag){
			callEmployeeDocumentService();
		}
		var itemTemplate = createSeeAllDocumentItemTemplate("employee");
		var action_data_model = new sap.ui.model.json.JSONModel();
		action_data_model.setData({modelData: myPathContext.employeeDocuments});
		asAnEmpContext.employeeDocList.setModel(action_data_model);
		asAnEmpContext.employeeDocList.bindRows("/modelData", itemTemplate);
		
	
	},
	
	onBeforeRendering: function(){
		if(! myPathContext.seeAllFlag){
			callEmployeeDocumentService();
		}
		var itemTemplate = createSeeAllDocumentItemTemplate("employee");
		var action_data_model = new sap.ui.model.json.JSONModel();
		action_data_model.setData({modelData: myPathContext.employeeDocuments});
		asAnEmpContext.employeeDocList.setModel(action_data_model);
		asAnEmpContext.employeeDocList.bindRows("/modelData", itemTemplate);
		asAnEmpContext.applyFilter();
	}

});
