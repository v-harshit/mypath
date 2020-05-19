sap.ui.jsview("com.capgemini.mypath.talent_profileREV.view.talent_profile_mgr", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf com.capgemini.mypath.talent_profileREV.view.talent_profile_mgr
	*/ 
	getControllerName : function() {
		return "com.capgemini.mypath.talent_profileREV.view.talent_profile_mgr";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf com.capgemini.mypath.talent_profileREV.view.talent_profile_mgr
	*/ 
	createContent : function(oController) {

		
		var emp_list = new sap.m.List({
			
		});//.addStyleClass("tp_item_content_list");
		talentProfileREVContext.emp_list = emp_list;
		
		var myTP =  new sap.m.Text({
			//type : "Emphasized",
			//icon : "sap-icon://add",
			text: myPathContext.i18nModel.getProperty("MY_TALENT_PROFILE")
		}).addStyleClass("myTPText");
		
		var teamTP =   new sap.m.Text({
			//type : "Emphasized",
			//	icon : "sap-icon://add",
				text: myPathContext.i18nModel.getProperty("MY_TEAM_TALENT_PROFILE") , //"MY TEAM'S TALENT PROFILE",
		}).addStyleClass("myTeamTPText");
		
		var mgr_list = new sap.m.List({
			
		}).addStyleClass("tp_item_content_list");
		talentProfileREVContext.mgr_list = mgr_list;
		
		var empLabel = new sap.m.Text({
			text : myPathContext.i18nModel.getProperty("EMPLOYEES")
		}).addStyleClass("tp_mgr_label");
		
		var oDivider1 = new sap.ui.commons.HorizontalDivider().addStyleClass("tp_mgr_divider");
		
		var vLayout1 = new sap.ui.commons.layout.VerticalLayout({
			content:[myTP , mgr_list  , teamTP  , emp_list]
		}).addStyleClass("mypath_doc_info_section_tp");
		
		return vLayout1 ;

	

	}

});
