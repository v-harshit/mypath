sap.ui.jsview("com.capgemini.mypath.employee_facet.view.emp_facet_parent", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf com.capgemini.mypath.employee_facet.view.emp_facet_parent
	*/ 
	getControllerName : function() {
		return "com.capgemini.mypath.employee_facet.view.emp_facet_parent";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf com.capgemini.mypath.employee_facet.view.emp_facet_parent
	*/ 
	createContent : function(oController) {
		
		var hLayout = new sap.ui.commons.layout.HorizontalLayout().addStyleClass("facet_layout");
		
		var masterView = new sap.ui.jsview("com.capgemini.mypath.employee_facet.view.emp_facet_master").addStyleClass("facet_master_page");
		var detailView = new sap.ui.jsview("com.capgemini.mypath.employee_facet.view.emp_facet_list").addStyleClass("facet_list_page");
		
		hLayout.addContent(masterView);
		hLayout.addContent(detailView);
		
		this.addContent(hLayout);
	}

});