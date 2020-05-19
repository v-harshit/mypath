//new component declaration
jQuery.sap.declare("com.capgemini.mypath.performancereviewVP.Component");

//define a new (simple) UIComponent
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("com.capgemini.mypath.performancereviewVP.scripts.scripts");
jQuery.sap.require("com.capgemini.mypath.performancereviewVP.commons.MyPathDocumentsStatusMatrix");
jQuery.sap.require("com.capgemini.mypath.util.MyPathText");
//new component declaration
//jQuery.sap.declare("performancereviewVP.Component");

//new Component initialization
sap.ui.core.UIComponent.extend("com.capgemini.mypath.performancereviewVP.Component", {

	metadata : {
		properties : {
			text : "string"
		}
	}
});

com.capgemini.mypath.performancereviewVP.Component.prototype.createContent = function() {
	openEmpDetails(myPathContext.appraiseeId);//Himanshu

	jQuery.sap.includeStyleSheet(performancereviewVP_ns.url_app + "com/capgemini/mypath/performancereviewVP/css/performancereviewVP_style.css");	

	//create object for the application context
	if( !sap.ui.getCore().myPathContext){
		sap.ui.getCore().myPathContext = new Object();	
		myPathContext = sap.ui.getCore().myPathContext;
	}
	myPathContext.performancereviewVPContext = new Object();	
	performancereviewVPContext = myPathContext.performancereviewVPContext;
	performancereviewVPContext.statusMatrix = com.capgemini.mypath.performancereviewVP.commons.MyPathDocumentsStatusMatrix;

	//Create odata model for performancereviewVP service
	/*serviceURL = performancereviewVP_ns.url_root + "ZGW_MYPATH_VP_PREVIEW_SRV";
	var performancereviewVP_oDataModel = new sap.ui.model.odata.ODataModel(serviceURL);
	performancereviewVPContext.performancereviewVP_oDataModel = performancereviewVP_oDataModel;*/

	// set i18n model 
	var i18nModel = new sap.ui.model.resource.ResourceModel({ 
		bundleUrl: myPathContext.url_app+"zmypath/com/capgemini/mypath/i18n/i18n.properties",
		bundleLocale:"EN"
	});
	//i18nModel = myPathContext.i18nModel;

	//var sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();
	
	var sCurrentLocale = "EN"; //for VP the form will always be in English
	//performancereviewVPContext.oBundle = jQuery.sap.resources({url : performancereviewVP_ns.url_app+"com/capgemini/mypath/performancereviewVP/i18n/i18n.properties", locale: sCurrentLocale});
	performancereviewVPContext.oBundle = jQuery.sap.resources({url : myPathContext.url_app+"zmypath/com/capgemini/mypath/i18n/i18n.properties", locale: sCurrentLocale});
	
	var protocol = $(location).attr("protocol");
	var host = $(location).attr("host");
	var url_root = protocol + "//" + host + "/sap/opu/odata/sap/";
	performancereviewVPContext.sServiceUrl = url_root + "ZGW_MYPATH_VP_PREVIEW_SRV";
	performancereviewVPContext.sServiceUrlFromEmp = url_root + "ZGW_MYPATH_PERFORMANCE_SRV";
	var performancereviewVP_oDataModel = new sap.ui.model.odata.ODataModel(performancereviewVPContext.sServiceUrl);
    performancereviewVPContext.performancereviewVP_oDataModel = performancereviewVP_oDataModel;
    
    performancereviewVPContext.oModel = new sap.ui.model.odata.ODataModel(performancereviewVPContext.sServiceUrl, true, null, null, {
		"Content-Type": "application/x-www-form-urlencoded",
		"X-CSRF-Token": "Fetch"
	});
	var token = null;
	performancereviewVPContext.oModel.setHeaders({
		"X-Requested-With": "XMLHttpRequest",
		"Content-Type": "application/json",
		"DataServiceVersion": "2.0",
		"Accept": "application/atom+xml,application/atomsvc+xml,application/xml",
		"X-CSRF-Token": token
	});
	if(!myPathContext.performancereviewVP_template_loaded) {
		var documentText = myPathContext.documentText.VP_PERFORMANCE_REVIEW.replace('&', '%26');
		var readRequestURL = "/ElementsTextSet?$filter=IvLangu eq 'E' and IvAppraisalType eq '" + documentText+ "'";
		myPathContext.dashboard_ODataModel.read(readRequestURL, null, null, false,     
				function(oData,oResponse){
			for(var i=0; i<oData.results.length; i++){
				var record = { name: oData.results[i].Name, infotext: oData.results[i].Tline};
				myPathContext.performancereviewVP_template[oData.results[i].RowIid] = record;
			}
			myPathContext.performancereviewVP_template_loaded = true;
		},
		function(oError){
		});

		/* Function to call service to get button texts */
		var readRequestURL = "/ButtonTextSet?$filter=IvLangu eq 'E'";
		myPathContext.dashboard_ODataModel.read(readRequestURL, null, null, false,     
				function(oData,oResponse){
			for(var i=0; i<oData.results.length; i++){
				myPathContext.buttonTextVP[oData.results[i].Id] = oData.results[i].Text;
			}
		},
		function(oError){
		});

		/* Function to call service to get sub status text */
		var readRequestURL = "/StatusTextSet?$filter=IvLangu eq 'E'";
		myPathContext.dashboard_ODataModel.read(readRequestURL, null, null, false,     
				function(oData,oResponse){
			for(var i=0; i<oData.results.length; i++){
				myPathContext.subStatusTextVP[oData.results[i].status+oData.results[i].sub_status] = oData.results[i].sub_status_name;
			}
		},
		function(oError){
		});

		/* Function to call service to get column texts */
		var readRequestURL = "/ColumnTextSet?$filter=IvLangu eq 'E' and categoryid eq '1'";
		myPathContext.dashboard_ODataModel.read(readRequestURL, null, null, false,     
				function(oData,oResponse){
			for(var i=0; i<oData.results.length; i++){
				myPathContext.columnTextVP[oData.results[i].columnid] = oData.results[i].columnname;
			}
		},
		function(oError){
		});
	}
	// six hardcoded variable for testing
	performancereviewVPContext.employeeId = "60000705";
	performancereviewVPContext.reviewerId = "60018639";
	performancereviewVPContext.currentStatus = "K";
	performancereviewVPContext.title = "Performance Review 2015";
	performancereviewVPContext.validFrom = "2015-01-01T00:00:00";
	performancereviewVPContext.validTo = "2015-12-31T00:00:00";
	performancereviewVPContext.employee = performancereviewVPContext.oBundle.getText("Reviewer");			//			"Employee"    "Reviewer";
	
	// From MyPAth Context
	performancereviewVPContext.employeeId = myPathContext.appraiseeId;
	performancereviewVPContext.reviewerId = myPathContext.appraiserId;
	if (myPathContext.subStatus) {
		performancereviewVPContext.currentStatus = myPathContext.subStatus;
	} else {
		performancereviewVPContext.currentStatus = "O";
	}
	performancereviewVPContext.title = myPathContext.docTitle;
	performancereviewVPContext.validFrom = myPathContext.validFrom;
	performancereviewVPContext.validTo = myPathContext.validTo;
	performancereviewVPContext.employee = myPathContext.isReviewer ? performancereviewVPContext.oBundle.getText("Reviewer") : performancereviewVPContext.oBundle.getText("EMPLOYEE");			//			"Employee"    "Reviewer";
	performancereviewVPContext.appraisalId = myPathContext.documentId;
	performancereviewVPContext.yearEndReviewerOverallAssessmentComment = "";
	performancereviewVPContext.workLifeCheck = "0000";
	performancereviewVPContext.workLifeBalanceComment = "";

	myPathContext.isEdited = false;
	performancereviewVPContext.isIndObjAddedDeleted = false;
	performancereviewVPContext.currentTabKey = 1;
	performancereviewVPContext.isCalledFromPR = true;
	
	performancereviewVPContext.predefinedObjectivesModel = null;
	performancereviewVPContext.individualObjectivesModel = null;
	performancereviewVPContext.careerTitleDescriptionCommentsModel = null;
	performancereviewVPContext.leadershipProfileAssessmentModel = null;
	performancereviewVPContext.overallYearEndCommentsModel = null;
	performancereviewVPContext.calibratedRatingModel = null;
	performancereviewVPContext.ratingModel = null;
	var oView = sap.ui.view({
		//id : "performanceReviewVP",
		viewName : "com.capgemini.mypath.performancereviewVP.view.performancereviewVP",
		type: sap.ui.core.mvc.ViewType.JS,
		viewData : {
			component : this
		}
	});	
	oView.setModel(i18nModel, "i18n");
	performancereviewVPContext.doc_count = "";
	return oView;
};