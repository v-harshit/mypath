jQuery.sap.require("com.capgemini.mypath.util.Workflow");
jQuery.sap.require("com.capgemini.mypath.util.WorkflowType");
jQuery.sap.require("com.capgemini.mypath.util.MyPathText");
//new component declaration
jQuery.sap.declare("com.capgemini.mypath.appraisal.Component");

//define a new (simple) UIComponent
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("com.capgemini.mypath.appraisal.scripts.scripts");

//new Component initialization
sap.ui.core.UIComponent.extend("com.capgemini.mypath.appraisal.Component", {

	metadata : {
		properties : {
			text : "string"
		}
	}
});

com.capgemini.mypath.appraisal.Component.prototype.createContent = function() {
	openEmpDetails(myPathContext.appraiseeId);
		
	
//create object for the application context	
	if( !sap.ui.getCore().myPathContext){
		sap.ui.getCore().myPathContext = new Object();	
		myPathContext = sap.ui.getCore().myPathContext;
	
	}
	
if(!myPathContext.appraisal_template_loaded)
{
	//jQuery.sap.includeStyleSheet(appraisal_ns.url_app + "com/capgemini/mypath/appraisal/css/appraisal_style.css");
	getAppraisalTemplateService();
}
	myPathContext.appraisalContext = new Object();	
	appraisalContext = myPathContext.appraisalContext;
	
	appraisalContext.emp_appraisal_modeldata = emp_appraisal_modeldata;
	appraisalContext.manager_appraisal_modeldata = manager_appraisal_modeldata;
	
	
	//Declaring whether it is reviewer or not
	if(myPathContext.employeeId == myPathContext.appraiseeId)	
		myPathContext.isReviewer = false;	
	else
		myPathContext.isReviewer = true;

	//setting global isEdited flag as false
	myPathContext.isEdited = false;
	
	if(!myPathContext.isReviewer)
	{
		for(var i = 0 ; i < appraisalContext.emp_appraisal_modeldata.length ; i++)
		{
			if(appraisalContext.emp_appraisal_modeldata[i].substatus.toUpperCase()==myPathContext.subStatus)
			{
				appraisalContext.appraisal_data = {};
				appraisalContext.appraisal_data = appraisalContext.emp_appraisal_modeldata[i];
			}
		}
	}
	
	else
	{
		for(var i = 0 ; i < appraisalContext.manager_appraisal_modeldata.length ; i++)
		{
			if(appraisalContext.manager_appraisal_modeldata[i].substatus.toUpperCase()==myPathContext.subStatus)
			{
				appraisalContext.appraisal_data = {};
				appraisalContext.appraisal_data = appraisalContext.manager_appraisal_modeldata[i];
			}
		}
	}	
	
	/*var i18nModel = new sap.ui.model.resource.ResourceModel({ 
		bundleName:"com.capgemini.mypath.appraisal.i18n.translation",
		bundleLocale:"EN"
	}); 	
	var sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();
	appraisalContext.oBundle = jQuery.sap.resources({url : appraisal_ns.url_app+"com/capgemini/mypath/appraisal/i18n/translation.properties", locale: sCurrentLocale});
	*/
	 //Create odata model for appraisal service
	 serviceURL = appraisal_ns.url_root + "ZGW_MYPATH_APPRAISAL_SRV";
    var appraisal_oDataModel = new sap.ui.model.odata.ODataModel(serviceURL);
    appraisalContext.appraisal_oDataModel = appraisal_oDataModel;
    
    //Create odata model for feedback service
	 serviceURL = appraisal_ns.url_root + "ZGW_MYPATH_GENERAL_FEEDBACK_SRV";
    var feedback_oDataModel = new sap.ui.model.odata.ODataModel(serviceURL);
    appraisalContext.feedback_oDataModel = feedback_oDataModel;

    //declaring flags
    appraisalContext.isObjEditedFlag = false;
    
    appraisalContext.isManagerAssessmentEditedFlag = false;
    appraisalContext.isfeatureEditedFlag = false;
    appraisalContext.isObjSaved = false;
    
    
    appraisalContext.isFeaturesSaved = false;
    appraisalContext.isFeaturesCalledFromNext = false;
    appraisalContext.isSubmitObjDirectlyClicked = false;
    appraisalContext.isSignOffObjDirectlyClicked = false;
    appraisalContext.isManagerAssessmentSubmitDirectlyClicked = false;
    appraisalContext.isManagerAssessmentSaved = false;
    appraisalContext.isEmployeeAssessmentSubmitDirectlyClicked = false;    
    appraisalContext.isEmpAssessmentSaved = false;
    appraisalContext.isEmpAssessmentEditedFlag = false;
    appraisalContext.isAppraisalCreated = false;
    appraisalContext.isCalledExpandEmpComments = false;
    appraisalContext.isCalledExpandManagerComments = false;
    appraisalContext.isCalledKeyStrength = false;
    appraisalContext.isCalledAreasDev = false;
    appraisalContext.isCalledEmpSignoff = false;
    appraisalContext.isCalledAAObj = false;
    
    appraisalContext.appraisal_provider = "";
    appraisalContext.appraisal_rating = "";
    
    var  contextModel = new sap.ui.model.json.JSONModel();
    appraisalContext.contextModel = contextModel;
  //Declaring assignment objectives array 
    var assignment_objectives_data = new Array();	
    appraisalContext.assignment_objectives_data = assignment_objectives_data;

    	appraisalContext.assignment_objectives_data.push({
    		title: "",
    		description: "",
    	});
    	
    	appraisal_ns.getWorkFlow();
    	
    	
    //Call Employee details and Manager details based on status
    if(myPathContext.isReviewer && (myPathContext.subStatus =="Q" || myPathContext.subStatus =="Z" || myPathContext.subStatus =="R"))
    	appraisal_ns.getEmployeeDetails();
    
    if(myPathContext.isReviewer && ((myPathContext.subStatus =="T")||(myPathContext.subStatus =="X")||(myPathContext.subStatus =="S")))
    {
    	 appraisal_ns.getEmployeeDetails();
    	 appraisal_ns.getManagerDetails();
    }
    
    if(!myPathContext.isReviewer && ((myPathContext.subStatus =="P" || myPathContext.subStatus =="Q" || myPathContext.subStatus =="Z" || myPathContext.subStatus =="R" || myPathContext.subStatus =="S")))
    	appraisal_ns.getEmployeeDetails();
    
    if(!myPathContext.isReviewer && ((myPathContext.subStatus =="T"|| myPathContext.subStatus =="X")))
    {
    	 appraisal_ns.getEmployeeDetails();
    	 appraisal_ns.getManagerDetails();
    }
    
    if(myPathContext.subStatus =="X")    
    	myPathContext.uploadContentVisible = false;
    else
    	myPathContext.uploadContentVisible = true;
    
	var oView="";	

	// create root view
	oView = sap.ui.view({
		id : "mypath_appraisal",
		viewName : "com.capgemini.mypath.appraisal.view.create_assignment_appr",
		type : "JS",
		viewData : {
			component : this
		}
	});
	appraisalContext.isCalledFromAppraisal = true;
	appraisalContext.doc_count = getDocCount(myPathContext.documentId,false);
	
	//myPathContext.flag_assignappraisal = "CREATE";
	// set i18n model 
	/*var i18nModel = new sap.ui.model.resource.ResourceModel({ 
		bundleName:"com.capgemini.mypath.appraisal.i18n.translation",
		bundleLocale:"EN"
	}); 	
	appraisalContext.oBundle = jQuery.sap.resources({url : appraisal_ns.url_app+"com/capgemini/mypath/appraisal/i18n/translation.properties", locale: "EN"});*/
	oView.setModel(myPathContext.i18nModel, "i18n");
	//oView.setModel(appraisalContext.appraisal_model,"appr_model");
	return oView;
};



