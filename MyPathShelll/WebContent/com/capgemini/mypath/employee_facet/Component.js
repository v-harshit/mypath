jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("com.capgemini.mypath.employee_facet.scripts.FilterButton");
jQuery.sap.require("com.capgemini.mypath.employee_facet.scripts.scripts");

jQuery.sap.declare("com.capgemini.mypath.employee_facet.Component");

//new Component initialization
sap.ui.core.UIComponent.extend("com.capgemini.mypath.employee_facet.Component", {

	metadata : {
		
		     properties: {
                    text : "string"
            }  
	}
});

com.capgemini.mypath.employee_facet.Component.prototype.createContent = function() {
	 
	 asAnEmpContext.docArray = [];
	 asAnEmpContext.subStatusArr = [];
	 asAnEmpContext.docFilter = [];
	 asAnEmpContext.subStFilter = [];
	 asAnEmpContext.actionFilter = [];
	 asAnEmpContext.dateFilter = [];
	 asAnEmpContext.totalSelectedButtonsArray = [];
	 asAnEmpContext.totalSelectedButtons = 0;
	 asAnEmpContext.asAnEmpSelectedFilters = [];
	
    // create root view
	oView = sap.ui.view({
		id : "emp_facet_parent",
		viewName : "com.capgemini.mypath.employee_facet.view.emp_facet_parent",
		type : "JS",
		viewData : {
			component : this
		}
	}).addStyleClass("facetview");
	
	oView.setModel(myPathContext.i18nModel, "i18n");
	
	return oView;
	
};