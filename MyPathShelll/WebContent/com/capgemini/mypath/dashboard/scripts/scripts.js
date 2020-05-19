/* Function to generate left container elements for dashboard */
function createLeftContainerData(dashboard_left_container){
	
	var action_btn = new sap.m.Button({
        text: myPathContext.i18nModel.getProperty("ACTION").toUpperCase(),
        press: function(){
//HK
        		var vLayout1 = createPopoverContent();
            	var itemTemplate = createDocumentItemTemplate("action");
        		var action_data_model = new sap.ui.model.json.JSONModel();
        		action_data_model.setData({modelData: myPathContext.actionDocuments});
        		myPathContext.action_popover_list.setModel(action_data_model);
        		myPathContext.action_popover_list.bindAggregation("items", "/modelData", itemTemplate);
            	
            	var actionPopover = new sap.m.Popover({
            		placement: "Bottom",
            		showHeader: false,
            		modal: false,
            		enableScrolling: false,
            		bounce: true,
            		contentHeight: "400px",
            		contentWidth:"300px",
            		offsetX: 50,
            		content:[vLayout1]
            	}).addStyleClass("actionsPopOver");
            	actionPopover.openBy(this,true);
          	
        	
        }
    }).addStyleClass("dashboard_top_button").addStyleClass("dashboard_action_btn");
	
	myPathContext.dashboard_action_btn = action_btn;
	
	action_btn.addEventDelegate({
		onAfterRendering: function(){
			myPathContext.ActionsCount = myPathContext.actionDocuments.length;
			if(myPathContext.ActionsCount > 0){
				myPathContext.dashboard_action_btn.setVisible(true);
				addActionFlag(myPathContext.dashboard_action_btn,myPathContext.ActionsCount);
			}
			else{
				myPathContext.dashboard_action_btn.setVisible(false);
			}
		}
	});	
	
	var create_feedback_btn = new sap.m.Button({
        type : "Emphasized",
        icon : "sap-icon://add",
        text: myPathContext.i18nModel.getProperty("CREATE_GEN_FEEDBACK").toUpperCase(),
        press: function(){
        	 myPathContext.flag_generalfeedback = "CREATE";	
        	 myPathContext.documentId = "";
        	 myPathContext.setAppContent(myPathContext.i18nModel.getProperty("GEN_FEEDBACK"),
        			 "com.capgemini.mypath.feedback", true);
        }
    }).addStyleClass("mypath_add_button_style").addStyleClass("dashboard_top_button");//.addStyleClass("dashboard_create_feedback_btn");
	
	
	if ( myPathContext.language == "ZH" || "EN" == myPathContext.language)
		{
		create_feedback_btn.addStyleClass("dashboard_create_feedback_btn_ZH");
		}
	else
		{
		create_feedback_btn.addStyleClass("dashboard_create_feedback_btn");
		}
	
	var create_aa_btn = new sap.m.Button({
        type : "Emphasized",
        icon : "sap-icon://add",
        text: myPathContext.i18nModel.getProperty("CREATE_ASN_APP").toUpperCase(),
        press: function(){
        	 myPathContext.documentId = "";
        	myPathContext.subStatus = "";
       		 myPathContext.setAppContent(myPathContext.i18nModel.getProperty("ASN_APP"),
        				 "com.capgemini.mypath.appraisal", true);
        }
    }).addStyleClass("mypath_add_button_style").addStyleClass("dashboard_top_button");//.addStyleClass("dashboard_create_aa_btn");
	
	if ( myPathContext.language == "ZH" || "EN" == myPathContext.language)
	{
		create_aa_btn.addStyleClass("dashboard_create_aa_btn_ZH");
	}
	else
	{
		create_aa_btn.addStyleClass("dashboard_create_aa_btn");
	}
	
	
	var view = sap.ui.view({
		viewName:"com.capgemini.mypath.dashboard.view.carousel_view", 
		type:sap.ui.core.mvc.ViewType.JS
	});
	view.addStyleClass("carousel_container");
	
	dashboard_left_container.addContent(action_btn);
	dashboard_left_container.addContent(create_feedback_btn);
	dashboard_left_container.addContent(create_aa_btn);
	dashboard_left_container.addContent(view);
	
}

