sap.ui.jsview("com.capgemini.mypath.talent_profile.view.talent_profile_mgr", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf com.capgemini.mypath.talent_profile.view.talent_profile_mgr
	*/ 
	getControllerName : function() {
		return "com.capgemini.mypath.talent_profile.view.talent_profile_mgr";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf com.capgemini.mypath.talent_profile.view.talent_profile_mgr
	*/ 
	createContent : function(oController) {
		
		var emp_list = new sap.m.List({
			
		});//.addStyleClass("tp_item_content_list");
		talentProfileContext.emp_list = emp_list;
		
		var mgr_list = new sap.m.List({
			
		}).addStyleClass("tp_item_content_list");
		talentProfileContext.mgr_list = mgr_list;
		
		var empLabel = new sap.m.Text({
			text : "Employees"
		}).addStyleClass("tp_mgr_label");
		
		var vLayout1 = new sap.ui.commons.layout.VerticalLayout({
			content:[mgr_list , empLabel , emp_list]
		}).addStyleClass("mypath_doc_info_section_tp");
		
		return vLayout1 ;

	}

});