appraisal_ns.getEmployeeDetails = function()
{
	var odatamodel = appraisalContext.appraisal_oDataModel;
	var readRequestURL = "EmpDetailsSet?$filter=Appraisalid eq '"+myPathContext.documentId+"'";
	showBusy();
	odatamodel.read(readRequestURL, null, null, false, function (oData,oResponse) {
		hideBusy();
		oData = oData.results[0];
		
		/**************Assignment Objectives Data******************/
		appraisalContext.assignment_objectives_data = [];	
		
		for(var i=0; i<7; i++){
			if(oData["Desc"+(i+1)] != "" && oData["Desc"+(i+1)] != myPathContext.appraisal_template["0003"].name){
				appraisalContext.assignment_objectives_data.push({
					title: oData["Desc"+(i+1)],
					description: oData["Note"+(i+1)],
				});
			}
			else if((oData["Desc"+(i+1)] == "" || oData["Desc"+(i+1)] == myPathContext.appraisal_template["0003"].name) && oData["Note"+(i+1)]!=""){
				appraisalContext.assignment_objectives_data.push({
					title: "",
					description: oData["Note"+(i+1)],
				});
			}
		}		
		
	    if(appraisalContext.assignment_objectives_data.length < 1)
		appraisalContext.assignment_objectives_data.push({
    		title: "",
    		description: "",
    	});
		//appraisalContext.assignment_objectives_data = assignment_objectives_data;
			
		
		appraisalContext.Clientname = oData.Clientname;				
		appraisalContext.Projectcode = oData.Projectcode;				
		appraisalContext.Otherfeatures = oData.Otherfeatures;				
		appraisalContext.Revenuemanaged = oData.Revenuemanaged;				
		appraisalContext.Teamsize =  oData.Teamsize;
		
		
		
			
			/**************Overall assessment Data******************/			
			appraisalContext.appraisal_overall_comment_emp = oData.Empobjcomments;
			appraisalContext.Rating = oData.Rating;
			
			appraisalContext.emp_signoff_comments = oData.Employeesignoffcomments;
	},
	function(oError)
	{
		hideBusy();
		console.log(oError);
	});
};
appraisal_ns.getManagerDetails = function()
{
	var odatamodel = appraisalContext.appraisal_oDataModel;
	var readRequestURL = "GetManagerDetailSet?$filter=Appraisalid eq '"+myPathContext.documentId+"'";
	showBusy();
	odatamodel.read(readRequestURL, null, null, false, function (oData,oResponse) {
		hideBusy();
		oData = oData.results[0];
		
		appraisalContext.AreasForDevelopment = oData.AreasForDevelopment;
		appraisalContext.AssignmentRating = oData.AssignmentRating;
		appraisalContext.KeyStrengthsDemo = oData.KeyStrengthsDemo;
		appraisalContext.ManagerComments = oData.ManagerComments;
	},
	function(oError)
	{
		hideBusy();
		console.log(oError);
	});
};