/* Function to generate left container elements for dashboard */
function createRightContainerData(dashboard_right_container){
	
	var mydocs_label = new sap.m.Text({
		text: myPathContext.i18nModel.getProperty("MY_DOCUMENTS").toUpperCase()
	}).addStyleClass("dashboard_mydocs_label");
	
	var feedback_btn = new sap.m.Button({
        text: myPathContext.i18nModel.getProperty("GEN_FEEDBACK").toUpperCase(),
        press: function(){
        	myPathContext.asAnEmpSelectedFilters = [myPathContext.i18nModel.getProperty("GEN_FEEDBACK").toUpperCase()];
        	myPathContext.setAppContent(myPathContext.i18nModel.getProperty("AS_AN_EMP"),
          			 "com.capgemini.mypath.employee_facet", true);
        }
    }).addStyleClass("dashboard_mydocs_button");
	
	var aa_btn = new sap.m.Button({
        text: myPathContext.i18nModel.getProperty("ASN_APP").toUpperCase(),
        press: function(){
        	myPathContext.asAnEmpSelectedFilters = [myPathContext.i18nModel.getProperty("ASN_APP").toUpperCase()];
        	myPathContext.setAppContent(myPathContext.i18nModel.getProperty("AS_AN_EMP"),
       			 "com.capgemini.mypath.employee_facet", true);
        }
    }).addStyleClass("dashboard_mydocs_button");
	
	myPathContext.mydocs_aa_btn = aa_btn;
	
	aa_btn.addEventDelegate({
		onAfterRendering: function(){
			if(myPathContext.AssignmentAppraisalCount > 0){
				addActionFlag(myPathContext.mydocs_aa_btn,myPathContext.AssignmentAppraisalCount);
				$("#"+id+" .action_info").show();
			}
			else{
				var id = myPathContext.mydocs_aa_btn.getId();
				$("#"+id+" .action_info").hide();
			}
		}
	});	
	
	var vLayout = new sap.ui.commons.layout.VerticalLayout({
		content:[mydocs_label,feedback_btn,aa_btn]
	}).addStyleClass("dashboard_mydocs_section");
	
	dashboard_right_container.addContent(vLayout);
	
}

/* Function to create action button popover data */
function createPopoverContent(){

	var item_label = new sap.m.Text({
		text: myPathContext.i18nModel.getProperty("ACTION")+" "+myPathContext.ActionsCount
	}).addStyleClass("carousel_item_label");
	
	var list1 = new sap.m.List({
		
	}).addStyleClass("carousel_item_content_list");
	myPathContext.action_popover_list = list1;
	
	var see_all_btn = new sap.m.Button({
        type : "Emphasized",
        text: myPathContext.i18nModel.getProperty("SEE_ALL").toUpperCase(),
        press: function(){
        	myPathContext.seeAllFlag = true;
        	myPathContext.setAppContent("{i18n>ACTION}",
   	   			 "com.capgemini.mypath.actions", true);
        }
    }).addStyleClass("mypath_add_button_style").addStyleClass("carousel_see_all_btn");
	
	var vLayout1 = new sap.ui.commons.layout.VerticalLayout({
		content:[item_label,list1,see_all_btn]
	}).addStyleClass("carousel_item_content");
	
	return vLayout1;
}

