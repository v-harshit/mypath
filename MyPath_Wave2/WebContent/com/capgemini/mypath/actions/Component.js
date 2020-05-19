jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.declare("com.capgemini.mypath.actions.Component");

//new Component initialization
sap.ui.core.UIComponent.extend("com.capgemini.mypath.actions.Component", {

	metadata : {
		
		     properties: {
                    text : "string"
            }  
	}
});

com.capgemini.mypath.actions.Component.prototype.createContent = function() {
	
    // create root view
	oView = sap.ui.view({
		id : "actions_view",
		viewName : "com.capgemini.mypath.actions.view.actions_view",
		type : "JS",
		viewData : {
			component : this
		}
	}).addStyleClass("actionsview");
	
	oView.setModel(myPathContext.i18nModel, "i18n");
	
	return oView;
	
};