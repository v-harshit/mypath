jQuery.sap.require("com.capgemini.mypath.util.Workflow");
jQuery.sap.require("com.capgemini.mypath.util.WorkflowType");
jQuery.sap.require("com.capgemini.mypath.util.MyPathText");

//new component declaration
jQuery.sap.declare("com.capgemini.mypath.pip.Component");

//define a new (simple) UIComponent
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("com.capgemini.mypath.pip.scripts.scripts");

//new component declaration
//jQuery.sap.declare("mypath_feedback.Component");

//new Component initialization
sap.ui.core.UIComponent.extend("com.capgemini.mypath.pip.Component", {

	metadata : {
		properties : {
			text : "string"
		}
	}
});

com.capgemini.mypath.pip.Component.prototype.createContent = function() {
	openEmpDetails(myPathContext.appraiseeId);
	//jQuery.sap.includeStyleSheet(pip_ns.url_app + "com/capgemini/mypath/css/appraisal_style.css");
	//jQuery.sap.includeStyleSheet(pip_ns.url_app + "com/capgemini/mypath/css/common_style.css");	
	jQuery.sap.includeStyleSheet(pip_ns.url_app + "com/capgemini/mypath/pip/css/pip_style.css");	
	 
	    
	//create object for the application context	
	if( !sap.ui.getCore().myPathContext){
		sap.ui.getCore().myPathContext= new Object();	
		myPathContext= sap.ui.getCore().myPathContext;	
	}	
	
	myPathContext.pipContext = new Object();	
	pipContext = myPathContext.pipContext;
	
	pipContext.reviewer_pip_modeldata = reviewer_pip_modeldata;
	pipContext.hr_pip_modeldata = hr_pip_modeldata;
	pipContext.emp_pip_modeldata = emp_pip_modeldata;
	
	//Declaring whether it is reviewer or not
	/*if(myPathContext.employeeId == myPathContext.appraiseeId)	
		myPathContext.isReviewer = false;	
	else
		myPathContext.isReviewer = true;
		myPathContext.isHR = true;
		*/
	
	/*myPathContext.subStatus ="";
	myPathContext.docStatus = "1";*/
	//myPathContext.isReviewer = false;
	//myPathContext.isHR = true;
	
	//setting global isEdited flag as false
	myPathContext.isEdited = false;

	
	if(myPathContext.isReviewer)
	{
		for(var i = 0 ; i < pipContext.reviewer_pip_modeldata.length ; i++)
		{
			if(pipContext.reviewer_pip_modeldata[i].substatus.toUpperCase()==myPathContext.subStatus
			&& pipContext.reviewer_pip_modeldata[i].status.toUpperCase()==myPathContext.docStatus)
			{
				pipContext.pip_data = {};
				pipContext.pip_data = pipContext.reviewer_pip_modeldata[i];
			}
		}
	}
	
	else if(myPathContext.isPartAppraiser)
	{
		for(var i = 0 ; i < pipContext.hr_pip_modeldata.length ; i++)
		{
			if(pipContext.hr_pip_modeldata[i].substatus.toUpperCase()==myPathContext.subStatus
			&& pipContext.hr_pip_modeldata[i].status.toUpperCase()==myPathContext.docStatus)
			{
				pipContext.pip_data = {};
				pipContext.pip_data = pipContext.hr_pip_modeldata[i];
			}
		}
	}
	
	else
	{
		for(var i = 0 ; i < pipContext.emp_pip_modeldata.length ; i++)
		{
			if(pipContext.emp_pip_modeldata[i].substatus.toUpperCase()==myPathContext.subStatus
			   && pipContext.emp_pip_modeldata[i].status.toUpperCase()==myPathContext.docStatus)
			{
				pipContext.pip_data = {};
				pipContext.pip_data = pipContext.emp_pip_modeldata[i];
			}
		}
	}
	
	/*if(!myPathContext.pip_template_loaded)
		getPipTemplateService();*/
	
	var  contextModel = new sap.ui.model.json.JSONModel();
	pipContext.contextModel = contextModel;
	
	//Create odata model for PIP service
	serviceURL = pip_ns.url_root + "ZGW_MYPATH_PIP_SRV";
    var pip_oDataModel = new sap.ui.model.odata.ODataModel(serviceURL);
    pipContext.pip_oDataModel = pip_oDataModel; 
    
    //Create odata model for feedback service
	 serviceURL = pip_ns.url_root + "ZGW_MYPATH_GENERAL_FEEDBACK_SRV";
   var feedback_oDataModel = new sap.ui.model.odata.ODataModel(serviceURL);
   pipContext.feedback_oDataModel = feedback_oDataModel;
	
  //Create odata model for Performance  service
	serviceURL = pip_ns.url_root + "ZGW_MYPATH_PERFORMANCE_SRV";
   var perform_oDataModel = new sap.ui.model.odata.ODataModel(serviceURL);
   pipContext.perform_oDataModel = perform_oDataModel; 
   
	//call method to initialze data for PIP process
	pip_ns.initialzePipData();
	
	pip_ns.getWorkFlow();
   
    //calling method to get details for current PIP document
	if(myPathContext.subStatus !="" && myPathContext.docStatus!="1")
    pip_ns.getPIPDetails();
    
    
	var oView="";	

	oView = sap.ui.view({
		id : "mypath_pip",
		viewName : "com.capgemini.mypath.pip.view.perform_imp_plan",
		type : "JS",
		viewData : {
			component : this
		}
	});    
    
	pipContext.isCalledFromPIP = true;
	
	if(myPathContext.subStatus !="" && myPathContext.docStatus!="1")
	pipContext.doc_count = getDocCount(myPathContext.documentId,false);
	
	else
		pipContext.doc_count = 0;
	
	
	
	
	
	// set i18n model 
	/*var i18nModel = new sap.ui.model.resource.ResourceModel({ 
		bundleName:"com.capgemini.mypath.pip.i18n.translation",
		bundleLocale:"EN"
	});
	
	var sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();	
	pipContext.oBundle = jQuery.sap.resources({url : pip_ns.url_app+"com/capgemini/mypath/pip/i18n/translation.properties", locale: sCurrentLocale});
	oView.setModel(i18nModel, "i18n");*/
	oView.setModel(myPathContext.i18nModel, "i18n");

	return oView;
};