/* Function to create document item template */
function createSeeAllDocumentItemTemplate(flag){
	
	var actionIcon = new sap.ui.commons.Image({
		src : "./com/capgemini/mypath/images/icon_actionflag.png",
		visible: "{ActionRequired}"
	}).addStyleClass("mypath_doc_item_actionflag");
	
	var docIcon = new sap.ui.commons.Image({
		src : "{doc_icon_path}",
	}).addStyleClass("mypath_doc_item_icon");
	
	var appraiseeLayout_action = new sap.ui.commons.layout.HorizontalLayout({
		visible: "{AsMgrAction}",
		content:[
		         new sap.m.Text({
		        	 text : "{i18n>APPRAISEE}",
		         }).addStyleClass("mypath_doc_item_label"),
		         
		         new sap.m.Text({
		        	 text : "{AppraiseeName}",
	         }).addStyleClass("mypath_doc_item_empname"),
		        ]
	}).addStyleClass("mypath_doc_emp_info_section");
	
	var appraiseeLayout = new sap.ui.commons.layout.HorizontalLayout({
		content:[
		         new sap.m.Text({
		        	 text : "{i18n>APPRAISEE}",
		         }).addStyleClass("mypath_doc_item_label"),
		         
		         new sap.m.Text({
		        	 text : "{AppraiseeName}",
	         }).addStyleClass("mypath_doc_item_empname"),
		        ]
	}).addStyleClass("mypath_doc_emp_info_section");
	
	var appraiserLayout_action = new sap.ui.commons.layout.HorizontalLayout({
		visible: "{AsEmpAction}",
		content:[
		         new sap.m.Text({
		        	 text : "{i18n>APPRAISER}",
		         }).addStyleClass("mypath_doc_item_label"),
		         
		         new sap.m.Text({
		        	 text : "{AppraiserName}",
		         }).addStyleClass("mypath_doc_item_empname"),
		        ]
	}).addStyleClass("mypath_doc_emp_info_section");
	
	var appraiserLayout = new sap.ui.commons.layout.HorizontalLayout({
		content:[
		         new sap.m.Text({
		        	 text : "{i18n>APPRAISER}",
		         }).addStyleClass("mypath_doc_item_label"),
		         
		         new sap.m.Text({
		        	 text : "{AppraiserName}",
		         }).addStyleClass("mypath_doc_item_empname"),
		        ]
	}).addStyleClass("mypath_doc_emp_info_section");
	
	var vLayout1 = new sap.ui.commons.layout.VerticalLayout({
		content:[
		         new sap.m.Text({
		        	 text: "{AppraisalName}"
		         }).addStyleClass("mypath_doc_item_title"),
		         
		         new sap.m.Text({
		        	 text: "{ApStatusSubName}"
		         }).addStyleClass("mypath_doc_item_statustext"),
		         
		       ]
	}).addStyleClass("mypath_doc_info_section");
	
	if(flag == "action"){
		vLayout1.addContent(appraiseeLayout_action);
		vLayout1.addContent(appraiserLayout_action);
	}
	else if(flag == "employee"){
		vLayout1.addContent(appraiserLayout);
	}
	else if(flag == "manager"){
		vLayout1.addContent(appraiseeLayout);
	}
	
	
	var vLayout2 = new sap.ui.commons.layout.VerticalLayout({
		content:[
		         new sap.m.Text({
		        	 text: "{validfrom}"
		         }).addStyleClass("mypath_doc_date_text"),
		         
		         new sap.m.Text({
		        	 text: "To"
		         }).addStyleClass("mypath_doc_date_text"),
		         
		         new sap.m.Text({
		     		text : "{validto}",
		     	}).addStyleClass("mypath_doc_date_text"),
		         
		       ]
	}).addStyleClass("mypath_doc_date_section");
	
	var docItemArrow = new sap.ui.commons.Image({
		src : "./com/capgemini/mypath/images/icon_forward_arrow.png",
	}).addStyleClass("mypath_doc_item_arrow");
	
	var action_item = new sap.m.CustomListItem({
		type: sap.m.ListType.Active,
		content:[actionIcon,docIcon,vLayout1,vLayout2,docItemArrow],
		press: function(){
			myPathContext.navigateToDocument(this);
		},
		customData : [ {
			Type : "sap.ui.core.CustomData",
			key : "documentid",
			value : "{AppraisalId}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "documenttitle",
			value : "{AppraisalName}"
		},{
			Type : "sap.ui.core.CustomData",
			key : "substatus",
			value : "{ApStatusSub}"
		},{
			Type : "sap.ui.core.CustomData",
			key : "appraiseeid",
			value : "{AppraiseeId}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "appraiseename",
			value : "{AppraiseeName}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "appraiserid",
			value : "{AppraiserId}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "appraisername",
			value : "{AppraiserName}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "validfrom",
			value : "{ApStartDate}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "validto",
			value : "{ApEndDate}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "validfromISO",
			value : "{ApStartDateISO}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "validtoISO",
			value : "{ApEndDateISO}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "documenttype",
			value : "{AppraisalTypeText}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "documenttype_displaytext",
			value : "{AppraisalTypeLn}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "partappraisername",
			value : "{PartAppraiserName}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "partappraiserid",
			value : "{PartAppraiserId}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "status",
			value : "{ApStatus}"
		}]
	}).addStyleClass("mypath_doc_item");
	
	return action_item;
	
}

