sap.ui.jsview("com.capgemini.mypath.employee_facet.view.emp_facet_list", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf com.capgemini.mypath.employee_facet.view.emp_facet_list
	*/ 
	getControllerName : function() {
		return "com.capgemini.mypath.employee_facet.view.emp_facet_list";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf com.capgemini.mypath.employee_facet.view.emp_facet_list
	*/ 
	createContent : function(oController) {
		var empFacetHeaderText = new sap.m.Text({
			text: "{i18n>DOCUMENTS}"
		}).addStyleClass("mypath_list_header_text");
			
		var employeeDocCountText = new sap.m.Text({
			text: myPathContext.employeeDocuments.length
		}).addStyleClass("mypath_list_header_num");
		asAnEmpContext.employeeDocCountText = employeeDocCountText;
		
		var headerLayout = new sap.ui.commons.layout.HorizontalLayout({
			content:[empFacetHeaderText,employeeDocCountText]
		}).addStyleClass("mypath_list_header_content");
		
		var employeeDocList = new sap.ui.commons.RowRepeater({
			numberOfRows: 10
		}).addStyleClass("mypath_doc_list");
		
		asAnEmpContext.employeeDocList = employeeDocList;
		
		var empDocPageLayout = new sap.ui.commons.layout.VerticalLayout({
			content:[headerLayout,employeeDocList]
		}).addStyleClass("mypath_doc_vlayout");
		
		this.addContent(empDocPageLayout);
	}

});