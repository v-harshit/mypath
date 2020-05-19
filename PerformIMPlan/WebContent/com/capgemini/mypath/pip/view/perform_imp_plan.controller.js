sap.ui.controller("com.capgemini.mypath.pip.view.perform_imp_plan", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.capgemini.mypath.pip.view.perform_imp_plan
*/
	onInit: function() {
		pip_ns.refreshPIP();
		 this.getView().setModel(pipContext.contextModel,"pip");
		 pipContext.currentView = this.getView();	
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf com.capgemini.mypath.pip.view.perform_imp_plan
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf com.capgemini.mypath.pip.view.perform_imp_plan
*/
	onAfterRendering: function() {
		
		
		    if(!pipContext.isPIPCreated)
		    {
			 contextModelData= {};
			 contextModelData.validfrom = pipContext.pip_hidden_from_date.getValue();
			 contextModelData.validto = pipContext.pip_hidden_to_date.getValue();
			 contextModelData.docTitle = myPathContext.docTitle;
			 contextModelData.appraiseeName = myPathContext.appraiseeName;
			 contextModelData.appraiserName = myPathContext.appraiserName;
			 contextModelData.hrName = myPathContext.partAppraiserName;
			 
			 pipContext.contextModel.setData(contextModelData);
		    } 
			 
			 pipContext.pip_emp_input.attachBrowserEvent("keypress",function(e){
					var keycode = e.keyCode || e.which;
					if(keycode ==13){
						pipContext.isSearchEmp = true;
						pipContext.isSearchHr = false;
						pip_ns.pip_search();
						
					}
				});
			 
			 pipContext.pip_hr_input.attachBrowserEvent("keypress",function(e){
					var keycode = e.keyCode || e.which;
					if(keycode ==13){
						pipContext.isSearchHr = true;
						pipContext.isSearchEmp = false;
						pip_ns.pip_search();
						
					}
				});
		
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf com.capgemini.mypath.pip.view.perform_imp_plan
*/
//	onExit: function() {
//
//	}
	//function to perform create appraisal
	createPip:function()
	{
		showBusy();
		
		/*if(!(pipContext.pip_from_date.getDateValue() <= pipContext.pip_to_date.getDateValue()))				 
			   sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("VALID_DATE_MSG"));
		
		else if(pipContext.pip_emp == myPathContext.employeeId &&  pipContext.pip_emp_input.getValue().trim()!="")
		{
			sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("EMPLOYEE_SELECT_MSG"));
			pipContext.pip_emp = "";
		}
		
		 else if(pipContext.pip_hr == myPathContext.employeeId && pipContext.pip_hr_input.getValue().trim()!="")
		{
			sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("PIP_HR_CHECK_MSG"));
			pipContext.pip_hr ="";
		}*/
		
	   /* else if(pipContext.pip_emp_input.getValue().toString().trim()=="" || (pipContext.pip_emp=="" && pipContext.pip_emp==undefined))
		{
			sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("PIP_EMP_CHECK_MSG"));
		}
			
		else if(pipContext.pip_hr_input.getValue().toString().trim()=="" || (pipContext.pip_hr=="" && pipContext.pip_hr==undefined))
		{
			sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("PIP_HR_CHECK_MSG"));
		}*/
		
		//else
		//{
	 if(pipContext.title_input.getValue().toString().trim()!="" && pipContext.pip_from_date.getValue().toString().trim()!="" && pipContext.pip_to_date.getValue().toString().trim()!=""
		&& pipContext.pip_emp_input.getValue().toString().trim()!="" && (pipContext.pip_emp!="" && pipContext.pip_emp!=undefined) && pipContext.pip_hr_input.getValue().toString().trim()!=""
		&& (pipContext.pip_hr!="" && pipContext.pip_hr!=undefined))
	  {
		 
		 if(pipContext.pip_from_date.getDateValue() <= pipContext.pip_to_date.getDateValue())
		 {
			 if(pipContext.pip_emp != myPathContext.employeeId)
			 {
				 if(pipContext.pip_hr != myPathContext.employeeId)
				 {
						var odatamodel =  pipContext.pip_oDataModel;
						odatamodel.setHeaders({
							"X-Requested-With" : "XMLHttpRequest",
							"Content-Type" : "application/atom+xml",
							"DataServiceVersion" : "2.0"
						});
						
						
						var create_pip_request = "CreatePIPSet";
						
						var create_pip_data = {
								Title : pipContext.title_input.getValue(),
								Hrid : pipContext.pip_hr,//pipContext.pip_hr 60000268
								Employeeid : pipContext.pip_emp,//pipContext.pip_emp 60019322
								ValidFrom : pip_ns.convertDate(new Date(pipContext.pip_from_date.getDateValue())),//'2015-01-01T06:15:07'
								ValidTo : pip_ns.convertDate(new Date(pipContext.pip_to_date.getDateValue())),
								ReviewId : myPathContext.employeeId,//60018525
							};
						
						
						//Call service to create appraisal
						odatamodel.create(create_pip_request, create_pip_data, null, 
						
						//success function for create appraisal service call		
						function(oData,oResponse) {
					
							if(oResponse.headers.status.toUpperCase() == "S")
							{
								myPathContext.isEdited = false; 
								hideBusy();
								myPathContext.documentId = oData.AppraisalId;
								
								myPathContext.docStatus = "2";
								myPathContext.subStatus = "F";
								
								pipContext.create_pip_tab.setVisible(false);
								pipContext.obj_pip_tab.setVisible(true);
								pipContext.obj_pip_tab.setEnabled(true);
								pipContext.action_pip_tab.setVisible(true);							
								pipContext.obj_setting_save_btn.setVisible(true);
								pipContext.obj_setting_send_to_hr_btn.setVisible(true);
								pipContext.obj_save_btn.setVisible(true);
								pipContext.attachmentIcon.setVisible(true);
								pipContext.vlayout_attachment.setVisible(true);
								pipContext.pdfIcon.setVisible(true);
								
								pipContext.pip_emp = "";
								pipContext.pip_hr = "";
								
								var createPIPModelData = {};
			  					createPIPModelData.docTitle = pipContext.title_input.getValue();
			  					createPIPModelData.validfrom = pipContext.pip_from_date.getValue();
			  					createPIPModelData.validto = pipContext.pip_to_date.getValue();
			  					createPIPModelData.appraiseeName = pipContext.pip_emp_input.getValue();
			  					createPIPModelData.appraiserName = myPathContext.employeeName;
			  					createPIPModelData.hrName = pipContext.pip_hr_input.getValue();
			  					pipContext.isPIPCreated = true;
			  					pipContext.isCalledFromCreate = true;
			  					//myPathContext.isEdited = false; 
			  					
			  					pipContext.contextModel.setData(createPIPModelData);
								
			  					pip_ns.getWorkFlow();
				  				pipContext.currentView.getContent()[pipContext.currentView.getContent().length - 2].destroy();
			  					pipContext.currentView.getContent()[pipContext.currentView.getContent().length - 1].destroy();
			  					pipContext.currentView.addContent(pipContext.pip_workFlow1);
			  					pipContext.currentView.addContent(pipContext.pip_workFlow2);
							}
							else
							{
								hideBusy();
								var error_msg = decodeURI(oResponse.headers.message);
								sap.ui.commons.MessageBox.alert(error_msg);
							}
						},
						
						//error function for create appraisal service call
						function (oError) {
							hideBusy();
							console.log(oError);
								
						});	
				    }
					else
					{
						sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("HR_CONTACT_MSG"));
						pipContext.pip_hr ="";
					}
		       }
				else
				{
					sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("EMPLOYEE_SELECT_MSG"));
					pipContext.pip_emp = "";
				}
		  }		
		 else
		 {
			 sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("VALID_DATE_MSG"));
		 }
	  }
			
	else
	{
		sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("Please_fill_all"));				
	}
			
			hideBusy();
		//}
	},
	perform_cancel : function()
	{
		//myPathContext.isEdited = false;
		myPathContext.back();
	},
	add_obj: function(){
		pipContext.pip_objectives_data=[];
		var matrix = pipContext.pip_obj_action_matrix;	
		var pip_obj_model = matrix.getModel();
		var modeldata = pip_obj_model.getData().modelData;
		
		//Maximum 18 objectives can be added
	//	if(modeldata.length < 7){
			
			modeldata.push({
				Performance: "",
				Feedback: "",
				Required:"",
				Flag:"0002",
				RowIid:""
			});
			
			pip_obj_model.setData({modelData:modeldata});
			matrix.setModel(pip_obj_model);
		
			matrix.bindAggregation("rows", "/modelData", pipContext.pip_obj_row_template);
		//}
			if(modeldata.length > 6)
			{
				pipContext.add_pip_obj_btn_2.setVisible(false);
				pipContext.add_pip_obj_btn.setVisible(false);
			} 
			jQuery('html, body').animate({scrollTop:jQuery(document).height()*5}, 1000);
		
	},
	add_action: function(){
		pipContext.pip_action_plan_data=[];
		var matrix = pipContext.pip_action_plan_matrix;	
		var pip_action_model = matrix.getModel();
		var modeldata = pip_action_model.getData().modelData;
		
		//Maximum 18 objectives can be added
		//if(modeldata.length < 7){
			
			modeldata.push({
				action: "",	
				Flag:"0004",
				RowIid:""
			});
			
			pip_action_model.setData({modelData:modeldata});
			matrix.setModel(pip_action_model);
		
			matrix.bindAggregation("rows", "/modelData", pipContext.oRowTemplateAction);
		//}
			if(modeldata.length > 6)
			{
				pipContext.add_pip_action_btn.setVisible(false);
				pipContext.add_pip_action_btn_2.setVisible(false);
			} 
		
		jQuery('html, body').animate({scrollTop:jQuery(document).height()*2}, 1000);
		
	},
	add_progress: function(){
		pipContext.pip_progress_data=[];
		var matrix = pipContext.pip_progress_matrix;	
		var pip_progress_model = matrix.getModel();
		var modeldata = pip_progress_model.getData().modelData;
		
		//Maximum 18 objectives can be added
	//	if(modeldata.length < 7){
			
			modeldata.push({

				progress_from:new Date(),
				progress_to:new Date(),
				reviewer_comments: "",
				employee_comments:"",
				Flag:"0007",
				RowIid:""
			});
			
			pip_progress_model.setData({modelData:modeldata});
			matrix.setModel(pip_progress_model);
		
			matrix.bindAggregation("rows", "/modelData", pipContext.oRowTemplateProgress);
		//}
			if(modeldata.length > 6)
			{
				 pipContext.add_pip_progress_btn.setVisible(false);
				 pipContext.add_pip_progress_btn_2.setVisible(false);
			} 
		
		jQuery('html, body').animate({scrollTop:jQuery(document).height()*3}, 1000);
		
	},
});

