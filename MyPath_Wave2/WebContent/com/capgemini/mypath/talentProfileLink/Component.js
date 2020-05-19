jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.declare("com.capgemini.mypath.talentProfileLink.Component");

//new Component initialization
sap.ui.core.UIComponent.extend("com.capgemini.mypath.talentProfileLink.Component", {

	metadata : {
		
		     properties: {
                    text : "string"
            }  
	}
});

com.capgemini.mypath.talentProfileLink.Component.prototype.createContent = function() {
	
	oView = sap.ui.view({
		id : "talprlink_view",
		viewName : "com.capgemini.mypath.talentProfileLink.view.TalentProfileLink",
		type : "JS",
		viewData : {
			component : this
		}
	});//.addStyleClass("dashboardview");
	
	//oView.setModel(myPathContext.i18nModel, "i18n");
	
	return oView;
	
};