pip_ns.getPIPDetails = function() //9E9289E288031ED59786A852BF1D1AB2
{
	//myPathContext.documentId = "" ; // "9E9289E288031EE59C94957D94FF483E" //9E9289E288031ED59C9B25D170AB145B
		//9E9289E288031ED59BCCAC3E4F489AAB" ; //"9E9289E288031EE59BC8CD25A66A883E";// 9E9289E288031ED59B8126B7F8145C09
	var odatamodel = pipContext.pip_oDataModel;//9E9289E288031ED5968DA5B593E19AB2
	var readRequestURL = "GetPIPDocContentSet?$filter=IvAppraisalId eq'"+myPathContext.documentId+"'&$format=json";
	
	odatamodel.read(readRequestURL, null, null, false, function (oData,oResponse) {
		 var obj = JSON.parse(oResponse.body);
		 oData = obj.d.results;		
		if(oData.length > 0)
		{
		  pipContext.pip_objectives_data = [];
		  pipContext.pip_action_plan_data = [];
		  pipContext.pip_progress_data = [];
		  pipContext.pip_evaluation_data = [];
		  pip_evaluation_data_dev = [];
		  pip_evaluation_data_achieved = [];
		  for(var i=0; i<oData.length; i++)
		  {
			if(oData[i].ElementType.toUpperCase()=="PIP OBJECTIVES" && oData[i].ElementTitle.toUpperCase()=="PIP OBJECTIVES")
			{
				pipContext.pip_objectives_data.push({
					Performance: oData[i].Performance,
					Feedback: oData[i].Feedback,
					Required: oData[i].Required,
					Flag:oData[i].Flag,
					RowIid:oData[i].RowIid
				   	});
				pip_evaluation_data_dev.push({
					evaluation_dev_needs : oData[i].Performance,
				});
			}
			if(oData[i].ElementType.toUpperCase()=="ACTION PLAN" && oData[i].ElementTitle.toUpperCase()=="ACTION PLAN")
			{
				pipContext.pip_action_plan_data.push({
					action:oData[i].Reviewfinal,
					Flag:oData[i].Flag,
					RowIid:oData[i].RowIid
				});
			}
			if(oData[i].ElementType.toUpperCase()=="ACTION PLAN" && oData[i].ElementTitle.toUpperCase()=="EMPLOYEE COMMENTS")
			{				
					pipContext.action_emp_comments = oData[i].Empfinal;				
			}
			if(oData[i].ElementType.toUpperCase()=="PROGRESS" /*&& oData[i].ElementTitle.toUpperCase()=="PROGRESS UPDATES"*/)
			{				
				pipContext.pip_progress_data.push({
				progress_from:oData[i].Startdate!=""? pip_ns.convertPIPDate(oData[i].Startdate):new Date(),
				progress_to:oData[i].Enddate!="" ? pip_ns.convertPIPDate(oData[i].Enddate):new Date(),
				reviewer_comments: oData[i].Reviewercomment,
				employee_comments: oData[i].Employeecomment,
				Flag:oData[i].Flag,
				RowIid:oData[i].RowIid
			   	});			
			}
			if(oData[i].ElementType.toUpperCase()=="EVALUATION" /*&& oData[i].ElementTitle.toUpperCase()=="EVALUATION"*/)
			{				
				/*pipContext.pip_evaluation_data.push({
					evaluation_dev_needs:oData[i].Developement,
					achieved:oData[i].Achieved,
				   	});	*/	
				pip_evaluation_data_achieved.push({
					achieved:oData[i].Achieved,
					Flag:oData[i].Flag,
					RowIid:oData[i].RowIid
				});
			}
			if(oData[i].ElementType.toUpperCase()=="FINAL COMMENTS" && oData[i].ElementTitle.toUpperCase()=="HR COMMENTS")
			{				
				pipContext.final_hr_comments = oData[i].Hrcomments;
			}
			if(oData[i].ElementType.toUpperCase()=="FINAL COMMENTS" && oData[i].ElementTitle.toUpperCase()=="REVIEWER INDICATOR")
			{				
				pipContext.reviewer_indicator = oData[i].Reviewerindc;	
			}
			
		  }
		  
			  for(var j=0; j< pip_evaluation_data_dev.length ; j++)
			  {
				  pipContext.pip_evaluation_data.push({
					evaluation_dev_needs:pip_evaluation_data_dev[j].evaluation_dev_needs,
					achieved:pip_evaluation_data_achieved[j]==undefined?"":pip_evaluation_data_achieved[j].achieved,
					Flag:pip_evaluation_data_achieved[j]==undefined?"":pip_evaluation_data_achieved[j].Flag,
					RowIid:pip_evaluation_data_achieved[j]==undefined?"":pip_evaluation_data_achieved[j].RowIid				
				   	});	
			  }

		}
	
	},
	function(oError)
	{
		
		console.log(oError);
	});
};
pip_ns.initialzePipData = function()
{
	//Declaring PIP objectives array 
	var pip_objectives_data = new Array();	
	pipContext.pip_objectives_data = pip_objectives_data;
	pipContext.pip_objectives_data.push({
	Performance: "",
	Feedback: "",
	Required:""
   	});
	
	//Declaring PIP evaluation
	var pip_evaluation_data = new Array();	
	pipContext.pip_evaluation_data = pip_evaluation_data;
	pipContext.pip_evaluation_data.push({
	evaluation_dev_needs: "",
	achieved:"",
   	});
	
	//Declaring PIP action plan array 
	var pip_action_plan_data = new Array();
	pipContext.pip_action_plan_data = pip_action_plan_data;	
	pipContext.pip_action_plan_data.push({
	action: "",	
   	});	
	
	//Declaring PIP progress array 
	var pip_progress_data = new Array();
	pipContext.pip_progress_data = pip_progress_data;	
	pipContext.pip_progress_data.push({
	progress_from:new Date(),
	progress_to:new Date(),
	reviewer_comments: "",
	employee_comments:""
   	});
	
	pipContext.action_emp_comments ="";
	pipContext.final_hr_comments = "";
	pipContext.reviewer_indicator="";
	
	// Service call for reviewer indicator search help
	var odatamodel = pipContext.perform_oDataModel;
	var readRequestURL = "RatingSearchHelpSet?$filter=ValueType eq '122'";
	var reviewer_indicator_array=[];
	odatamodel.read(readRequestURL, null, null, false, function (oData,oResponse) {
		oData  = oData.results;
		if(oData.length > 0)
		{
			reviewer_indicator_array[0] = new sap.ui.core.ListItem({text:"",key:""});
			for(var i = 0 ; i < oData.length ; i++)
			{
				reviewer_indicator_array[i+1] = new sap.ui.core.ListItem({text:oData[i].ValueText.toUpperCase(),key:oData[i].ValueIid});
			}
			pipContext.reviewer_indicator_array = reviewer_indicator_array;
		}
	},
	function(oError)
	{
		
	});
	//Reviewer indicator dropdown list items
	/*var reviewer_indicator_array = [
                          new sap.ui.core.ListItem({text:"",key:""}),
	                      new sap.ui.core.ListItem({text:"X",key:"X"}),
	                      new sap.ui.core.ListItem({text:"Y",key:"Y"}),
	                      new sap.ui.core.ListItem({text:"Z",key:"Z"}),
	                      ];
	pipContext.reviewer_indicator_array = reviewer_indicator_array;*/
	
	// Service call for achieved search help
	var odatamodel = pipContext.perform_oDataModel;
	var readRequestURL = "RatingSearchHelpSet?$filter=ValueType eq '108'";
	var achieved_array = [];
	odatamodel.read(readRequestURL, null, null, false, function (oData,oResponse) {
		oData  = oData.results;
		if(oData.length > 0)
		{
			achieved_array[0] = new sap.ui.core.ListItem({text:"",key:""});
			for(var i = 0 ; i < oData.length ; i++)
			{
				achieved_array[i+1] = new sap.ui.core.ListItem({text:oData[i].ValueText.toUpperCase(),key:oData[i].ValueIid});
			}
			pipContext.achieved_array = achieved_array;
		}
	},
	function(oError)
	{
		
	});

	//achieved dropdown list items
	/*var achieved_array = [new sap.ui.core.ListItem({text:"",key:""}),
	                      new sap.ui.core.ListItem({text:"NO",key:"NO"}),
	                      new sap.ui.core.ListItem({text:"YES",key:"YES"}),
	                      ];
	pipContext.achieved_array = achieved_array; */
	
	//flags for PIP 
	pipContext.isSearchEmp = false;
	pipContext.isSearchHr = false;
	pipContext.isPIPCreated = false;	
	pipContext.isPIPSaved = false;
	pipContext.isCalledFromChangeStatus = false;
	pipContext.isCalledFromCreate = false;
	pipContext.isMandatoryFieldMissing = false;
	pipContext.isProgressDateIncorrect = false;
	pipContext.isProgressDateExceeds = false;
	
	pipContext.isActionTabClicked = false;
	pipContext.isProgressTabClicked = false;
	pipContext.isEvaluationTabClicked = false;
	pipContext.isFinalTabClicked = false;
	
	pipContext.isCalledFromObjMatrix = false;
	pipContext.isCalledFromObjPer = false;
	pipContext.isCalledFromObjFb = false;
	pipContext.isCalledFromObjReq = false;
	
	pipContext.isCalledFromActionMatrix = false;
	
	pipContext.isCalledFromProgressMatrix = false;
	pipContext.isCalledFromProgressRev = false;
	pipContext.isCalledFromProgressEmp = false;
	
	pipContext.isCalledFromEmpActionPlan = false;
	pipContext.isCalledFromSignoff = false;
	
	pipContext.isMandatoryCheckReq = true;
	
	pipContext.pipSaveCount = 0;
};

