jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("sap.m.MessagePopover");
jQuery.sap.declare("com.capgemini.mypath.dashboard.Component");

//new Component initialization
sap.ui.core.UIComponent.extend("com.capgemini.mypath.dashboard.Component", {

	metadata : {
		
		     properties: {
                    text : "string"
            }  
	}
});

com.capgemini.mypath.dashboard.Component.prototype.createContent = function() {
	
	jQuery.sap.require("com.capgemini.mypath.dashboard.scripts.scripts");
	
	/* Call service to get user dash board count */
	var serviceURL = myPathContext.url_root + "ZGW_MYPATH_USERDASHBOARD_SRV";
	var dashboard_ODataModel = new sap.ui.model.odata.ODataModel(serviceURL);
    myPathContext.dashboard_ODataModel = dashboard_ODataModel;
    myPathContext.seeAllFlag = false;
    
    callButtonTextService();
    callSubStatusTextService();
    callColumnTextService();
    
    // create root view
	oView = sap.ui.view({
		id : "dashboard_view",
		viewName : "com.capgemini.mypath.dashboard.view.dashboard_view",
		type : "JS",
		viewData : {
			component : this
		}
	}).addStyleClass("dashboardview");
	
	oView.setModel(myPathContext.i18nModel, "i18n");
	
	return oView;
	
};