//function to remove pip objectives
pip_ns.remove_obj = function(evt){
	var object = evt.getSource().getParent().getParent();
	var matrix =pipContext.pip_obj_action_matrix;
	var index = matrix.indexOfAggregation("rows",object);	
		
	var pip_obj_model = matrix.getModel();
	var modeldata = pip_obj_model.getData().modelData;
	
	pipContext.add_pip_obj_btn_2.setVisible(true);
	pipContext.add_pip_obj_btn.setVisible(true);
	
		//pip_ns.delete_Pressed(matrix,index,pip_obj_model,modeldata);

	
	//Do not remove the item if there is only 1
	if(modeldata.length > 1){
		
		modeldata.splice(index,1);
		
		pip_obj_model.setData({modelData:modeldata});
		matrix.setModel(pip_obj_model);
	
		matrix.removeAggregation("rows",object);
		//pipContext.isObjEditedFlag = true;
	}
	else{
		//sap.ui.commons.MessageBox.alert("At least 1 objective should be present.");
	}
	
};

//function to remove pip action plans
pip_ns.remove_action = function(evt){
	var object = evt.getSource().getParent().getParent();
	var matrix =pipContext.pip_action_plan_matrix;
	var index = matrix.indexOfAggregation("rows",object);
		
	var pip_action_model = matrix.getModel();
	var modeldata = pip_action_model.getData().modelData;
	
	pipContext.add_pip_action_btn.setVisible(true);
	pipContext.add_pip_action_btn_2.setVisible(true);
	
	//Do not remove the item if there is only 1
	if(modeldata.length > 1){
		
		modeldata.splice(index,1);
		
		pip_action_model.setData({modelData:modeldata});
		matrix.setModel(pip_action_model);
	
		matrix.removeAggregation("rows",object);
		//pipContext.isObjEditedFlag = true;
	}
	else{
		//sap.ui.commons.MessageBox.alert("At least 1 action plan should be present.");
	}
	
};
pip_ns.remove_progress= function(evt){
	var object = evt.getSource().getParent().getParent();
	var matrix =pipContext.pip_progress_matrix;
	var index = matrix.indexOfAggregation("rows",object);
		
	var pip_progress_model = matrix.getModel();
	var modeldata = pip_progress_model.getData().modelData;
	
	 pipContext.add_pip_progress_btn.setVisible(true);
	 pipContext.add_pip_progress_btn_2.setVisible(true);
	
	//Do not remove the item if there is only 1
	if(modeldata.length > 1){
		
		modeldata.splice(index,1);
		
		pip_progress_model.setData({modelData:modeldata});
		matrix.setModel(pip_progress_model);
	
		matrix.removeAggregation("rows",object);
		//pipContext.isObjEditedFlag = true;
	}
	else{
		//sap.ui.commons.MessageBox.alert("At least 1 progress plan should be present.");
	}
	
};
pip_ns.convertDate = function(date)
{
	var month= date.getMonth()+1;
	month = month < 10 ? '0' + month : '' + month;
	day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	return date.getFullYear()+"-"+month+"-"+day+"T00:00:00";
};

