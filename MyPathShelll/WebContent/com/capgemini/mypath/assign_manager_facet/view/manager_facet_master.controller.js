sap.ui.controller("com.capgemini.mypath.assign_manager_facet.view.manager_facet_master", {

	onInit: function(){
		asAssignManagerContext.generateFilters(false);
	},
	
	onBeforeRendering: function(){
		asAssignManagerContext.totalSelectedButtonsArray = [];
		asAssignManagerContext.generateFilters(true);
	}

});