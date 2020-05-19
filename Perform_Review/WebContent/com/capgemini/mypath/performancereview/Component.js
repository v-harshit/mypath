//new component declaration
jQuery.sap.declare("com.capgemini.mypath.performancereview.Component");

//define a new (simple) UIComponent
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("com.capgemini.mypath.performancereview.scripts.scripts");
jQuery.sap.require("com.capgemini.mypath.performancereview.commons.MyPathDocumentsStatusMatrix");
jQuery.sap.require("com.capgemini.mypath.util.MyPathText");

//new component declaration
//jQuery.sap.declare("PerformanceReview.Component");

//new Component initialization
sap.ui.core.UIComponent.extend("com.capgemini.mypath.performancereview.Component", {

	metadata : {
		properties : {
			text : "string"
		}
	}
});

com.capgemini.mypath.performancereview.Component.prototype.createContent = function() {
	openEmpDetails(myPathContext.appraiseeId);//Himanshu

	jQuery.sap.includeStyleSheet(performancereview_ns.url_app + "com/capgemini/mypath/performancereview/css/performancereview_style.css");	

	//create object for the application context
	if( !sap.ui.getCore().myPathContext){
		sap.ui.getCore().myPathContext = new Object();	
		myPathContext = sap.ui.getCore().myPathContext;
	}
	myPathContext.performancereviewContext = new Object();	
	performancereviewContext = myPathContext.performancereviewContext;
	performancereviewContext.statusMatrix = com.capgemini.mypath.performancereview.commons.MyPathDocumentsStatusMatrix;

	//Create odata model for performancereview service
	/*serviceURL = performancereview_ns.url_root + "ZGW_MYPATH_PERFORMANCE_SRV";//?sap-client=300";
	var performancereview_oDataModel = new sap.ui.model.odata.ODataModel(serviceURL);
	performancereviewContext.performancereview_oDataModel = performancereview_oDataModel;*/

	// set i18n model 
	/*var i18nModel = new sap.ui.model.resource.ResourceModel({ 
		bundleName:"com.capgemini.mypath.performancereview.i18n.i18n",
		bundleLocale:"EN"
	});*/
	
	var i18nModel = myPathContext.i18nModel;

	//var sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();	
	var sCurrentLocale = myPathContext.language;
	//performancereviewContext.oBundle = jQuery.sap.resources({url : performancereview_ns.url_app+"com/capgemini/mypath/performancereview/i18n/i18n.properties", locale: sCurrentLocale});
	performancereviewContext.oBundle = jQuery.sap.resources({url : myPathContext.url_app+"zmypath/com/capgemini/mypath/i18n/i18n.properties", locale: sCurrentLocale});
	
	var protocol = $(location).attr("protocol");
	var host = $(location).attr("host");
	var url_root = protocol + "//" + host + "/sap/opu/odata/sap/";
	performancereviewContext.sServiceUrl = url_root + "ZGW_MYPATH_PERFORMANCE_SRV";
	var performancereview_oDataModel = new sap.ui.model.odata.ODataModel(performancereviewContext.sServiceUrl);
	performancereviewContext.performancereview_oDataModel = performancereview_oDataModel;

	performancereviewContext.oModel = new sap.ui.model.odata.ODataModel(performancereviewContext.sServiceUrl, true, null, null, {
		"Content-Type": "application/x-www-form-urlencoded",
		"X-CSRF-Token": "Fetch"
	});
	var token = null;
	performancereviewContext.oModel.setHeaders({
		"X-Requested-With": "XMLHttpRequest",
		"Content-Type": "application/json",
		"DataServiceVersion": "2.0",
		"Accept": "application/atom+xml,application/atomsvc+xml,application/xml",
		"X-CSRF-Token": token
	});
	if(!myPathContext.performanceReview_template_loaded) {
		var readRequestURL = "/ElementsTextSet?$filter=IvAppraisalType eq '" + myPathContext.documentText.PERFORMANCE_REVIEW + "'";
		myPathContext.dashboard_ODataModel.read(readRequestURL, null, null, false,     
				function(oData,oResponse){
			for(var i=0; i<oData.results.length; i++){
				var record = { name: oData.results[i].Name, infotext: oData.results[i].Tline};
				myPathContext.performanceReview_template[oData.results[i].RowIid] = record;
			}
			myPathContext.performanceReview_template_loaded = true;
		},
		function(oError){
		});
	}
	
	// six hardcoded variable for testing
	performancereviewContext.employeeId = "60000705";
	performancereviewContext.reviewerId = "60018639";
	performancereviewContext.currentStatus = "L";
	performancereviewContext.title = "Performance Review 2015";
	performancereviewContext.validFrom = "2015-01-01T00:00:00";
	performancereviewContext.validTo = "2015-12-31T00:00:00";
	performancereviewContext.employee = performancereviewContext.oBundle.getText("EMPLOYEE");			//			"Employee"    "Reviewer";

	// From MyPAth Context
	performancereviewContext.employeeId = myPathContext.appraiseeId;
	performancereviewContext.reviewerId = myPathContext.appraiserId;
	// John's 2014 PR Form - Screenshots mail from Alexa
	if (myPathContext.subStatus) {
		performancereviewContext.currentStatus = myPathContext.subStatus;
	} else {
		performancereviewContext.currentStatus = "O";
	}
	performancereviewContext.title = myPathContext.docTitle;
	performancereviewContext.validFrom = myPathContext.validFrom;
	performancereviewContext.validTo = myPathContext.validTo;
	performancereviewContext.employee = myPathContext.isReviewer ? performancereviewContext.oBundle.getText("Reviewer") : performancereviewContext.oBundle.getText("EMPLOYEE");			//			"Employee"    "Reviewer";
	performancereviewContext.appraisalId = myPathContext.documentId;
	performancereviewContext.yearEndReviewerOverallAssessmentComment = "";
	performancereviewContext.workLifeCheck = "0000";
	performancereviewContext.workLifeBalanceComment = "";

	myPathContext.isEdited = false;
	performancereviewContext.isIndObjAddedDeleted = false;
	performancereviewContext.currentTabKey = 1;
	performancereviewContext.isCalledFromPR = true ;
	
	performancereviewContext.predefinedObjectivesModel = null;
	performancereviewContext.individualObjectivesModel = null;
	performancereviewContext.careerTitleDescriptionCommentsModel = null;
	performancereviewContext.overallMidYearCommentsModel = null;
	performancereviewContext.kpiModel = null;
	performancereviewContext.overallYearEndCommentsModel = null;
	performancereviewContext.calibratedRatingModel = null;
	performancereviewContext.ratingModel = null;
	
	var oView = sap.ui.view({
		//id : "PerformanceReview",
		viewName : "com.capgemini.mypath.performancereview.view.performanceReview",
		type: sap.ui.core.mvc.ViewType.JS,
		viewData : {
			component : this
		}
	});	
	oView.setModel(i18nModel, "i18n");
	performancereviewContext.doc_count = "";
	return oView;
	//},500);
};