pip_ns.convertDateProgress = function(date)
{
	var month= date.getMonth()+1;
	month = month < 10 ? '0' + month : '' + month;
	return date.getDate()+"."+month+"."+date.getFullYear() ;
};
pip_ns.pip_search = function()
{
	if((pipContext.pip_emp_input.getValue().toString().trim()!="" && pipContext.pip_emp_input.getValue().toString().trim()!="*") ||
		(pipContext.pip_hr_input.getValue().toString().trim()!="" && pipContext.pip_hr_input.getValue().toString().trim()!="*"))
	{
		//showBusy();
		//Creating Overlay when clicked on search icon		
		var pip_search_overlay = null;
		if (sap.ui.getCore().byId("pip_search_overlay_id")) {
			pip_search_overlay = sap.ui.getCore().byId("pip_search_overlay_id");
		} else {
			 pip_search_overlay = new sap.ui.ux3.OverlayDialog("pip_search_overlay_id",{
					modal : true,
					autoClose : true,
					closeButtonVisible : true,
					close:function(event)
					{
							var control = event.getSource();
							control.destroy();
				
		            }
				}).addStyleClass("search_feedback_style");
		}
		
		// code to close overlay when clicked outside content area
		pip_search_overlay.addEventDelegate({
			onAfterRendering : function() {
				$("#pip_search_overlay_id").click(function(e) {
					if ($(e.target).hasClass("sapUiUx3ODOverlay")) {
						pip_search_overlay.close();
						pip_search_overlay.destroyContent();
						pip_search_overlay.destroy();
					}
				});
			}
		});
		
		var pip_search_table = null;
		if(sap.ui.getCore().byId("pip_search_table_id")){
			pip_search_table = sap.ui.getCore().byId("pip_search_table_id");
		}
		else
		{	
			pip_search_table = new sap.ui.table.Table("pip_search_table_id",{
				width: "90%",
				selectionMode : sap.ui.table.SelectionMode.Single,
				selectionBehavior : sap.ui.table.SelectionBehavior.RowOnly,
				navigationMode : sap.ui.table.NavigationMode.Paginator,
				visibleRowCount: 8,		
				title : "EMPLOYEE DETAILS",
				allowColumnReordering : false
				
			}).addStyleClass("feedback_table_style");
		}
		pip_search_table.addColumn(new sap.ui.table.Column({
			label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("APPRAISER_NAME"),
			textAlign : sap.ui.core.TextAlign.Center}),
			template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "Ename"),
			resizable: false,
			width: "25%",
			hAlign: "Center"
		}));
		
		pip_search_table.addColumn(new sap.ui.table.Column({
			label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("APPRAISER_ID"),
			textAlign : sap.ui.core.TextAlign.Center}),
			template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "Pernr"),
			resizable: false,
			width: "15%",
			hAlign: "Center"
		}));
		
		pip_search_table.addColumn(new sap.ui.table.Column({
			label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("GLOBAL_ID"),
				textAlign : sap.ui.core.TextAlign.Center}),
			template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "Icnum"),
			resizable: false,
			width: "15%",
			hAlign: "Center"
		}));
		
		pip_search_table.addColumn(new sap.ui.table.Column({
			label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("WORK_LOCATION"),
				textAlign : sap.ui.core.TextAlign.Center}),
			template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "Wldesc"),
			resizable: false,
			width: "30%",
			hAlign: "Center"
		}));
		
		pip_search_table.addColumn(new sap.ui.table.Column({
			label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("SBU"),
				textAlign : sap.ui.core.TextAlign.Center}),
			template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "ZsbuT"),
			resizable: false,
			width: "30%",
			hAlign: "Center"
		}));
	
		pip_search_overlay.addContent(pip_search_table);		
		//pip_search_overlay.open();
		
	
		// Calling search help service to get data of employees
		var odatamodel =  pipContext.feedback_oDataModel;	
		var name =  pipContext.isSearchEmp == true ? pipContext.pip_emp_input.getValue():pipContext.pip_hr_input.getValue();	
		showBusy();
		var readRequestURL ="GetEmployeeDetSet?$filter=Fullname eq '"+name+"'&$format=json";		
		odatamodel.read(readRequestURL, null, null, true,
		function(oData, oResponse) {
			hideBusy();
		      var obj = JSON.parse(oResponse.body);		     
		      search_help_results = obj.d.results;//oData.results;
			 //search_help_results = oData.results;
			if(search_help_results.length > 1)
			{
				
				var pip_search_table_model = new sap.ui.model.json.JSONModel();
				
				pip_search_table_model.setData({
					modelData : search_help_results
				});
				pip_search_table.setModel(pip_search_table_model);
				pip_search_table.bindRows("/modelData");
				
	
				setTimeout(function(){$("#pip_search_table_id tr").on("dblclick",function(){              
				                        
				                        var index = ($(this).index()+((sap.ui.getCore().byId("pip_search_table_id")._oPaginator.getCurrentPage() - 1)*8));
				                        if(index < search_help_results.length)
				                        {  
				                        	if(pipContext.isSearchEmp)
				                        	{
					                        	pipContext.pip_emp = search_help_results[index].Pernr;	
					                        	pipContext.pip_emp_input.setValue(search_help_results[index].Ename);				                        	
					                        	pipContext.employee_name.setText(search_help_results[index].Ename);
				                        	}
				                        	else if(pipContext.isSearchHr)
				                        	{
					                        	pipContext.pip_hr = search_help_results[index].Pernr;	
					                        	pipContext.pip_hr_input.setValue(search_help_results[index].Ename);				                        	
					                        	//pipContext.employee_name.setText(search_help_results[index].Ename);
				                        	}
				                        	
					                    	sap.ui.getCore().byId("pip_search_overlay_id").close();
					                    	sap.ui.getCore().byId("pip_search_overlay_id").destroyContent();
					                    	sap.ui.getCore().byId("pip_search_overlay_id").destroy();
				                        }
				                  });
				},500);
				
				pip_search_overlay.open();
			}
			else if(search_help_results.length == 1)
			{
				if(pipContext.isSearchEmp)
            	{
                	pipContext.pip_emp = search_help_results[0].Pernr;	
                	pipContext.pip_emp_input.setValue(search_help_results[0].Ename);				                        	
                	pipContext.employee_name.setText(search_help_results[0].Ename);
            	}
            	else if(pipContext.isSearchHr)
            	{
                	pipContext.pip_hr = search_help_results[0].Pernr;	
                	pipContext.pip_hr_input.setValue(search_help_results[0].Ename);				                        	
                	//pipContext.employee_name.setText(search_help_results[index].Ename);
            	}
				
				sap.ui.getCore().byId("pip_search_overlay_id").close();
            	sap.ui.getCore().byId("pip_search_overlay_id").destroyContent();
            	sap.ui.getCore().byId("pip_search_overlay_id").destroy();
				
			}
			else if (search_help_results.length == 0)
			{
				sap.ui.getCore().byId("pip_search_overlay_id").close();
            	sap.ui.getCore().byId("pip_search_overlay_id").destroyContent();
            	sap.ui.getCore().byId("pip_search_overlay_id").destroy();
            	sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("NO_DATA_MSG"));
			}
			
		}, function(oError) {
			hideBusy();
			sap.ui.getCore().byId("pip_search_overlay_id").close();
        	sap.ui.getCore().byId("pip_search_overlay_id").destroyContent();
        	sap.ui.getCore().byId("pip_search_overlay_id").destroy();
        	
        	//resetting flags for PIP search
        	pipContext.isSearchEmp = false;
        	pipContext.isSearchHr = false;
        	sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("NO_DATA_MSG"));
		});

	}
	else if(pipContext.pip_emp_input.getValue().toString().trim()=="*")
	{
		hideBusy();
		sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("EMP_SEARCH_CHAR_MSG"));
	}
	
	else if(pipContext.pip_hr_input.getValue().toString().trim()=="*")
	{
		hideBusy();
		sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("EMP_SEARCH_CHAR_MSG"));
	}
	
	else if (pipContext.pip_emp_input.getValue().toString().trim()=="")
	{
		hideBusy();
		//sap.ui.commons.MessageBox.alert("Please enter valid input");
		sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("EMP_SEARCH_BLANK_MSG"));
	}	
	
	else if (pipContext.pip_hr_input.getValue().toString().trim()=="")
	{
		hideBusy();
		//sap.ui.commons.MessageBox.alert("Please enter valid input");
		sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("EMP_SEARCH_BLANK_MSG"));
	}
	
	
	
};

