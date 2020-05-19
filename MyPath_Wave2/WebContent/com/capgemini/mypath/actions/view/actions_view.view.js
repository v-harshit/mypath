sap.ui.jsview("com.capgemini.mypath.actions.view.actions_view", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf com.capgemini.mypath.actions.view.actions_view
	*/ 
	getControllerName : function() {
		return "com.capgemini.mypath.actions.view.actions_view";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf com.capgemini.mypath.actions.view.actions_view
	*/ 
	createContent : function(oController) {
 	
		var actionHeaderText = new sap.m.Text({
			text: "{i18n>DOCUMENTS}"
		}).addStyleClass("mypath_list_header_text");
			
		var actionCountText = new sap.m.Text({
			text: myPathContext.ActionsCount
		}).addStyleClass("mypath_list_header_num");
		
		var headerLayout = new sap.ui.commons.layout.HorizontalLayout({
			content:[actionHeaderText,actionCountText]
		}).addStyleClass("mypath_list_header_content");
		
		var actionsList = new sap.ui.commons.RowRepeater({
			numberOfRows: 10
		}).addStyleClass("mypath_doc_list");
		
		myPathContext.actionsDocList = actionsList;
		
		var actionPageLayout = new sap.ui.commons.layout.VerticalLayout({
			content:[headerLayout,actionsList]
		}).addStyleClass("mypath_doc_vlayout");
		
		this.addContent(actionPageLayout);
	}

});