/* function to display action flag and action number */
function addActionFlag(button,actionnumber){
	var id = button.getId();
	var content = "<div class='action_info'>";
	content += "<span class='action_number'>"+actionnumber+"</span>";
	content += "<img class='action_img' src='.\/com\/capgemini\/mypath\/images\/icon_actionflag.png'/>";
	content += "</div>";
	$("#"+id+" div").append(content);
}

/* Function to call service to get action counts */
function callActionCountService(){
	 var readRequestURL = "/ActionCountSet?$filter=Employeeid eq '"+myPathContext.employeeId+"'";
	    
	 myPathContext.dashboard_ODataModel.read(readRequestURL, null, null, false,     
	    function(oData,oResponse){
	           //Set the employee data in application context
	            	 
	           if(oData.results.length > 0){
	            		 
	        	   var employeeActionData = oData.results[0];
	               myPathContext.AssignmentAppraisalCount = parseInt(employeeActionData.AssignmentAppraisalCount);
	               myPathContext.GeneralFeedbackCount = parseInt(employeeActionData.GeneralFeedbackCount);
	               myPathContext.ActionsCount = parseInt(employeeActionData.ActionsCount);
	               
	              /* if ( undefined !=  myPathContext.ActionsCountACT)
	               myPathContext.ActionsCountACT.setText
	               (parseInt(employeeActionData.ActionsCount) + parseInt(employeeActionData.GeneralFeedbackCount) + parseInt(employeeActionData.AssignmentAppraisalCount));
	               */
	               //if not valid count value then set value to 0
	              /* if(isNaN(myPathContext.AssignmentAppraisalCount) || myPathContext.AssignmentAppraisalCount == "" ||
	            		   myPathContext.AssignmentAppraisalCount == null){
	            	   myPathContext.AssignmentAppraisalCount = 0;
	               }
	               
	               if(isNaN(myPathContext.ActionsCount) || myPathContext.ActionsCount == "" ||
	            		   myPathContext.ActionsCount == null){
	            	   myPathContext.ActionsCount = 0;
	               }*/
	           }
	           else{
	        	   //TO DO - code to display error message
	           }
	    }, 
	    function(oError){
	     	 //TO DO - code to display error message
	    });
}