appraisal_ns.getWorkFlow = function()
{
	
	var appr_workFlow1 = new com.capgemini.mypath.util.Workflow({
		header : myPathContext.i18nModel.getProperty("OBJECTIVE_SETTING"),
		imageURIs : ["icon_emp_objsetting.png", "icon_signoff3.png", "icon_signoff2.png"],
		tooltips : [myPathContext.subStatusText["2P"], myPathContext.subStatusText["2Q"], myPathContext.subStatusText["2Z"]],
		activeImageIndex : 1,
		type : "Completed",
		top : 0,
		nodeCount : 3
	});	

var appr_workFlow2 = new com.capgemini.mypath.util.Workflow({
	header : myPathContext.i18nModel.getProperty("OVERALL_ASSESSMENT"),
	imageURIs : ["icon_emp_objsetting.png", "icon_signoff3.png", "icon_signoff2.png"],
	tooltips : [myPathContext.subStatusText["3R"], myPathContext.subStatusText["3S"], myPathContext.subStatusText["3T"]],
	activeImageIndex : 1,
	type : "Completed",
	top : 0,
	nodeCount : 3
});

//return [appr_workFlow1,appr_workFlow2];

switch (myPathContext.subStatus) {
case "P":	
	appr_workFlow1.setType("Active");
	appr_workFlow1.setActiveImageIndex(0);
	appr_workFlow2.setType("Future");	
	break;
	
case "Q":	
	appr_workFlow1.setType("Active");
	appr_workFlow2.setType("Future");	
	appr_workFlow1.setActiveImageIndex(1);	
	break;
	
case "Z":	
	appr_workFlow1.setType("Active");
	appr_workFlow1.setActiveImageIndex(2);
	appr_workFlow2.setType("Future");	
	break;
	
case "R":
	appr_workFlow1.setType("Completed");
	appr_workFlow2.setType("Active");
	appr_workFlow2.setActiveImageIndex(0);
	break;
	
case "S":
	appr_workFlow1.setType("Completed");
	appr_workFlow2.setType("Active");
	appr_workFlow2.setActiveImageIndex(1);	
	break;
	
case "T":
	appr_workFlow1.setType("Completed");
	appr_workFlow2.setType("Active");
	appr_workFlow2.setActiveImageIndex(2);	
	break;
	
case "X":
	appr_workFlow1.setType("Completed");
	appr_workFlow2.setType("Completed");
	break;

default:
	appr_workFlow1.setType("Future");
	appr_workFlow2.setType("Future");
	break;
}

appraisalContext.appr_workFlow1 = appr_workFlow1;
appraisalContext.appr_workFlow2 = appr_workFlow2;
};