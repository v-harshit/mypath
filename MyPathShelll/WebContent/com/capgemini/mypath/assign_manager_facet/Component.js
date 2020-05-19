jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("com.capgemini.mypath.assign_manager_facet.scripts.FilterButton");
jQuery.sap.require("com.capgemini.mypath.assign_manager_facet.scripts.scripts");
jQuery.sap.declare("com.capgemini.mypath.assign_manager_facet.Component");

//new Component initialization
sap.ui.core.UIComponent.extend("com.capgemini.mypath.assign_manager_facet.Component", {

	metadata : {
		
		     properties: {
                    text : "string"
            }  
	}
});

com.capgemini.mypath.assign_manager_facet.Component.prototype.createContent = function() {
	
	 asAssignManagerContext.docArray = [];
	 asAssignManagerContext.empArray = [];
	 asAssignManagerContext.subStatusArr = [];
	 asAssignManagerContext.docFilter = [];
	 asAssignManagerContext.empFilter = [];
	 asAssignManagerContext.subStFilter = [];
	 asAssignManagerContext.actionFilter = [];
	 asAssignManagerContext.dateFilter = [];
	 asAssignManagerContext.totalSelectedButtonsArray = [];
	 asAssignManagerContext.asAnAMSelectedFilters = [];
	
    // create root view
	oView = sap.ui.view({
		viewName : "com.capgemini.mypath.assign_manager_facet.view.manager_facet_parent",
		type : "JS",
		viewData : {
			component : this
		}
	}).addStyleClass("facetview");
	
	oView.setModel(myPathContext.i18nModel, "i18n");
	
	return oView;
	
};