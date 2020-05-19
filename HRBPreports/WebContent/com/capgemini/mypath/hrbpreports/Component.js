//new component declaration
jQuery.sap.declare("com.capgemini.mypath.hrbpreports.Component");

//define a new (simple) UIComponent
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("com.capgemini.mypath.hrbpreports.scripts.scripts");
jQuery.sap.require("com.capgemini.mypath.util.MyPathText");

//new component declaration
//jQuery.sap.declare("hrbpreports.Component");

//new Component initialization
sap.ui.core.UIComponent.extend("com.capgemini.mypath.hrbpreports.Component", {

	metadata : {
		properties : {
			text : "string"
		}
	}
});

com.capgemini.mypath.hrbpreports.Component.prototype.createContent = function() {
	openEmpDetails(myPathContext.appraiseeId);//Himanshu

	jQuery.sap.includeStyleSheet(hrbpreports_ns.url_app + "com/capgemini/mypath/hrbpreports/css/hrbpreports_style.css");	

	//create object for the application context
	if( !sap.ui.getCore().myPathContext){
		sap.ui.getCore().myPathContext = new Object();	
		myPathContext = sap.ui.getCore().myPathContext;
	}
	myPathContext.hrbpreportsContext = new Object();	
	hrbpreportsContext = myPathContext.hrbpreportsContext;
	
	var i18nModel = myPathContext.i18nModel;

	//var sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();	
	var sCurrentLocale = myPathContext.language;
	//hrbpreportsContext.oBundle = jQuery.sap.resources({url : hrbpreports_ns.url_app+"com/capgemini/mypath/hrbpreports/i18n/i18n.properties", locale: sCurrentLocale});
	hrbpreportsContext.oBundle = jQuery.sap.resources({url : myPathContext.url_app+"zmypath/com/capgemini/mypath/i18n/i18n.properties", locale: sCurrentLocale});
	
	var protocol = $(location).attr("protocol");
	var host = $(location).attr("host");
	var url_root = protocol + "//" + host + "/sap/opu/odata/sap/";
	hrbpreportsContext.sServiceUrl = url_root + "ZGW_MYPATH_HIST_HRBP_SRV";
	hrbpreportsContext.sServiceUrl1 = url_root + "ZGW_MYPATH_HISTORICAL_DOC_SRV";
	var hrbpreports_oDataModel = new sap.ui.model.odata.ODataModel(hrbpreportsContext.sServiceUrl);
	hrbpreportsContext.hrbpreports_oDataModel = hrbpreports_oDataModel;

	hrbpreportsContext.oModel = new sap.ui.model.odata.ODataModel(hrbpreportsContext.sServiceUrl, true, null, null, {
		"Content-Type": "application/x-www-form-urlencoded",
		"X-CSRF-Token": "Fetch"
	});
	var token = null;
	hrbpreportsContext.oModel.setHeaders({
		"X-Requested-With": "XMLHttpRequest",
		"Content-Type": "application/json",
		"DataServiceVersion": "2.0",
		"Accept": "application/atom+xml,application/atomsvc+xml,application/xml",
		"X-CSRF-Token": token
	});
	if(!myPathContext.hrbpreports_template_loaded) {
		var readRequestURL = "/ElementsTextSet?$filter=IvAppraisalType eq '" + myPathContext.documentText.PERFORMANCE_REVIEW + "'";
		myPathContext.dashboard_ODataModel.read(readRequestURL, null, null, false,     
				function(oData,oResponse){
			for(var i=0; i<oData.results.length; i++){
				var record = { name: oData.results[i].Name, infotext: oData.results[i].Tline};
				myPathContext.hrbpreports_template[oData.results[i].RowIid] = record;
			}
			myPathContext.hrbpreports_template_loaded = true;
		},
		function(oError){
		});
	}
	
	// six hardcoded variable for testing
	hrbpreportsContext.employeeId = "60000705";
	hrbpreportsContext.reviewerId = "60018639";
	hrbpreportsContext.currentStatus = "L";
	hrbpreportsContext.title = "Performance Review 2015";
	hrbpreportsContext.validFrom = "2015-01-01T00:00:00";
	hrbpreportsContext.validTo = "2015-12-31T00:00:00";
	hrbpreportsContext.employee = hrbpreportsContext.oBundle.getText("EMPLOYEE");			//			"Employee"    "Reviewer";

	// From MyPAth Context
	hrbpreportsContext.employeeId = myPathContext.appraiseeId;
	hrbpreportsContext.reviewerId = myPathContext.appraiserId;
	hrbpreportsContext.currentStatus = myPathContext.subStatus;
	hrbpreportsContext.title = myPathContext.docTitle;
	hrbpreportsContext.validFrom = myPathContext.validFrom;
	hrbpreportsContext.validTo = myPathContext.validTo;
	hrbpreportsContext.employee = myPathContext.isReviewer ? hrbpreportsContext.oBundle.getText("Reviewer") : hrbpreportsContext.oBundle.getText("EMPLOYEE");			//			"Employee"    "Reviewer";
	hrbpreportsContext.appraisalId = myPathContext.documentId;
	hrbpreportsContext.yearEndReviewerOverallAssessmentComment = "";
	hrbpreportsContext.workLifeCheck = "0000";
	hrbpreportsContext.workLifeBalanceComment = "";

	hrbpreportsContext.isEdited = false;
	hrbpreportsContext.isIndObjAddedDeleted = false;
	hrbpreportsContext.currentTabKey = 1;
	hrbpreportsContext.isCalledFromHRBP = true ;
	
	hrbpreportsContext.predefinedObjectivesModel = null;
	hrbpreportsContext.individualObjectivesModel = null;
	hrbpreportsContext.careerTitleDescriptionCommentsModel = null;
	hrbpreportsContext.overallMidYearCommentsModel = null;
	hrbpreportsContext.kpiModel = null;
	hrbpreportsContext.overallYearEndCommentsModel = null;
	hrbpreportsContext.calibratedRatingModel = null;
	hrbpreportsContext.ratingModel = null;
	hrbpreportsContext.selectedMenuItemCount = 1;
	hrbpreportsContext.appraiser_search_input = null;
	hrbpreportsContext.appraisee_search_input = null;
	
	var oView = sap.ui.view({
		//id : "hrbpreports",
		viewName : "com.capgemini.mypath.hrbpreports.view.hrbpreports",
		type: sap.ui.core.mvc.ViewType.JS,
		viewData : {
			component : this
		}
	});	
	oView.setModel(i18nModel, "i18n");
	hrbpreportsContext.doc_count = "";
	return oView;
	//},500);
};