/* Function to call service for employee documents */
function callEmployeeDocumentService(){
	
	//showBusy();
	//setTimeout(function(){
	var readRequestURL = "/DocumentsSet?$filter=Employeeid eq '"+myPathContext.employeeId+"'";
	myPathContext.dashboard_ODataModel.read(readRequestURL, null, null, false,     
    function(oData,oResponse){
		
		var emp_data = new Array();
		var perf_data = new Array();
		myPathContext.actionDocuments = new Array();
		var myAACount = 0 ;
		var myGFCount = 0 ;
		
		//ActionRequired
		for(var i=0; i<oData.results.length; i++){
			
			//date format
			//oData.results[i].ApStartDateISO = new Date(oData.results[i].ApStartDate+"Z");
			//oData.results[i].ApEndDateISO = new Date(oData.results[i].ApEndDate+"Z");
			//oData.results[i].ApStartDateISO.setTime( oData.results[i].ApStartDateISO.getTime() + oData.results[i].ApStartDateISO.getTimezoneOffset()*60*1000 );
			//oData.results[i].ApEndDateISO.setTime( oData.results[i].ApEndDateISO.getTime() + oData.results[i].ApEndDateISO.getTimezoneOffset()*60*1000 );
			//"2015-12-31T00:00:00"
			//oData.results[i].ApStartDateISO = new Date(oData.results[i].ApStartDate.substring(0,4),oData.results[i].ApStartDate.substring(5,7)-1,oData.results[i].ApStartDate.substring(8,10),0,0,0);
			//oData.results[i].ApEndDateISO = new Date(oData.results[i].ApEndDate.substring(0,4),oData.results[i].ApEndDate.substring(5,7)-1,oData.results[i].ApEndDate.substring(8,10),0,0,0);
			
			if ( null == oData.results[i].ApStartDate)
				{
				
				oData.results[i].ApStartDate =  "0000-00-00T00:00:00"
				}
			
			if ( null == oData.results[i].ApEndDate)
			{
			
			oData.results[i].ApEndDate =  "0000-00-00T00:00:00"
			}
			
			oData.results[i].ApStartDateISO = new Date(oData.results[i].ApStartDate.split("T")[0] + "T12:00:00");
			oData.results[i].ApEndDateISO = new Date(oData.results[i].ApEndDate.split("T")[0] + "T12:00:00");
			
			myPathContext.hidden_date_for_format.setDateValue(oData.results[i].ApStartDateISO);
			oData.results[i].validfrom = myPathContext.hidden_date_for_format.getValue();
			myPathContext.hidden_date_for_format.setDateValue(oData.results[i].ApEndDateISO);
			oData.results[i].validto = myPathContext.hidden_date_for_format.getValue();
			
			if(oData.results[i].AppraisalTypeText.toUpperCase() == myPathContext.documentText.GENERAL_FEEDBACK){
				emp_data.push(oData.results[i]);
				
				//oData.results[i].doc_icon_path = "./com/capgemini/mypath/images/icon_feedback.png";
				oData.results[i].doc_icon_path = myPathContext.docJSON[oData.results[i].ApStatus + oData.results[i].ApStatusSub];
				if ( oData.results[i].ActionRequired == "X")
				{
					myGFCount ++ ;
				}
			}
				
			else if(oData.results[i].AppraisalTypeText.toUpperCase() == myPathContext.documentText.ASSIGNMENT_APPRAISAL){
				emp_data.push(oData.results[i]);
				//oData.results[i].doc_icon_path = "./com/capgemini/mypath/images/icon_Employee.png";
				oData.results[i].doc_icon_path = myPathContext.docJSON[oData.results[i].ApStatus + oData.results[i].ApStatusSub];
				if ( oData.results[i].ActionRequired == "X")
					{
					myAACount ++ ;
					}
			}
			else if(oData.results[i].AppraisalTypeText.toUpperCase() == myPathContext.documentText.PERFORMANCE_REVIEW
					|| oData.results[i].AppraisalTypeText.toUpperCase() == myPathContext.documentText.VP_PERFORMANCE_REVIEW){
				//oData.results[i].doc_icon_path = "./com/capgemini/mypath/images/icon_reviewer.png";
				if ("5" == oData.results[i].ApStatus )
				{
				oData.results[i].ApStatus = "4";
				oData.results[i].ApStatusSub = "O";
				oData.results[i].ApStatusSubName = oData.results[i].ApStatusName ;
				
				}
				oData.results[i].doc_icon_path = myPathContext.docJSON[oData.results[i].ApStatus + oData.results[i].ApStatusSub];
				perf_data.push(oData.results[i]);
			}
			if(oData.results[i].ActionRequired == "X"){
				oData.results[i].ActionRequired = true;
				oData.results[i].AsMgrAction = false;
				oData.results[i].AsEmpAction = true;
				oData.results[i].Action = myPathContext.i18nModel.getProperty("PR_AR");				
				
				myPathContext.actionDocuments.push(oData.results[i]);
			}
			else{
				oData.results[i].ActionRequired = false;
				oData.results[i].Action = myPathContext.i18nModel.getProperty("PR_NAR");
			}
		
		}
		
		
		myPathContext.AssignmentAppraisalCount  = myAACount ;
		myPathContext.GeneralFeedbackCount = myGFCount ;
		//set employee documents data in context to be used for display all documents page
		myPathContext.employeeDocuments = oData.results;
		
		var emp_itemTemplate = createDocumentItemTemplate("employee");
		var emp_data_model = new sap.ui.model.json.JSONModel();
		emp_data_model.setData({modelData: emp_data});
		myPathContext.carousel_emp_list.setModel(emp_data_model);
		myPathContext.carousel_emp_list.bindAggregation("items", "/modelData", emp_itemTemplate);
		
		var perf_itemTemplate = createDocumentItemTemplate("performance");
		var perf_data_model = new sap.ui.model.json.JSONModel();
		perf_data_model.setData({modelData: perf_data});
		myPathContext.carousel_perf_list.setModel(perf_data_model);
		myPathContext.carousel_perf_list.bindAggregation("items", "/modelData", perf_itemTemplate);
		
		hideBusy();
	},
	function(oError){
     	 //TO DO - code to display error message
		hideBusy();
	});
	//}, 500);
	
}