pip_ns.save_PIP = function()
{
	var pip_save_obj = {};
	var pip_save_payload = [];
	pipContext.isMandatoryFieldMissing = false;
	pipContext.isProgressDateIncorrect = false;
	pipContext.isProgressDateExceeds = false;
	
	pip_save_obj.Pernr = myPathContext.employeeId;
	pip_save_obj.Temp = "";
	
	var odatamodel = pipContext.pip_oDataModel;
	odatamodel.setHeaders({
		"X-Requested-With" : "XMLHttpRequest",
		"Content-Type" : "application/atom+xml",
		"DataServiceVersion" : "2.0"
	});
	//showBusy();

	
	// Adding pip objectives data to payload
	var obj_matrix =pipContext.pip_obj_action_matrix;		
	var pip_obj_model = obj_matrix.getModel();
	var obj_modeldata = pip_obj_model.getData().modelData;
	
	for(var i = 0 ; i < obj_modeldata.length ; i++)
	{
		
		/*if ( i == 0)
			{

			pip_save_payload.push({
				
					Ivappraisalid : myPathContext.documentId,
					Rowiid : "0003",
					Elementtype : "PIP Objectives",
					Elementtitle : "PIP Objectives",
					Startdate : "",
					Enddate : "",
					Performance : obj_modeldata[i].Performance,
					Feedback : obj_modeldata[i].Feedback,
					Required : obj_modeldata[i].Required,
					Reviewercomment : "",
					Employeecomment : "",
					Reviewerindc : "",
					Developement : "",
					Achieved : "",
					Hrcomments : "",
					Empfinal : "",
					Reviewfinal : "",
					Flag : "",

				
			});
				
			}
		else
			{*/
		pip_save_payload.push({
			
				Ivappraisalid : myPathContext.documentId,
				Rowiid : (obj_modeldata[i].RowIid==undefined && i==0)?"0003":obj_modeldata[i].RowIid,
				Elementtype : "PIP Objectives",
				Elementtitle : "PIP Objectives",
				Startdate : "",
				Enddate : "",
				Performance : obj_modeldata[i].Performance,
				Feedback : obj_modeldata[i].Feedback,
				Required : obj_modeldata[i].Required,
				Reviewercomment : "",
				Employeecomment : "",
				Reviewerindc : "",
				Developement : "",
				Achieved : "",
				Hrcomments : "",
				Empfinal : "",
				Reviewfinal : "",
				Flag : (obj_modeldata[i].Flag==undefined && i==0)?"":obj_modeldata[i].Flag,//"0002",

			
		});
			//}
	}
	
	// Adding pip action plan data to payload
	var action_matrix =pipContext.pip_action_plan_matrix;		
	var pip_action_model = action_matrix.getModel();
	var action_modeldata = pip_action_model.getData().modelData;
	
	for(var i = 0 ; i < action_modeldata.length ; i++)
	{
	
		if(action_modeldata[i].action.trim()=="")
			pipContext.isMandatoryFieldMissing = true;
		
		pip_save_payload.push({
			
				Ivappraisalid : myPathContext.documentId,
				Rowiid : (action_modeldata[i].RowIid==undefined && i==0)?"0005":action_modeldata[i].RowIid,
				Elementtype : "Action Plan",
				Elementtitle : "Action Plan",
				Startdate : "",
				Enddate : "",
				Performance : "",
				Feedback : "",
				Required : "",
				Reviewercomment : "",
				Employeecomment : "",
				Reviewerindc : "",
				Developement : "",
				Achieved : "",
				Hrcomments : "",
				Empfinal : "",
				Reviewfinal : action_modeldata[i].action,
				Flag : (action_modeldata[i].Flag==undefined && i==0)?"":action_modeldata[i].Flag,

			
		});
			
	}
	
	// Adding employee comments under action plan to payload
	pip_save_payload.push({
		
		Ivappraisalid : myPathContext.documentId,
		Rowiid : "0006",
		Elementtype : "Action Plan" , //Action Plan",
		Elementtitle : "Employee Comments",
		Startdate : "",
		Enddate : "",
		Performance : "",
		Feedback : "",
		Required : "",
		Reviewercomment : "",
		Employeecomment : "",
		Reviewerindc : "",
		Developement : "",
		Achieved : "",
		Hrcomments : "",
		Empfinal : pipContext.emp_action_input.getValue(),
		Reviewfinal : "",
		Flag : "0000",

	
});
	
	// Adding pip progress plan data to payload	
	var progress_matrix = pipContext.pip_progress_matrix;	
	var pip_progress_model = progress_matrix.getModel();
	var progress_modeldata = pip_progress_model.getData().modelData;
	
	for(var i = 0 ; i < progress_modeldata.length ; i++)
	{
		if(progress_modeldata[i].reviewer_comments.trim()=="" && pipContext.pip_data.progress_tab_visible_flag==true)
		{	
			pipContext.isMandatoryFieldMissing = true;
			break;
		}
		
		if((progress_modeldata[i].progress_from==""|| progress_modeldata[i].progress_from==null || progress_modeldata[i].progress_to=="" || progress_modeldata[i].progress_to==null) && pipContext.pip_data.progress_tab_visible_flag==true)
		{	
			pipContext.isMandatoryFieldMissing = true;
			break;
		}
		if(pipContext.pip_data.progress_tab_visible_flag && progress_modeldata[i].progress_from!="" && progress_modeldata[i].progress_to!="")
		{
			pipContext.pip_hidden_from_date.getDateValue().setHours(0, 0, 0, 0);
			pipContext.pip_hidden_to_date.getDateValue().setHours(0, 0, 0, 0);
			
			if(!((progress_modeldata[i].progress_from >= pipContext.pip_hidden_from_date.getDateValue()) && (progress_modeldata[i].progress_to <= pipContext.pip_hidden_to_date.getDateValue())))
			{
				pipContext.isProgressDateExceeds = true;								
				break;
			}
			if(!(progress_modeldata[i].progress_from <= progress_modeldata[i].progress_to))
			{
				   //sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("VALID_DATE_MSG"));
				   pipContext.isProgressDateIncorrect = true;
				   break;
			}
		}
		
	/*	if(pipContext.pipSaveCount < 1)
		{
		pip_save_payload.push({
			
			Ivappraisalid : myPathContext.documentId,
			Rowiid : (progress_modeldata[i].RowIid==undefined && i==0)?"0008":progress_modeldata[i].RowIid,
			Elementtype : "Progress",
			Elementtitle : "",
			Startdate : "",
			Enddate : "",
			Performance : "",
			Feedback : "",
			Required : "",
			Reviewercomment : "",
			Employeecomment : "",
			Reviewerindc : "",
			Developement : "",
			Achieved : "",
			Hrcomments : "",
			Empfinal : "",
			Reviewfinal : "",
			Flag : (progress_modeldata[i].Flag==undefined && i==0)?"":progress_modeldata[i].Flag,

		
	});
		
	}*/
		//else
		//{
		pip_save_payload.push({
			
				Ivappraisalid : myPathContext.documentId,
				Rowiid : (progress_modeldata[i].RowIid==undefined && i==0)?"0008":progress_modeldata[i].RowIid,
				Elementtype : "Progress",
				Elementtitle : "",
				Startdate : progress_modeldata[i].progress_from!=""?pip_ns.convertDate(progress_modeldata[i].progress_from):pip_ns.convertDate(new Date()),
				Enddate : progress_modeldata[i].progress_to!=""?pip_ns.convertDate(progress_modeldata[i].progress_to):pip_ns.convertDate(new Date()),
				Performance : "",
				Feedback : "",
				Required : "",
				Reviewercomment : progress_modeldata[i].reviewer_comments,
				Employeecomment : progress_modeldata[i].employee_comments,
				Reviewerindc : "",
				Developement : "",
				Achieved : "",
				Hrcomments : "",
				Empfinal : "",
				Reviewfinal : "",
				Flag : (progress_modeldata[i].Flag==undefined && i==0)?"":progress_modeldata[i].Flag,

			
		});
		//}	
	}
	
	// Adding pip evaluation data to payload	 
	var evaluation_matrix = pipContext.pip_evaluation_matrix;	
	var pip_evaluation_model = evaluation_matrix.getModel();
	var evaluation_modeldata = pip_evaluation_model.getData().modelData;
	
	for(var i = 0 ; i < obj_modeldata.length ; i++)
	{
		var achieved_drop = pipContext.pip_data.evaluation_tab_visible_flag == true ? pipContext.pip_evaluation_matrix.getRows()[i].getCells()[0].getContent()[6].getSelectedKey():"";
	
		 if(myPathContext.docStatus == "2" && myPathContext.subStatus == "F" && pipContext.isCalledFromCreate==true && pipContext.pipSaveCount < 1)
		 {
		     pip_save_payload.push({			
				Ivappraisalid : myPathContext.documentId,
				Rowiid : (obj_modeldata[i].RowIid==undefined && i==0)?"0010":"",
				Elementtype : "Evaluation",
				Elementtitle : "Evaluation",
				Startdate : "",
				Enddate : "",
				Performance : "",
				Feedback : "",
				Required : "",
				Reviewercomment : "",
				Employeecomment : "",
				Reviewerindc : "",
				Developement :obj_modeldata[i].Performance,
				Achieved : achieved_drop,
				Hrcomments : "",
				Empfinal : "",
				Reviewfinal : "",
				Flag : (obj_modeldata[i].Flag==undefined && i==0)?"":"0009",

			
		    });
		 }
		 else
		 {

		     pip_save_payload.push({			
				Ivappraisalid : myPathContext.documentId,
				Rowiid : (evaluation_modeldata[i]==undefined)?"":evaluation_modeldata[i].RowIid,
				Elementtype : "Evaluation",
				Elementtitle : "Evaluation",
				Startdate : "",
				Enddate : "",
				Performance : "",
				Feedback : "",
				Required : "",
				Reviewercomment : "",
				Employeecomment : "",
				Reviewerindc : "",
				Developement :(evaluation_modeldata[i]==undefined)?obj_modeldata[i].Performance:evaluation_modeldata[i].evaluation_dev_needs,
				Achieved : achieved_drop,
				Hrcomments : "",
				Empfinal : "",
				Reviewfinal : "",
				Flag : (evaluation_modeldata[i]==undefined)?"0009":evaluation_modeldata[i].Flag,

			
		    });
		 
		 }
	}
	
	//Adding Final comments tab data to payload 	
pip_save_payload.push({
		
		Ivappraisalid : myPathContext.documentId,
		Rowiid : "0012",
		Elementtype : "HR Comments",
		Elementtitle : "HR Comments",
		Startdate : "",
		Enddate : "",
		Performance : "",
		Feedback : "",
		Required : "",
		Reviewercomment : "",
		Employeecomment : "",
		Reviewerindc : "",
		Developement :"",
		Achieved : "",
		Hrcomments : pipContext.pip_signoff_hr_comments_input.getValue(),
		Empfinal : "",
		Reviewfinal : "",
		Flag : "0000",
	});


pip_save_payload.push({
	
	Ivappraisalid : myPathContext.documentId,
	Rowiid : "0013",
	Elementtype : "Reviewer Indicator",
	Elementtitle : "Reviewer Indicator",
	Startdate : "",
	Enddate : "",
	Performance : "",
	Feedback : "",
	Required : "",
	Reviewercomment : "",
	Employeecomment : "",
	Reviewerindc : pipContext.reviewer_indicator_dropdown.getSelectedKey(),
	Developement :"",
	Achieved : "",
	Hrcomments : "",
	Empfinal : "",
	Reviewfinal : "",
	Flag : "0000",
});

if(pipContext.isMandatoryFieldMissing && pipContext.isMandatoryCheckReq)
{
	sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("Please_fill_all"));
	//pipContext.isMandatoryFieldMissing = false;
	hideBusy();
}

else if(pipContext.isProgressDateIncorrect && pipContext.isMandatoryCheckReq)
{
	 sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("VALID_DATE_MSG"));
	//pipContext.isProgressDateIncorrect = false;
	hideBusy();
}

else if (pipContext.isProgressDateExceeds && pipContext.isMandatoryCheckReq)
{
	sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("PIP_PROG_DATE"));
	hideBusy();
}

else
{
	
	pip_save_obj.NavDocumentContent = pip_save_payload;
	
	var save_pip_request = "SavePIPContentSet";		
	
	odatamodel.create(save_pip_request,pip_save_obj, null, 	
		
	function(oData,oResponse) {
		
			hideBusy();		
			
			if(oResponse.headers.status.toUpperCase() == "S")
			{
				if(!pipContext.isCalledFromChangeStatus)
				{
					pip_ns.getPIPDetails();
					var success_msg = decodeURI(oResponse.headers.message);
					 sap.m.MessageToast.show(success_msg, {
		                 duration: 3000,                  
		                 width: "40%",                   
		                 my: "center center",             
		                 at: "center center",             
		                 onClose: function(){
		                	
		 					pip_ns.refreshPIP();
		                 },                   
		                 animationDuration: 500,        
		             });
				}
				 pipContext.isPIPSaved = true;
            	 myPathContext.isEdited = false;
            	 pipContext.isMandatoryFieldMissing = false;
            	 pipContext.isProgressDateIncorrect = false;
            	 pipContext.isProgressDateExceeds = false;
            	 pipContext.isMandatoryCheckReq = true;
            	 pipContext.pipSaveCount++;
			}
			
			else
			{						
				var error_msg = decodeURI(oResponse.headers.message);
				sap.ui.commons.MessageBox.alert(error_msg);				
			}
				
	},
	function(oError){
		hideBusy();
		console.log(oError);
	});

}
hideBusy();
};