pip_ns.convertPIPDate = function(date_to_be_conv)
{
	var date = date_to_be_conv.split(".");
	
	if(date[1]==undefined)
		return(new Date(date_to_be_conv));
	else	
		return (new Date((parseInt(date[2],"10")),(parseInt(date[1],"10")-1),(parseInt(date[0],"10"))));
	
};

pip_ns.getWorkFlow = function()
{
	
	var pip_workFlow1 = new com.capgemini.mypath.util.Workflow({
		header : myPathContext.i18nModel.getProperty("OBJECTIVE_SETTING"),
		imageURIs : ["icon_emp_objsetting.png", "icon_emp_objsetting.png", "icon_signoff1.png", "icon_signoff2.png"],
		tooltips : [myPathContext.subStatusText["2F"], myPathContext.subStatusText["2G"], myPathContext.subStatusText["2H"],myPathContext.subStatusText["2I"]],
		activeImageIndex : 1,
		type : "Completed",
		top : 0,
		nodeCount : 4
	});	

var pip_workFlow2 = new com.capgemini.mypath.util.Workflow({
	header : myPathContext.i18nModel.getProperty("OVERALL_ASSESSMENT"),
	imageURIs : ["icon_reviewer.png", "icon_Employee.png", "icon_yearend_signoff.png"],
	tooltips : [myPathContext.subStatusText["4Z"], myPathContext.subStatusText["4Y"], myPathContext.subStatusText["44"]],
	activeImageIndex : 1,
	type : "Completed",
	top : 0,
	nodeCount : 3
});

//return [pip_workFlow1,pip_workFlow2];

if(myPathContext.docStatus.toUpperCase()=="1" && myPathContext.subStatus.toUpperCase()=="")
{
	pip_workFlow1.setType("Future");
	pip_workFlow2.setType("Future");
}

else if(myPathContext.docStatus.toUpperCase()=="2" && myPathContext.subStatus.toUpperCase()=="F")
{
	pip_workFlow1.setType("Active");
	pip_workFlow1.setActiveImageIndex(0);
	pip_workFlow2.setType("Future");
}

else if(myPathContext.docStatus.toUpperCase()=="2" && myPathContext.subStatus.toUpperCase()=="G")
{
	pip_workFlow1.setType("Active");
	pip_workFlow1.setActiveImageIndex(1);
	pip_workFlow2.setType("Future");
}
else if(myPathContext.docStatus.toUpperCase()=="2" && myPathContext.subStatus.toUpperCase()=="H")
{
	pip_workFlow1.setType("Active");
	pip_workFlow1.setActiveImageIndex(2);
	pip_workFlow2.setType("Future");
}
else if(myPathContext.docStatus.toUpperCase()=="2" && myPathContext.subStatus.toUpperCase()=="I")
{
	pip_workFlow1.setType("Active");
	pip_workFlow1.setActiveImageIndex(3);
	pip_workFlow2.setType("Future");
}
else if(myPathContext.docStatus.toUpperCase()=="2" && myPathContext.subStatus.toUpperCase()=="J")
{
	pip_workFlow1.setType("Completed");
	pip_workFlow2.setType("Active");
	pip_workFlow2.setActiveImageIndex(0);
}
else if(myPathContext.docStatus.toUpperCase()=="4" && myPathContext.subStatus.toUpperCase()=="Z")
{
	pip_workFlow1.setType("Completed");
	pip_workFlow2.setType("Active");
	pip_workFlow2.setActiveImageIndex(0);
}
else if(myPathContext.docStatus.toUpperCase()=="4" && myPathContext.subStatus.toUpperCase()=="Y")
{
	pip_workFlow1.setType("Completed");
	pip_workFlow2.setType("Active");
	pip_workFlow2.setActiveImageIndex(1);
}
else if(myPathContext.docStatus.toUpperCase()=="4" && myPathContext.subStatus.toUpperCase()=="4")
{
	pip_workFlow1.setType("Completed");
	pip_workFlow2.setType("Active");
	pip_workFlow2.setActiveImageIndex(2);
}
else if(myPathContext.docStatus.toUpperCase()=="5" && myPathContext.subStatus.toUpperCase()=="F")
{
	pip_workFlow1.setType("Completed");
	pip_workFlow2.setType("Completed");
}



pipContext.pip_workFlow1 = pip_workFlow1;
pipContext.pip_workFlow2 = pip_workFlow2;
};