/* Function to call service for assignment manager feedback provider documents */
function callAssignmentManager_FeedbackProviderService(){
	//showBusy();
	//setTimeout(function(){
	var readRequestURL = "/ManagerSet?$filter=ManagerId eq '"+myPathContext.employeeId+"'";
	myPathContext.dashboard_ODataModel.read(readRequestURL, null, null, false,     
    function(oData,oResponse){
		
		for(var i=0; i<oData.results.length; i++){
			
			if(oData.results[i].AppraisalTypeText.toUpperCase() == myPathContext.documentText.PERFORMANCE_REVIEW
					|| oData.results[i].AppraisalTypeText.toUpperCase() == myPathContext.documentText.VP_PERFORMANCE_REVIEW){
				//oData.results[i].doc_icon_path = "./com/capgemini/mypath/images/icon_reviewer.png";
				if ("5" == oData.results[i].ApStatus )
				{
				oData.results[i].ApStatus = "4";
				oData.results[i].ApStatusSub = "O";
				oData.results[i].ApStatusSubName = oData.results[i].ApStatusName ;
				
				}
			}
			//oData.results[i].ApStartDateISO = new Date(oData.results[i].ApStartDate+"Z");
			//oData.results[i].ApEndDateISO = new Date(oData.results[i].ApEndDate+"Z");
			//oData.results[i].ApStartDateISO.setTime( oData.results[i].ApStartDateISO.getTime() + oData.results[i].ApStartDateISO.getTimezoneOffset()*60*1000 );
			//oData.results[i].ApEndDateISO.setTime( oData.results[i].ApEndDateISO.getTime() + oData.results[i].ApEndDateISO.getTimezoneOffset()*60*1000 );
			//oData.results[i].ApStartDateISO = new Date(oData.results[i].ApStartDate.substring(0,4),oData.results[i].ApStartDate.substring(5,7)-1,oData.results[i].ApStartDate.substring(8,10),0,0,0);
			//oData.results[i].ApEndDateISO = new Date(oData.results[i].ApEndDate.substring(0,4),oData.results[i].ApEndDate.substring(5,7)-1,oData.results[i].ApEndDate.substring(8,10),0,0,0);
			
			oData.results[i].ApStartDateISO = new Date(oData.results[i].ApStartDate.split("T")[0] + "T12:00:00");
			oData.results[i].ApEndDateISO = new Date(oData.results[i].ApEndDate.split("T")[0] + "T12:00:00");
			
			myPathContext.hidden_date_for_format.setDateValue(oData.results[i].ApStartDateISO);
			oData.results[i].validfrom = myPathContext.hidden_date_for_format.getValue();
			myPathContext.hidden_date_for_format.setDateValue(oData.results[i].ApEndDateISO);
			oData.results[i].validto = myPathContext.hidden_date_for_format.getValue();
			if (myPathContext.docJSON[oData.results[i].ApStatus + oData.results[i].ApStatusSub + "1"]) {
				oData.results[i].doc_icon_path = myPathContext.docJSON[oData.results[i].ApStatus + oData.results[i].ApStatusSub + "1"];
			} else {
				oData.results[i].doc_icon_path = myPathContext.docJSON[oData.results[i].ApStatus + oData.results[i].ApStatusSub];
			}
			
			if(oData.results[i].ActionRequired == "X"){
				oData.results[i].ActionRequired = true;
				oData.results[i].AsMgrAction = true;
				oData.results[i].AsEmpAction = false;
				oData.results[i].Action = myPathContext.i18nModel.getProperty("PR_AR");
				myPathContext.actionDocuments.push(oData.results[i]);
			}
			else{
				oData.results[i].ActionRequired = false;
				oData.results[i].Action = myPathContext.i18nModel.getProperty("PR_NAR");
			}
			
			
		}
		
		//set employee documents data in context to be used for display all documents page
		myPathContext.assignmentManagerDocuments = oData.results;
		
		var itemTemplate = createDocumentItemTemplate("reviewer");
		var am_data_model = new sap.ui.model.json.JSONModel();
		am_data_model.setData({modelData: oData.results});
		myPathContext.carousel_am_list.setModel(am_data_model);
		myPathContext.carousel_am_list.bindAggregation("items", "/modelData", itemTemplate);
		
		hideBusy();
	},
	function(oError){
    	 //TO DO - code to display error message
		hideBusy();
	});
	//}, 500);
	
}