pip_ns.changePIPDocStatus = function(btn_id)
{
	//Check first if data is saved or not , if not call the save method first
	if(myPathContext.isEdited || pipContext.pipSaveCount < 1 || pipContext.isMandatoryCheckReq)
	{
		pipContext.isCalledFromChangeStatus = true;
		pip_ns.save_PIP();
	}
	
	//Before changing the status of document , first check whether data was saved successfully or not
	if(myPathContext.isEdited==false && pipContext.isMandatoryFieldMissing==false && pipContext.isProgressDateIncorrect==false)
	{
		var odatamodel = pipContext.pip_oDataModel;
		odatamodel.setHeaders({
			"X-Requested-With" : "XMLHttpRequest",
			"Content-Type" : "application/atom+xml",
			"DataServiceVersion" : "2.0"
		});
		//showBusy();
		
		var change_doc_status_req = "StatusChangePIPDocSet";
		
		var change_doc_status_data = {
				
				DocumentId:myPathContext.documentId,
				ButtonId : btn_id,
				SignOff :"",
			};		
		
		odatamodel.create(change_doc_status_req,change_doc_status_data, null, 
	
		function(oData,oResponse) {
			hideBusy();			
			if(oResponse.headers.status.toUpperCase() == "S")
			{
				 var success_msg = decodeURI(oResponse.headers.message);
				sap.m.MessageToast.show(success_msg, {
	                 duration: 3000,                  
	                 width: "40%",                   
	                 my: "center center",             
	                 at: "center center",             
	                 onClose: function(){
	                	 pipContext.isPIPSaved = true;
	                	 myPathContext.isEdited = false;
	                	 pipContext.isMandatoryFieldMissing = false;
	                	 pipContext.isProgressDateIncorrect = false;
	                	 pipContext.isMandatoryCheckReq = true;
	                	 myPathContext.back();
	                 },                   
	                 animationDuration: 500,        
	             });
			}
			
			else
			{
				var error_msg = decodeURI(oResponse.headers.message);
				sap.ui.commons.MessageBox.alert(error_msg);
			}
        },		
		
		function (oError) {
			hideBusy();
			console.log(oError);
		});	
		}
	hideBusy();	
};

