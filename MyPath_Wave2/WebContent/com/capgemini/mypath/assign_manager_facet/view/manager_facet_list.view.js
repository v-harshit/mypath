sap.ui.jsview("com.capgemini.mypath.assign_manager_facet.view.manager_facet_list", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf com.capgemini.mypath.assign_manager_facet.view.manager_facet_list
	*/ 
	getControllerName : function() {
		return "com.capgemini.mypath.assign_manager_facet.view.manager_facet_list";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf com.capgemini.mypath.assign_manager_facet.view.manager_facet_list
	*/ 
	createContent : function(oController) {

		var assignManagerFacetHeaderText = new sap.m.Text({
			text: "{i18n>DOCUMENTS}"
		}).addStyleClass("mypath_list_header_text");
			
		var managerDocCountText = new sap.m.Text({
			text: myPathContext.assignmentManagerDocuments.length
		}).addStyleClass("mypath_list_header_num");
		asAssignManagerContext.managerDocCountText = managerDocCountText;
		
		var headerLayout = new sap.ui.commons.layout.HorizontalLayout({
			content:[assignManagerFacetHeaderText,managerDocCountText]
		}).addStyleClass("mypath_list_header_content");
		
		var assignManagerDocList = new sap.ui.commons.RowRepeater({
			numberOfRows: 10
		}).addStyleClass("mypath_doc_list");
		
		asAssignManagerContext.assignManagerDocList = assignManagerDocList;
		
		var empDocPageLayout = new sap.ui.commons.layout.VerticalLayout({
			content:[headerLayout,assignManagerDocList]
		}).addStyleClass("mypath_doc_vlayout");
		
		this.addContent(empDocPageLayout);
	
	}

});