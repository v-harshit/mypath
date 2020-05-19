sap.ui.controller("com.capgemini.mypath.employee_facet.view.emp_facet_master", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.capgemini.mypath.employee_facet.view.emp_facet_master
*/
	onInit: function() {
		asAnEmpContext.generateFilters(false);
	},

	onBeforeRendering: function(){
		asAnEmpContext.totalSelectedButtonsArray = [];
		asAnEmpContext.generateFilters(true);
	}
});