/*pip_ns.delete_Pressed = function(matrix,index,pip_obj_model,modeldata)
{
	
};*/
pip_ns.refreshPIP = function()
{

	
	/*Declaring row template of objectives */
	var matrix =   pipContext.pip_obj_action_matrix;		
	 var  pip_obj_model = new sap.ui.model.json.JSONModel();		 
	 pip_obj_model.setData({modelData: pipContext.pip_objectives_data});				
	 matrix.setModel(pip_obj_model);
	 
	 if(pipContext.pip_objectives_data.length > 6)
	 {
		 pipContext.add_pip_obj_btn_2.setVisible(false);
		 pipContext.add_pip_obj_btn.setVisible(false);
	 }
	 
	 var oRowTemplate = new sap.ui.commons.layout.MatrixLayoutRow({
			cells: [
				new sap.ui.commons.layout.MatrixLayoutCell({
					content: [    new sap.m.Text({
					        	  text: '{i18n>DEV_NEEDS}',
					        	  width: '100%',
					        	  visible:pipContext.pip_data.obj_action_visible,
					        	  textDirection: sap.ui.core.TextDirection.LTR
					          }).addStyleClass("title_text").addStyleClass("pip_obj_action_style"),
					          
					          new sap.m.Link({
							    			
							    			text :'{i18n>EXPAND_TEXT_FIELD}',
							    			visible:pipContext.pip_data.obj_action_editable,
							    			press:function(evt)
							    	    	{
							    				pipContext.isCalledFromObjMatrix = true;
							    				pipContext.isCalledFromObjPer = true;
							    				pip_ns.openReadOnlyTextObj(evt);
							    				
							    	    	}
							    			}).addStyleClass("segmented_btn_style1").addStyleClass("pip_obj_action_style"),
					          
					          new sap.m.TextArea({
				                  value: "{Performance}",
				                  width: "99%",
				                  rows:4,
				                  visible:pipContext.pip_data.obj_action_editable,//pipContext.pip_data.obj_action_visible
				                  editable : pipContext.pip_data.obj_action_editable,
				                  change : function()
				                  {
				                	  myPathContext.isEdited = true;
				                  }
				              }).addStyleClass("pip_evalution_style"),	
				              
				              new com.capgemini.mypath.util.MyPathText(
					  	            	{
					  		            	showLimit : 500,
					  		            	width: "100%",
					  		            	visible:!pipContext.pip_data.obj_action_editable,
					  		            	showTextArea : true,
					  						text : "{Performance}"
					  						}).addStyleClass("showMoreText").addStyleClass("showMoreTextPIP"),
				              
				              new sap.m.Text({
				            	  text: '{i18n>FEEDBACK_RECEIVED}',
				            	  width: '100%',
				            	  visible:pipContext.pip_data.obj_action_visible,
				            	  textDirection: sap.ui.core.TextDirection.LTR
				              }).addStyleClass("title_text").addStyleClass("pip_obj_action_style"),
				              
				              new sap.m.Link({
					    			
					    			text :'{i18n>EXPAND_TEXT_FIELD}',
					    			visible:pipContext.pip_data.obj_action_editable,
					    			press:function(evt)
					    	    	{
					    				pipContext.isCalledFromObjMatrix = true;
					    				pipContext.isCalledFromObjFb = true;
					    				pip_ns.openReadOnlyTextObj(evt);
					    	    	}
					    			}).addStyleClass("segmented_btn_style1").addStyleClass("pip_obj_action_style"),
				              
				              new sap.m.TextArea({
				                  value: "{Feedback}",
				                  width: "99%",
				                  visible:pipContext.pip_data.obj_action_editable,
				                  editable : pipContext.pip_data.obj_action_editable,
				                  rows: 4,					                
				                  change : function()
				                  {
				                	  myPathContext.isEdited = true;
				                  }
				              }).addStyleClass("pip_evalution_style"),  
				              
				              new com.capgemini.mypath.util.MyPathText(
					  	            	{
					  		            	showLimit : 500,
					  		            	width: "100%",
					  		            	visible:!pipContext.pip_data.obj_action_editable,
					  		            	showTextArea : true,
					  						text : "{Feedback}"
					  						}).addStyleClass("showMoreText").addStyleClass("showMoreTextPIP"),
				              
					  						
				              new sap.m.Text({
				            	  text: '{i18n>REQUIRED_PERFORMANCE}',
				            	  width: '100%',
				            	  visible:pipContext.pip_data.obj_action_visible,
				            	  textDirection: sap.ui.core.TextDirection.LTR
				              }).addStyleClass("title_text").addStyleClass("pip_obj_action_style"),
				              
				              new sap.m.Link({
					    			
					    			text :'{i18n>EXPAND_TEXT_FIELD}',
					    			visible:pipContext.pip_data.obj_action_editable,
					    			press:function(evt)
					    	    	{
					    				pipContext.isCalledFromObjMatrix = true;
					    				pipContext.isCalledFromObjReq = true;
					    				pip_ns.openReadOnlyTextObj(evt);
					    	    	}
					    			}).addStyleClass("segmented_btn_style1").addStyleClass("pip_obj_action_style"),
				              
				              new sap.m.TextArea({
				                  value: "{Required}",
				                  width: "99%",
				                  visible:pipContext.pip_data.obj_action_editable,
				                  editable : pipContext.pip_data.obj_action_editable,
				                  rows: 4,					                
				                  change : function()
				                  {
				                	  myPathContext.isEdited = true;
				                  }
				              }).addStyleClass("pip_evalution_style"),    
				              
				              new com.capgemini.mypath.util.MyPathText(
					  	            	{
					  		            	showLimit : 500,
					  		            	width: "100%",
					  		            	visible:!pipContext.pip_data.obj_action_editable,
					  		            	showTextArea : true,
					  						text : "{Required}"
					  						}).addStyleClass("showMoreText").addStyleClass("showMoreTextPIP"),
				              
					  						
				              new sap.ui.commons.Button({
				                  text: "Remove",
				                  width: "150px",
				                  icon: pip_ns.url_app+"com/capgemini/mypath/pip/images/trash_icon.png",
				                  lite: true,
				                  visible:pipContext.pip_data.obj_action_editable,
				                  press: function(evt){
				                	  pip_ns.remove_obj(evt);
				                  }
				              }).addStyleClass("remove_btn"),
				              new sap.ui.commons.HorizontalDivider({
				                  width: "100%",
				                  visible:true,
				                  type: "Page",
				                  height: "Small"
				              }).addStyleClass("pip_objectives_divider"),
					          
				         ]
				}).addStyleClass("per_objectives_matrix_cell")
			]
		}).addStyleClass("per_objectives_matrix_row");

		matrix.bindAggregation("rows", "/modelData", oRowTemplate);
		
		pipContext.pip_obj_row_template = oRowTemplate;			
		 /*End of row template of objectives */
		
		 /*Declaring row template of action plan*/
		var action_matrix =   pipContext.pip_action_plan_matrix;		
		 var  pip_action_model = new sap.ui.model.json.JSONModel();		 
		 pip_action_model.setData({modelData: pipContext.pip_action_plan_data});				
		 action_matrix.setModel(pip_action_model);
		 
		 if(pipContext.pip_action_plan_data.length > 6)
		 {
			 pipContext.add_pip_action_btn.setVisible(false);
			 pipContext.add_pip_action_btn_2.setVisible(false);
		 }
		 
		 var oRowTemplateAction = new sap.ui.commons.layout.MatrixLayoutRow({
				cells: [
					new sap.ui.commons.layout.MatrixLayoutCell({
						content: [
									new sap.m.Label({
										  text: '{i18n>ACTION_PERFORM_DEV_NEEDS}',
										  width: '100%',
										  required:true,
										  textAlign:sap.ui.core.TextAlign.Left,
										  visible:pipContext.pip_data.obj_action_visible,
										  textDirection: sap.ui.core.TextDirection.LTR
									}).addStyleClass("title_text").addStyleClass("pip_obj_action_style").addStyleClass("text_align_left"),
									
									new sap.m.Link({
						    			
						    			text :'{i18n>EXPAND_TEXT_FIELD}',
						    			visible:pipContext.pip_data.obj_action_editable,
						    			press:function(evt)
						    	    	{
						    				pipContext.isCalledFromActionMatrix = true;
						    				pip_ns.openReadOnlyTextObj(evt);
						    				
						    	    	}
						    			}).addStyleClass("segmented_btn_style1").addStyleClass("pip_obj_action_style"),
						    			
									new sap.m.TextArea({
									    value: "{action}",
									    width: "99%",
									    rows:4,
									    visible:pipContext.pip_data.obj_action_editable,
									    editable : pipContext.pip_data.obj_action_editable,
									    change : function()
									    {
									    	myPathContext.isEdited = true;
									    }
									}).addStyleClass("pip_evalution_style"),	
									
									 new com.capgemini.mypath.util.MyPathText(
							  	            	{
							  		            	showLimit : 500,
							  		            	width: "100%",
							  		            	visible:!pipContext.pip_data.obj_action_editable,
							  		            	showTextArea : true,
							  						text : "{action}"
							  						}).addStyleClass("showMoreText").addStyleClass("showMoreTextPIP"),
						              
							  						
									  new sap.ui.commons.Button({
						                  text: "Remove",
						                  width: "150px",
						                  icon: pip_ns.url_app+"com/capgemini/mypath/pip/images/trash_icon.png",
						                  lite: true,
						                  visible:pipContext.pip_data.obj_action_editable,
						                  press: function(evt){
						                	  pip_ns.remove_action(evt);
						                  }
						              }).addStyleClass("remove_btn"),
						              new sap.ui.commons.HorizontalDivider({
						                  width: "100%",
						                  type: "Page",
						                  height: "Small"
						              }).addStyleClass("assign_objectives_divider"),
						          ]
					
					}),//.addStyleClass("per_objectives_matrix_cell"),
					
				]
			}).addStyleClass("per_objectives_matrix_row");
		 action_matrix.bindAggregation("rows", "/modelData", oRowTemplateAction);				
		 pipContext.oRowTemplateAction = oRowTemplateAction;			
		/*End of row template of action plan*/		
		 
		 /*Declaring row template of progress*/
			var progress_matrix =   pipContext.pip_progress_matrix;		
			 var  pip_progress_model = new sap.ui.model.json.JSONModel();		 
			 pip_progress_model.setData({modelData: pipContext.pip_progress_data});				
			 progress_matrix.setModel(pip_progress_model);
			 
			 if(pipContext.pip_progress_data.length > 6)
			 {
				 pipContext.add_pip_progress_btn.setVisible(false);
				 pipContext.add_pip_progress_btn_2.setVisible(false);
			 }
			 
			 
			 var oRowTemplateProgress = new sap.ui.commons.layout.MatrixLayoutRow({
					cells: [
						new sap.ui.commons.layout.MatrixLayoutCell({
							content: [
										new sap.m.Text({
											  text: '{i18n>PROGRESS_UPDATES}',
											  width: '100%',
											  visible:pipContext.pip_data.progress_evaluation_visible,
											  textDirection: sap.ui.core.TextDirection.LTR
										}).addStyleClass("title_text").addStyleClass("pip_obj_action_style").addStyleClass("assign_obj_bold"),
										
										 new sap.ui.commons.HorizontalDivider({
							                  width: "100%",
							                  type: "Page",
							                  height: "Small",
							                  visible:pipContext.pip_data.progress_evaluation_visible,
							              }).addStyleClass("assign_objectives_divider"),
							              
							              new sap.m.Label({
											  text: '{i18n>PIP_PROGRESS_START}',
											  width: '10%',
											  required:true,
											  textAlign:sap.ui.core.TextAlign.Left,
											  visible:pipContext.pip_data.progress_evaluation_visible,
											  textDirection: sap.ui.core.TextDirection.LTR
										}).addStyleClass("title_text").addStyleClass("pip_obj_action_style").addStyleClass("pip_float_left"),
										
										new sap.m.DatePicker({
											visible:pipContext.pip_data.progress_evaluation_visible,
											editable:pipContext.pip_data.progress_evaluation_editable,
											change:function()
										    {
												myPathContext.isEdited = true;
										    },
											width:"35%",											
											dateValue:"{progress_from}"
										
										}).addStyleClass("pip_float_left").addStyleClass("pip_margin_right"),
										new sap.m.Text({												
											  width: '50%',
											  visible:pipContext.pip_data.progress_evaluation_visible,
											  textDirection: sap.ui.core.TextDirection.LTR
										}),
										 new sap.m.Label({
											  text: '{i18n>PIP_PROGRESS_END}',
											  width: '10%',
											  required:true,
											  textAlign:sap.ui.core.TextAlign.Left,
											  visible:pipContext.pip_data.progress_evaluation_visible,
											  textDirection: sap.ui.core.TextDirection.LTR
										}).addStyleClass("title_text").addStyleClass("pip_obj_action_style").addStyleClass("pip_float_left"),
										
										new sap.m.DatePicker({
											visible:true,
											visible:pipContext.pip_data.progress_evaluation_visible,
											editable:pipContext.pip_data.progress_evaluation_editable,
											change:function()
										    {
												myPathContext.isEdited = true;
										    },
											width:"35%",											
											dateValue:"{progress_to}"
										
										}).addStyleClass("pip_float_left"),											
										
							              new sap.m.Label({
											  text: '{i18n>PIP_REVIEWER_COMMENTS}',
											  width: '100%',
											  required:true,
											  textAlign:sap.ui.core.TextAlign.Left,
											  visible:pipContext.pip_data.progress_evaluation_visible,
											  textDirection: sap.ui.core.TextDirection.LTR
										}).addStyleClass("title_text").addStyleClass("pip_obj_action_style").addStyleClass("text_align_left"),
										
										new sap.m.Link({
							    			
							    			text :'{i18n>EXPAND_TEXT_FIELD}',
							    			visible:pipContext.pip_data.progress_evaluation_editable,
							    			press:function(evt)
							    	    	{
							    				pipContext.isCalledFromProgressMatrix = true;
							    				pipContext.isCalledFromProgressRev = true;
							    				pip_ns.openReadOnlyTextObj(evt);
							    				
							    	    	}
							    			}).addStyleClass("segmented_btn_style1").addStyleClass("pip_obj_action_style"),
							    			
										new sap.m.TextArea({
										    value: "{reviewer_comments}",
										    width: "99%",
										    rows:4,
										    visible:pipContext.pip_data.progress_evaluation_editable,
										    editable : pipContext.pip_data.progress_evaluation_editable,
										    change : function()
										    {
										    	myPathContext.isEdited = true;
										    }
										}).addStyleClass("pip_evalution_style"),	
										
										new com.capgemini.mypath.util.MyPathText(
							  	            	{
							  		            	showLimit : 500,
							  		            	width: "100%",
							  		            	visible:!pipContext.pip_data.progress_evaluation_editable,
							  		            	showTextArea : true,
							  						text : "{reviewer_comments}"
							  						}).addStyleClass("showMoreText").addStyleClass("showMoreTextPIP"),
							  						
							  						
										new sap.m.Text({
											  text: '{i18n>PIP_ACTION_EMP_COMMENTS}',
											  width: '100%',
											  visible:pipContext.pip_data.progress_evaluation_visible,
											  textDirection: sap.ui.core.TextDirection.LTR
										}).addStyleClass("title_text").addStyleClass("pip_obj_action_style"),
										
										new sap.m.Link({
							    			
							    			text :'{i18n>EXPAND_TEXT_FIELD}',
							    			visible:pipContext.pip_data.progress_emp_comments_editable,
							    			press:function(evt)
							    	    	{
							    				pipContext.isCalledFromProgressMatrix = true;
							    				pipContext.isCalledFromProgressEmp = true;
							    				pip_ns.openReadOnlyTextObj(evt);
							    				
							    	    	}
							    			}).addStyleClass("segmented_btn_style1").addStyleClass("pip_obj_action_style"),
										
										new sap.m.TextArea({
										    value: "{employee_comments}",
										    width: "99%",
										    rows:4,
										    visible:pipContext.pip_data.progress_emp_comments_editable,
										    editable :pipContext.pip_data.progress_emp_comments_editable,
										    change : function()
										    {
										    	myPathContext.isEdited = true;
										    }
										}).addStyleClass("pip_evalution_style"),	
										
										new com.capgemini.mypath.util.MyPathText(
							  	            	{
							  		            	showLimit : 500,
							  		            	width: "100%",
							  		            	visible:!pipContext.pip_data.progress_emp_comments_editable,
							  		            	showTextArea : true,
							  						text : "{employee_comments}"
							  						}).addStyleClass("showMoreText").addStyleClass("showMoreTextPIP"),
							  						
							  						
										 new sap.ui.commons.Button({
							                  text: "Remove",
							                  width: "150px",
							                  icon: pip_ns.url_app+"com/capgemini/mypath/pip/images/trash_icon.png",
							                  lite: true,
							                  visible:pipContext.pip_data.progress_evaluation_editable,
							                  press: function(evt){
							                	  pip_ns.remove_progress(evt);
							                  }
							              }).addStyleClass("remove_btn"),
							         	 new sap.ui.commons.HorizontalDivider({
							                  width: "100%",
							                  type: "Page",
							                  visible:pipContext.pip_data.progress_evaluation_visible,
							                  height: "Small"
							              }).addStyleClass("assign_objectives_divider"),
										
							          ]
						
						}),//.addStyleClass("per_objectives_matrix_cell"),
						
					]
				}).addStyleClass("per_objectives_matrix_row");
			 progress_matrix.bindAggregation("rows", "/modelData", oRowTemplateProgress);				
			 pipContext.oRowTemplateProgress = oRowTemplateProgress;			
			/*End of row template of progress*/
			 
			 /*Declaring row template of evaluation */
				var evaluation_matrix =   pipContext.pip_evaluation_matrix;		
				 var  pip_evaluation_model = new sap.ui.model.json.JSONModel();		 
				 pip_evaluation_model.setData({modelData: pipContext.pip_evaluation_data});				
				 evaluation_matrix.setModel(pip_evaluation_model);
				
				/* var achieved_dropdown = new sap.ui.commons.DropdownBox({
						items:pipContext.achieved_array,
						visible:pipContext.pip_data.evaluation_achieved_visible,
						enabled:pipContext.pip_data.evaluation_achieved_editable,
						selectedKey:"",
						value: "{achieved}",
						change : function()
						{
							pipContext.AchievedKey = this.getSelectedKey() ;
						}
					});*/
				 
				// pipContext.achieved_dropdown = achieved_dropdown ;
				 
				 var oRowTemplateEvaluation = new sap.ui.commons.layout.MatrixLayoutRow({
						cells: [
							new sap.ui.commons.layout.MatrixLayoutCell({
								content: [
								          
										new sap.m.Text({
											  text: '{i18n>PIP_EVALUATION}',
											  width: '100%',
											  visible:pipContext.pip_data.evaluation_perform_dev_visible,
											  textDirection: sap.ui.core.TextDirection.LTR
										}).addStyleClass("title_text").addStyleClass("pip_obj_action_style").addStyleClass("assign_obj_bold"),
										
										 new sap.ui.commons.HorizontalDivider({
							                  width: "100%",
							                  type: "Page",
							                  height: "Small",
							                  visible:pipContext.pip_data.evaluation_perform_dev_visible,
							              }).addStyleClass("assign_objectives_divider"),

											new sap.m.Text({
												  text: '{i18n>DEV_NEEDS}',
												  width: '100%',
												  visible:pipContext.pip_data.evaluation_perform_dev_visible,
												  textDirection: sap.ui.core.TextDirection.LTR
											}).addStyleClass("title_text").addStyleClass("pip_obj_action_style"),
											
										/*	new sap.m.TextArea({
											    value: "{evaluation_dev_needs}",
											    width: "100%",
											    rows:4,
											    visible:pipContext.pip_data.evaluation_perform_dev_visible,
											    editable : false,
											    change : function()
											    {
											    	myPathContext.isEdited = true;
											    }
											}),	*/
											
											new com.capgemini.mypath.util.MyPathText(
								  	            	{
								  		            	showLimit : 500,
								  		            	width: "100%",
								  		            	visible:true,
								  		            	showTextArea : true,
								  						text : "{evaluation_dev_needs}" // Performance
								  						}).addStyleClass("showMoreText").addStyleClass("showMoreTextPIP"),
								  						
								  						
											new sap.m.Text({													 
												  width: '100%',	
												  visible:pipContext.pip_data.evaluation_perform_dev_visible,
											}).addStyleClass("title_text").addStyleClass("pip_obj_action_style"),
											  
											new sap.m.Text({
												  text: '{i18n>PIP_ACHIEVED}',
												  width: '10%',
												  visible:pipContext.pip_data.evaluation_achieved_visible,
												  textDirection: sap.ui.core.TextDirection.LTR
											}).addStyleClass("title_text").addStyleClass("pip_evalution_style").addStyleClass("pip_float_left"),
											
											
											new sap.ui.commons.DropdownBox({
												items:pipContext.achieved_array,
												visible:pipContext.pip_data.evaluation_achieved_visible,
												enabled:pipContext.pip_data.evaluation_achieved_editable,
												//selectedKey:"{achieved}",
												value: "{achieved}",
												change : function()
												{
													
													myPathContext.isEdited = true;
												  
													pipContext.AchievedKey = this.getSelectedKey() ;
												}
											}).addStyleClass("pip_float_left"),
								              new sap.ui.commons.HorizontalDivider({
								                  width: "100%",
								                  type: "Page",
								                  visible:pipContext.pip_data.evaluation_perform_dev_visible,
								                  height: "Small"
								              }).addStyleClass("assign_objectives_divider"),
								          ]
							
							}),//.addStyleClass("per_objectives_matrix_cell"),
							
						]
					}).addStyleClass("per_objectives_matrix_row");
				 evaluation_matrix.bindAggregation("rows", "/modelData", oRowTemplateEvaluation);				
				 pipContext.oRowTemplateEvaluation = oRowTemplateEvaluation;			
				/*End of row template of evaluation*/	
	 
		
	
};

