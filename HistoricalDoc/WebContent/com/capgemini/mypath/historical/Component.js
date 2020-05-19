//new component declaration
jQuery.sap.declare("com.capgemini.mypath.historical.Component");

//define a new (simple) UIComponent
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("com.capgemini.mypath.historical.scripts.scripts");

//new component declaration
//jQuery.sap.declare("mypath_feedback.Component");

//new Component initialization
sap.ui.core.UIComponent.extend("com.capgemini.mypath.historical.Component", {

	metadata : {
		properties : {
			text : "string"
		}
	}
});

com.capgemini.mypath.historical.Component.prototype.createContent = function() {

	jQuery.sap.includeStyleSheet(historical_ns.url_app + "com/capgemini/mypath/historical/css/historical_style.css");	
	
	//create object for the application context
	
	if( !sap.ui.getCore().myPathContext){
		sap.ui.getCore().myPathContext = new Object();	
		myPathContext = sap.ui.getCore().myPathContext;
	
	}
	
	myPathContext.historicalContext = new Object();	
	historicalContext = myPathContext.historicalContext;

   //Create odata model for historical documents service
   var serviceURL = historical_ns.url_root + "ZGW_MYPATH_HISTORICAL_DOC_SRV";
   var historical_oDataModel = new sap.ui.model.odata.ODataModel(serviceURL);
   historicalContext.historical_oDataModel = historical_oDataModel;
     
	var oView="";	

	oView = sap.ui.view({
		id : "mypath_historical",
		viewName : "com.capgemini.mypath.historical.view.historical_docs",
		type : "JS",
		viewData : {
			component : this
		}
	});    
    
	
	// set i18n model 
	/*var i18nModel = new sap.ui.model.resource.ResourceModel({ 
		bundleName:"com.capgemini.mypath.historical.i18n.translation",
		bundleLocale:"EN"
	});
	
	var sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();	
	historicalContext.oBundle = jQuery.sap.resources({url : historical_ns.url_app+"com/capgemini/mypath/historical/i18n/translation.properties", locale: sCurrentLocale});
	oView.setModel(i18nModel, "i18n");*/
	oView.setModel(myPathContext.i18nModel, "i18n");

	return oView;
};