/* Function to call performance reviewer service */
function callPerformanceReviewerService(){
	
	//call the service only if user is reviewer
	if(myPathContext.isUserReviewer){
		//showBusy();
		//setTimeout(function(){
		var readRequestURL = "/ReportsSet?$expand=ReportsToReportdocument&$filter=Manager eq '"+myPathContext.employeeId+"'";
		myPathContext.dashboard_ODataModel.read(
			readRequestURL, null, null, false, function(oData, oResponse) {

				var results = [];
				if(oData.results.length > 0){
					results = oData.results[0].ReportsToReportdocument.results;
				}
						
				if (results.length > 0) {
					//performanceReviewerContext.documentList = results;
					
									
					for(var i=0; i<results.length; i++){
						
						if(results[i].AppraisalTypeText.toUpperCase() == myPathContext.documentText.PERFORMANCE_REVIEW
								|| results[i].AppraisalTypeText.toUpperCase() == myPathContext.documentText.VP_PERFORMANCE_REVIEW){
							//oData.results[i].doc_icon_path = "./com/capgemini/mypath/images/icon_reviewer.png";
							if ("5" == results[i].ApStatus )
							{
							results[i].ApStatus = "4";
							results[i].ApStatusSub = "O";
							results[i].ApStatusSubName = results[i].ApStatusName ;
							
							}
						}
						
						//results[i].ApStartDateISO = new Date(results[i].ApStartDate+"Z");
						//results[i].ApEndDateISO = new Date(results[i].ApEndDate+"Z");
						 
						//results[i].ApStartDateISO.setTime( results[i].ApStartDateISO.getTime() + results[i].ApStartDateISO.getTimezoneOffset()*60*1000 );
						//results[i].ApEndDateISO.setTime( results[i].ApEndDateISO.getTime() + results[i].ApEndDateISO.getTimezoneOffset()*60*1000 );
						
						results[i].ApStartDateISO = new Date(results[i].ApStartDate.split("T")[0] + "T12:00:00");
						results[i].ApEndDateISO = new Date(results[i].ApEndDate.split("T")[0] + "T12:00:00");
						
						
						 myPathContext.hidden_date_for_format.setDateValue(results[i].ApStartDateISO);
						 results[i].validfrom = myPathContext.hidden_date_for_format.getValue();
						 myPathContext.hidden_date_for_format.setDateValue(results[i].ApEndDateISO);
						 results[i].validto = myPathContext.hidden_date_for_format.getValue();
						 results[i].doc_icon_path =  myPathContext.docJSON[results[i].ApStatus + results[i].ApStatusSub];
						 
						 if(results[i].ActionRequired == "X" && results[i].Level == "0"){
							 results[i].ActionRequired = true;
							 results[i].Action = myPathContext.i18nModel.getProperty("PR_AR");
							 results[i].AsMgrAction = true;
							 results[i].AsEmpAction = false;
 							 myPathContext.actionDocuments.push(results[i]);
						 }
						 
					}
					

				} else {
					// TO DO - code to display error message
					
				}
				hideBusy();
			}, function(oError) {
				// TO DO - code to display error message
				hideBusy();
			});
		//}, 500);
	}
	
}

/* Function to call service to get button texts */
function callButtonTextService(){
	var readRequestURL = "/ButtonTextSet";
	myPathContext.dashboard_ODataModel.read(readRequestURL, null, null, true,     
    function(oData,oResponse){
		
		for(var i=0; i<oData.results.length; i++){
			myPathContext.buttonText[oData.results[i].Id] = oData.results[i].Text;
		}
	},
	function(oError){
    	 //TO DO - code to display error message
	});
	
}

/* Function to call service to get sub status text */
function callSubStatusTextService(){
	var readRequestURL = "/StatusTextSet";
	myPathContext.dashboard_ODataModel.read(readRequestURL, null, null, true,     
    function(oData,oResponse){
		
		for(var i=0; i<oData.results.length; i++){
			myPathContext.subStatusText[oData.results[i].status+oData.results[i].sub_status] = oData.results[i].sub_status_name;
		}
	},
	function(oError){
    	 //TO DO - code to display error message
	});
	
}


/* Function to call service to get column texts */
function callColumnTextService(){
	var readRequestURL = "/ColumnTextSet?$filter=categoryid eq '1'";
	myPathContext.dashboard_ODataModel.read(readRequestURL, null, null, true,     
    function(oData,oResponse){
		
		for(var i=0; i<oData.results.length; i++){
			myPathContext.columnText[oData.results[i].columnid] = oData.results[i].columnname;
		}
	},
	function(oError){
    	 //TO DO - code to display error message
	});
	
}