pip_ns.tab_Nav_PIP = function(ref_tab_bar)
{

	   if(ref_tab_bar.getSelectedKey()=="action_pip_tab" &&  pipContext.isActionTabClicked==false)
	   {
		   ref_tab_bar.setSelectedKey("obj_pip_tab");
		   
		  var div = jQuery("#"+pipContext.obj_next_btn.getId() + "-inner");
		  div.fadeTo(100, 0.1).fadeTo(200, 1.0);
	        //div.animate({width: '80%', opacity: '1'}, "slow");
	       // div.animate({width: '100%', opacity: '1'}, "slow"); 						        
	       
	   }
	  if(ref_tab_bar.getSelectedKey()=="progress_pip_tab" && pipContext.isProgressTabClicked==false)
	  {
		 if(pipContext.isActionTabClicked==false)
		 {
			   ref_tab_bar.setSelectedKey("obj_pip_tab");
 		   
 		  var div = jQuery("#"+pipContext.obj_next_btn.getId() + "-inner");
 		 div.fadeTo(100, 0.1).fadeTo(200, 1.0);
		        //div.animate({width: '80%', opacity: '1'}, "slow");
		       // div.animate({width: '100%', opacity: '1'}, "slow");
		 }
		 
		 else
		{
		  
		  ref_tab_bar.setSelectedKey("action_pip_tab");
		   
		   var div = jQuery("#"+pipContext.action_next_btn.getId() + "-inner");
		   div.fadeTo(100, 0.1).fadeTo(200, 1.0);
	        //div.animate({width: '80%', opacity: '1'}, "slow");
	        //div.animate({width: '100%', opacity: '1'}, "slow");
		}
	  }
	  
	  if(ref_tab_bar.getSelectedKey()=="evaluation_pip_tab" && pipContext.isEvaluationTabClicked==false)
	  {
		  if(pipContext.isActionTabClicked==false)
 		 {
 			   ref_tab_bar.setSelectedKey("obj_pip_tab");
	    		   
	    		  var div = jQuery("#"+pipContext.obj_next_btn.getId() + "-inner");
	    		  div.fadeTo(100, 0.1).fadeTo(200, 1.0);
			        //div.animate({width: '80%', opacity: '1'}, "slow");
			        //div.animate({width: '100%', opacity: '1'}, "slow");
 		 }
		  else if(pipContext.isProgressTabClicked==false)
		  {
			  ref_tab_bar.setSelectedKey("action_pip_tab");
 		   
 		   var div = jQuery("#"+pipContext.action_next_btn.getId() + "-inner");
 		  div.fadeTo(100, 0.1).fadeTo(200, 1.0);
		        //div.animate({width: '80%', opacity: '1'}, "slow");
		       // div.animate({width: '100%', opacity: '1'}, "slow");
		  }
		  else
		  {
			 
		   ref_tab_bar.setSelectedKey("progress_pip_tab");				    		  
		   var div = jQuery("#"+pipContext.progress_next_btn.getId() + "-inner");
		   div.fadeTo(100, 0.1).fadeTo(200, 1.0);
	        //div.animate({width: '80%', opacity: '1'}, "slow");
	        //div.animate({width: '100%', opacity: '1'}, "slow");
		  }
	  }
	  
	  if(ref_tab_bar.getSelectedKey()=="final_pip_tab" && pipContext.isFinalTabClicked==false && pipContext.final_pip_tab.getCount()=="5")
	  {
		  if(pipContext.isActionTabClicked==false)
 		 {
 			   ref_tab_bar.setSelectedKey("obj_pip_tab");
	    		   
	    		  var div = jQuery("#"+pipContext.obj_next_btn.getId() + "-inner");
	    		  div.fadeTo(100, 0.1).fadeTo(200, 1.0);
			        //div.animate({width: '80%', opacity: '1'}, "slow");
			        //div.animate({width: '100%', opacity: '1'}, "slow");
 		 }
		  else if(pipContext.isProgressTabClicked==false)
		  {
			  ref_tab_bar.setSelectedKey("action_pip_tab");
 		   
 		   var div = jQuery("#"+pipContext.action_next_btn.getId() + "-inner");
 		  div.fadeTo(100, 0.1).fadeTo(200, 1.0);
		        //div.animate({width: '80%', opacity: '1'}, "slow");
		        //div.animate({width: '100%', opacity: '1'}, "slow");
		  }
		  else if(pipContext.isEvaluationTabClicked==false)
		  {
			  ref_tab_bar.setSelectedKey("progress_pip_tab");				    		  
 		   var div = jQuery("#"+pipContext.progress_next_btn.getId() + "-inner");
 		  div.fadeTo(100, 0.1).fadeTo(200, 1.0);
		        //div.animate({width: '80%', opacity: '1'}, "slow");
		        //div.animate({width: '100%', opacity: '1'}, "slow");
		  }
		  else
		  {
		  ref_tab_bar.setSelectedKey("evaluation_pip_tab");
		  var div = jQuery("#"+pipContext.evaluation_next_btn.getId() + "-inner");
		  div.fadeTo(100, 0.1).fadeTo(200, 1.0);
	        //div.animate({width: '80%', opacity: '1'}, "slow");
	        //div.animate({width: '100%', opacity: '1'}, "slow");
		  }
	  }
	  
	  if(ref_tab_bar.getSelectedKey()=="final_pip_tab" /*&& pipContext.isFinalTabClicked==false */ && pipContext.final_pip_tab.getCount()=="3")
	  {
		  if(pipContext.isActionTabClicked==false)
 		 {
 			   ref_tab_bar.setSelectedKey("obj_pip_tab");
	    		   
	    		  var div = jQuery("#"+pipContext.obj_next_btn.getId() + "-inner");
	    		  div.fadeTo(100, 0.1).fadeTo(200, 1.0);
			        //div.animate({width: '80%', opacity: '1'}, "slow");
			        //div.animate({width: '100%', opacity: '1'}, "slow");
 		 }
		  
		  else if (pipContext.isFinalTabClicked == false)
		  {
		  ref_tab_bar.setSelectedKey("action_pip_tab");
		  var div = jQuery("#"+pipContext.action_next_btn.getId() + "-inner");
		  div.fadeTo(100, 0.1).fadeTo(200, 1.0);
	        //div.animate({width: '80%', opacity: '1'}, "slow");
	        //div.animate({width: '100%', opacity: '1'}, "slow");
		  }
	  }
	  
	  //Logic to perform save and mandatory checks on tab navigation.
 	if(ref_tab_bar.getSelectedKey()!="progress_pip_tab" && pipContext.pip_data.progress_tab_visible_flag==true && myPathContext.isEdited==true)
 	{
 		pipContext.isPIPSaved = false;
			pipContext.isCalledFromChangeStatus = true;
			pip_ns.save_PIP();
			if(pipContext.isPIPSaved == true)
			{
				
				pipContext.pip_tabstrip.setSelectedKey(ref_tab_bar.getSelectedKey());
			}
			else
			{
				pipContext.pip_tabstrip.setSelectedKey("progress_pip_tab");
			}
 	}
 	if(ref_tab_bar.getSelectedKey()!="action_pip_tab" && pipContext.pip_data.progress_tab_visible_flag==false && pipContext.pip_data.action_plan_tab_visible_flag==true && myPathContext.isEdited==true)
 	{
 		pipContext.isPIPSaved = false;
			pipContext.isCalledFromChangeStatus = true;
			pip_ns.save_PIP();
			if(pipContext.isPIPSaved == true)
			{
				
				pipContext.pip_tabstrip.setSelectedKey(ref_tab_bar.getSelectedKey());
			}
			else
			{
				pipContext.pip_tabstrip.setSelectedKey("action_pip_tab");
			}
 	}
   
};

pip_ns.openReadOnlyTextObj = function(evt)
{

	var object = evt.getSource().getParent().getParent();
	var matrix = null; 
	var obj_text_area_ref = null;
	var args = null;
	if(pipContext.isCalledFromObjMatrix)
	{
		 matrix = pipContext.pip_obj_action_matrix;	
		var index = matrix.indexOfAggregation("rows",object);
		
		var obj_model = matrix.getModel();
		var modeldata = obj_model.getData().modelData;
		
		if(pipContext.isCalledFromObjPer)
		{
			obj_text_area_ref = matrix.getRows()[index].getCells()[0].getContent()[2];
			pipContext.obj_text_area_ref = obj_text_area_ref;
			args = modeldata[index].Performance;
		}
		else if (pipContext.isCalledFromObjFb)
		{
			obj_text_area_ref = matrix.getRows()[index].getCells()[0].getContent()[6];
			pipContext.obj_text_area_ref = obj_text_area_ref;
			args = modeldata[index].Feedback;
		}
		else if(pipContext.isCalledFromObjReq)
		{
			obj_text_area_ref = matrix.getRows()[index].getCells()[0].getContent()[10];
			pipContext.obj_text_area_ref = obj_text_area_ref;
			args = modeldata[index].Required;
		}
	}	
	
	if(pipContext.isCalledFromActionMatrix)
	{
		 matrix = pipContext.pip_action_plan_matrix;	
		var index = matrix.indexOfAggregation("rows",object);
		
		var obj_model = matrix.getModel();
		var modeldata = obj_model.getData().modelData;
		
		obj_text_area_ref = matrix.getRows()[index].getCells()[0].getContent()[2];
		pipContext.obj_text_area_ref = obj_text_area_ref;
		args = modeldata[index].action;
		
		
	}
	
	if(pipContext.isCalledFromProgressMatrix)
	{
		 matrix = pipContext.pip_progress_matrix;	
			var index = matrix.indexOfAggregation("rows",object);
			
			var obj_model = matrix.getModel();
			var modeldata = obj_model.getData().modelData;
			
			if(pipContext.isCalledFromProgressRev)
			{
				obj_text_area_ref = matrix.getRows()[index].getCells()[0].getContent()[9];
				pipContext.obj_text_area_ref = obj_text_area_ref;
				args = modeldata[index].reviewer_comments;
			}
			else if(pipContext.isCalledFromProgressEmp)
			{
				obj_text_area_ref = matrix.getRows()[index].getCells()[0].getContent()[13];
				pipContext.obj_text_area_ref = obj_text_area_ref;
				args = modeldata[index].employee_comments;
			}
			
	}
	
	if(pipContext.isCalledFromEmpActionPlan)
    {
		args = pipContext.emp_action_input.getValue();
    }
	
	if(pipContext.isCalledFromSignoff)
	{
	 args = pipContext.pip_signoff_hr_comments_input.getValue();	
	}
	
  /*  if(args != undefined)
    var lines = args.split("\n"); 
    var count = lines.length;
    
    for(var i = 0  ; i < lines.length ; i++)    
    	if(lines[i].toString().length >= 100)    		
    	 count = count + parseInt((lines[i].toString().length)/100);   
    
    	 count = count < 4 ? 20 : 20;*/
    	 
    	 
    	pipContext.overlay_text.setRows(20);
    	pipContext.overlay_text.setValue(args);
    	
    	pipContext.dlg.open();
};